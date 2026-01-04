import os
import io
import torch
import numpy as np
import librosa
import cv2
import pandas as pd
import joblib
import speech_recognition as sr
from pydub import AudioSegment
import soundfile as sf
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import torch.nn.functional as F
from transformers import (
    AutoTokenizer, 
    AutoModelForSequenceClassification, 
    AutoFeatureExtractor, 
    AutoModelForAudioClassification,
    AutoModelForImageClassification 
)
from facenet_pytorch import MTCNN

# --- 1. FFMPEG CONFIGURATION ---
ffmpeg_dir = r"C:\ffmpeg-2025-12-14-git-3332b2db84-full_build\bin"
os.environ["PATH"] += os.pathsep + ffmpeg_dir
AudioSegment.converter = os.path.join(ffmpeg_dir, "ffmpeg.exe")
AudioSegment.ffprobe = os.path.join(ffmpeg_dir, "ffprobe.exe")

app = Flask(__name__)
CORS(app)

# --- GLOBAL CONFIG & MODEL LOADING ---
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"⏳ Loading AI Models on {device}... Please wait.")

recognizer = sr.Recognizer()

# 1. FER (Face)
fer_name = "trpakov/vit-face-expression"
fer_processor = AutoFeatureExtractor.from_pretrained(fer_name)
fer_model = AutoModelForImageClassification.from_pretrained(fer_name).to(device)
if os.path.exists("models/fer_model_finetuned.pth"):
    fer_model.load_state_dict(torch.load("models/fer_model_finetuned.pth", map_location=device))

# 2. SER (Audio)
ser_name = "superb/wav2vec2-base-superb-er"
ser_processor = AutoFeatureExtractor.from_pretrained(ser_name)
ser_model = AutoModelForAudioClassification.from_pretrained(
    ser_name, num_labels=7, ignore_mismatched_sizes=True
).to(device)
if os.path.exists("models/ser_model_finetuned_weighted.pth"):
    ser_model.load_state_dict(torch.load("models/ser_model_finetuned_weighted.pth", map_location=device))

# 3. TER (Text)
ter_name = "j-hartmann/emotion-english-distilroberta-base"
ter_tokenizer = AutoTokenizer.from_pretrained(ter_name)
ter_model = AutoModelForSequenceClassification.from_pretrained(ter_name).to(device)
if os.path.exists('models/ter_model_finetuned_expert.pth'):
    ter_model.load_state_dict(torch.load('models/ter_model_finetuned_expert.pth', map_location=device))

# 4. FUSION
fusion_model_path = 'models/fusion_model.pkl'
fusion_scaler_path = 'models/fusion_scaler.pkl'
fusion_model = None
fusion_scaler = None
if os.path.exists(fusion_model_path):
    fusion_model = joblib.load(fusion_model_path)
    fusion_scaler = joblib.load(fusion_scaler_path)

# 5. UTILITIES
face_detector = MTCNN(device=device)
music_df = pd.read_csv("data/songs.csv") if os.path.exists("data/songs.csv") else None
labels_list = ['anger', 'disgust', 'fear', 'joy', 'neutral', 'sadness', 'surprise']
id2label = {i: label for i, label in enumerate(labels_list)}

print("✅ All Systems Ready!")

# --- HELPER FUNCTIONS ---
def get_recommendations(emotion):
    if music_df is None: return []
    matched_songs = music_df[music_df['emotion'] == emotion]
    if matched_songs.empty: return []
    selected = matched_songs.sample(n=min(5, len(matched_songs)))
    return [{"title": str(row['song']).split(" - ")[0], "artist": str(row['song']).split(" - ")[-1] if " - " in str(row['song']) else "Unknown"} for _, row in selected.iterrows()]

# --- MAIN PREDICTION ROUTE ---
@app.route('/predict', methods=['POST'])
def predict():
    # Containers
    t_probs = None
    a_probs = None
    f_probs = None
    
    final_text_used = ""
    transcription_source = "none"

    # =========================================================================
    # 1. AUDIO PROCESSING STREAM
    # =========================================================================
    if 'audio' in request.files:
        audio_file = request.files['audio']
        if audio_file.filename != '':
            try:
                # A. Save Raw
                raw_path = "temp_raw_audio"
                audio_file.save(raw_path)
                
                # B. Convert & Check Silence
                clean_path = "temp_clean.wav"
                
                # Load with Pydub
                sound = AudioSegment.from_file(raw_path)
                
                # --- SILENCE CHECK (The Fix) ---
                # dBFS is "Decibels relative to Full Scale". 
                # Silence is usually around -50 to -60. Speech is > -30.
                loudness = sound.dBFS
                print(f"🔊 Audio Loudness: {loudness:.2f} dBFS")

                if loudness < -45.0:  # Threshold for Silence
                    print("⚠️ Audio is Silent. Skipping SER Model.")
                    # We DO NOT set a_probs here, so it remains None (N/A)
                else:
                    # Proceed with Processing
                    sound = sound.set_frame_rate(16000).set_channels(1)
                    sound.export(clean_path, format="wav")

                    # C. Transcribe (Only if not silent)
                    try:
                        with sr.AudioFile(clean_path) as source:
                            audio_data_sr = recognizer.record(source)
                            text_detected = recognizer.recognize_google(audio_data_sr)
                            if text_detected and len(text_detected.strip()) > 0:
                                final_text_used = text_detected
                                transcription_source = "audio"
                                print(f"🎤 Transcribed: '{final_text_used}'")
                    except Exception:
                        pass # Transcription might fail on noise, ignore

                    # D. Run Audio Model (Only if not silent)
                    audio_data, samplerate = sf.read(clean_path)
                    audio_data = audio_data.astype(np.float32)
                    inputs = ser_processor(audio_data, sampling_rate=16000, return_tensors="pt").to(device)
                    with torch.no_grad():
                        logits = ser_model(**inputs).logits
                        a_probs = F.softmax(logits, dim=1).cpu().numpy()[0]
                    print(f"✅ Audio Emotion: {id2label[np.argmax(a_probs)]}")

                # Cleanup
                if os.path.exists(raw_path): os.remove(raw_path)
                if os.path.exists(clean_path): os.remove(clean_path)

            except Exception as e:
                print(f"❌ Audio Pipeline Error: {e}")

    # =========================================================================
    # 2. TEXT PROCESSING STREAM
    # =========================================================================
    # Fallback to Manual Text if Audio didn't produce text
    if not final_text_used:
        manual_text = request.form.get('text', '')
        if manual_text and len(manual_text.strip()) > 0:
            final_text_used = manual_text
            transcription_source = "manual"
            print(f"⌨️ Using Manual Text: '{final_text_used}'")

    if final_text_used:
        try:
            inputs = ter_tokenizer(final_text_used, return_tensors="pt", padding=True, truncation=True).to(device)
            with torch.no_grad():
                logits = ter_model(**inputs).logits
                t_probs = F.softmax(logits, dim=1).cpu().numpy()[0]
            print(f"✅ Text Emotion: {id2label[np.argmax(t_probs)]}")
        except Exception as e:
            print(f"❌ Text Processing Error: {e}")

    # =========================================================================
    # 3. FACE PROCESSING STREAM
    # =========================================================================
    if 'image' in request.files:
        image_file = request.files['image']
        if image_file.filename != '':
            try:
                image = Image.open(image_file).convert('RGB')
                boxes, _ = face_detector.detect(image)
                if boxes is not None:
                    face_crop = image.crop(boxes[0])
                    inputs = fer_processor(images=face_crop, return_tensors="pt").to(device)
                    with torch.no_grad():
                        logits = fer_model(**inputs).logits
                        f_probs = F.softmax(logits, dim=1).cpu().numpy()[0]
                    print(f"✅ Face Emotion: {id2label[np.argmax(f_probs)]}")
            except Exception as e:
                print(f"❌ Face Processing Error: {e}")

    # =========================================================================
    # 4. FUSION & RESULT
    # =========================================================================
    valid_inputs = []
    if f_probs is not None: valid_inputs.append(f_probs)
    if a_probs is not None: valid_inputs.append(a_probs)
    if t_probs is not None: valid_inputs.append(t_probs)

    if not valid_inputs:
        return jsonify({"status": "error", "message": "No valid input detected."})

    # Fusion Logic
    if fusion_model and fusion_scaler and len(valid_inputs) == 3:
        try:
            concat_features = np.concatenate([f_probs, a_probs, t_probs]).reshape(1, -1)
            scaled_features = fusion_scaler.transform(concat_features)
            final_pred_idx = fusion_model.predict(scaled_features)[0]
            final_emotion = id2label[final_pred_idx]
        except:
            avg_probs = np.mean(valid_inputs, axis=0)
            final_emotion = id2label[np.argmax(avg_probs)]
    else:
        avg_probs = np.mean(valid_inputs, axis=0)
        final_emotion = id2label[np.argmax(avg_probs)]

    songs = get_recommendations(final_emotion)

    return jsonify({
        "status": "success",
        "emotion": final_emotion,
        "transcription": final_text_used,
        "source": transcription_source,
        "probabilities": {
            "face": id2label[np.argmax(f_probs)] if f_probs is not None else "N/A",
            "audio": id2label[np.argmax(a_probs)] if a_probs is not None else "N/A",
            "text": id2label[np.argmax(t_probs)] if t_probs is not None else "N/A",
            "fusion": final_emotion
        },
        "songs": songs
    })

if __name__ == '__main__':
    if not os.path.exists('models'):
        os.makedirs('models')
    app.run(debug=True, port=5000)