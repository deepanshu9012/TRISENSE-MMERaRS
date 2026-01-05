# TriSense: Multimodal Emotion Recognition & Music Recommendation

![TriSense Banner](assets/to/image_209189.png)

> **"Detect Emotions. Understand Faces. Find Balance."**

**TriSense** is a real-time Multimodal Emotion Recognition (MER) system that analyzes human emotion through three distinct channels: **Facial Expressions (Vision)**, **Speech Tonalities (Audio)**, and **Spoken Content (Text)**. By fusing these modalities, TriSense predicts the user's emotional state with high robustness and recommends a curated music playlist to align with or uplift that mood.

---

## 🚀 Key Features

* **Real-Time Multimodal Analysis:** Captures live video and audio to perform simultaneous inference.
* **Late Fusion Architecture:** Aggregates predictions from three independent deep learning models to handle conflicting signals (e.g., smiling face but angry voice).
* **Smart Music Recommendation:** Maps detected emotions (Joy, Sadness, Anger, Neutral, etc.) to specific Spotify/YouTube playlists.
* **Privacy-First:** Processes data locally or in ephemeral sessions without storing raw user video feeds.

---

## 🧠 System Architecture

TriSense utilizes a **Late Fusion** approach, training three separate State-of-the-Art (SOTA) models on the **MELD Dataset** before aggregating their outputs.

| Modality | Model Architecture | Pre-training |
| :--- | :--- | :--- |
| **Vision (FER)** | Fine-tuned **AffectNet** | ImageNet / AffectNet |
| **Audio (SER)** | **Wav2Vec 2.0** | LibriSpeech |
| **Text (TER)** | **DistilRoBERTa** | GoEmotions / Wikipedia |

The final decision is made via a **Weighted Majority Voting** algorithm, ensuring that if one modality fails (e.g., background noise affects Audio), the others can correct the prediction.

---

## 📸 Screenshots

| Landing Page | Live Analysis |
| :---: | :---: |
| ![Landing Page](assets\Home_page.png") | ![Live Scan](assets\live_scan.png") |
| *Modern, responsive UI* | *Real-time inference (Face/Audio/Text)* |

| Mood Result | Music Player |
| :---: | :---: |
| ![Results](assets\result.jpg") | ![Player](assets\player.png") |
| *Joy Playlist Recommendation* | *Integrated Music Playback* |

---

## 🛠️ Tech Stack

### **Frontend**
* **React.js** (User Interface)
* **Tailwind CSS** (Styling)
* **Axios** (API Communication)

### **Backend**
* **Flask** (Python Web Server)
* **PyTorch / TensorFlow** (Model Inference)
* **Librosa** (Audio Processing)
* **OpenCV** (Video Capture)
* **HuggingFace Transformers** (Model Weights)

---

## 📊 Performance

TriSense was evaluated on the **MELD Dataset**, competing favorably with established baselines.

| Model | Accuracy / F1 |
| :--- | :--- |
| MMGCN (Baseline) | 58.65% (F1) |
| DialogueRNN (Baseline) | ~57-60% (F1) |
| **TriSense (Ours)** | **66.0% (Accuracy)** |

---

## ⚙️ Installation & Setup

### Prerequisites
* Python 3.8+
* Node.js & npm

### 1. Clone the Repository
```bash
git clone [https://github.com/yourusername/trisense.git](https://github.com/yourusername/trisense.git)
cd trisense