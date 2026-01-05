# TriSense: Multimodal Emotion Recognition & Music Recommendation

![TriSense Banner](https://github.com/deepanshu9012/TRISENSE-MMERaRS/blob/19ab0360cffece2de614c8f63568b1c5d2ae8cd2/assets/trisense_banner.png)

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
| ![Landing Page](https://github.com/deepanshu9012/TRISENSE-MMERaRS/blob/ac6de7028eda89f2c6a93de10463815c58d8f37c/assets/Home_page.png) | ![Live Scan](https://github.com/deepanshu9012/TRISENSE-MMERaRS/blob/19ab0360cffece2de614c8f63568b1c5d2ae8cd2/assets/live_scan.png) |
| *Modern, responsive UI* | *Real-time inference (Face/Audio/Text)* |

| Mood Result | Music Player |
| :---: | :---: |
| ![Results](https://github.com/deepanshu9012/TRISENSE-MMERaRS/blob/19ab0360cffece2de614c8f63568b1c5d2ae8cd2/assets/result.jpg)| ![Player](https://github.com/deepanshu9012/TRISENSE-MMERaRS/blob/19ab0360cffece2de614c8f63568b1c5d2ae8cd2/assets/player.png) |
| *Joy Result & Playlist & Recommended* | *Integrated Music Playback* | 

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
