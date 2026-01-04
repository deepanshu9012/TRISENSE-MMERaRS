import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import ActionCard from "../Components/UI/ActionCard";
import musicData from "../musicData";

function LiveScan() {
  const navigate = useNavigate();

  // --- 1. STATE WITH PERSISTENCE ---
  // We initialize state by checking sessionStorage first.
  
  const [scanState, setScanState] = useState(() => {
    return sessionStorage.getItem("lastScanResult") ? "results" : "idle";
  });

  const [apiResult, setApiResult] = useState(() => {
    const saved = sessionStorage.getItem("lastScanResult");
    return saved ? JSON.parse(saved) : null;
  });

  const [imgSrc, setImgSrc] = useState(() => {
    return sessionStorage.getItem("lastScanImage") || null;
  });

  const [audioBlob, setAudioBlob] = useState(null);
  const [textInput, setTextInput] = useState("");

  // Refs
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const webcamRef = useRef(null);

  // --- 2. START SCAN: CLEAR OLD DATA ---
  const startScan = async () => {
    // Clear previous session data when starting a NEW scan
    sessionStorage.removeItem("lastScanResult");
    sessionStorage.removeItem("lastScanImage");
    
    setScanState("recording_audio");
    setApiResult(null);
    setTextInput(""); 
    setImgSrc(null);
    audioChunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const createdAudioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        setAudioBlob(createdAudioBlob);
        
        // Auto Capture Face
        setScanState("capturing_face");
        setTimeout(() => {
            captureAndSend(createdAudioBlob);
        }, 500);
      };

      mediaRecorderRef.current.start();
      
      // Stop automatically after 5 seconds
      setTimeout(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
          mediaRecorderRef.current.stop();
        }
      }, 5000);

    } catch (err) {
      console.error("Audio permission denied or error:", err);
      setScanState("capturing_face");
      setTimeout(() => captureAndSend(null), 500);
    }
  };

  const captureAndSend = (currentAudioBlob) => {
    if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
        processData(imageSrc, currentAudioBlob, "");
    } else {
        console.error("Webcam reference not found!");
        setScanState("idle");
    }
  };

  // --- 3. PROCESS DATA: SAVE TO STORAGE ON SUCCESS ---
  const processData = async (image, audio, text) => {
    setScanState("processing");

    const formData = new FormData();
    if (text) formData.append("text", text);
    if (audio) formData.append("audio", audio, "recording.wav");
    if (image) {
        const fetchRes = await fetch(image);
        const blob = await fetchRes.blob();
        formData.append("image", blob, "face.jpg");
    }

    try {
        const response = await fetch("http://127.0.0.1:5000/predict", {
            method: "POST",
            body: formData,
        });
        const data = await response.json();

        if (!text && (!data.transcription || data.transcription.trim() === "")) {
            console.log("Audio was silent. Switching to manual input.");
            setScanState("text_fallback"); 
            return; 
        }

        // SAVE TO SESSION STORAGE
        try {
            sessionStorage.setItem("lastScanResult", JSON.stringify(data));
            if (image) sessionStorage.setItem("lastScanImage", image);
        } catch (e) {
            console.warn("Could not save to session storage (quota exceeded?)", e);
        }

        setApiResult(data);
        setScanState("results");

    } catch (error) {
        console.error("Error connecting to TriSense API:", error);
        alert("Failed to connect to backend model.");
        setScanState("idle");
    }
  };

  const handleSongClick = (songTitle, emotion) => {
    const localList = musicData[emotion.toLowerCase()] || [];
    const match = localList.find(s => 
      s.title.toLowerCase() === songTitle.toLowerCase() || 
      songTitle.toLowerCase().includes(s.title.toLowerCase())
    );

    if (match) {
        navigate(`/player/${emotion}/${match.id}`);
    } else {
        navigate(`/playlist/${emotion}`);
    }
  };

  // --- RENDER ---
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Live Scanning</h1>
        <p className="text-lg text-gray-600">
          TriSense Multimodal Analysis: Audio + Vision + Text
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LEFT COLUMN */}
        <motion.div layout className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl p-8 shadow-lg">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-2xl text-gray-900">Live Scan</h3>
                {/* Optional Clear Button to manually reset */}
                {scanState === "results" && (
                    <button 
                        onClick={() => {
                            sessionStorage.clear();
                            setScanState("idle");
                            setApiResult(null);
                            setImgSrc(null);
                        }}
                        className="text-xs text-red-500 underline hover:text-red-700"
                    >
                        Clear Results
                    </button>
                )}
            </div>

            <p className="text-sm text-gray-600 mb-6">
                {scanState === "recording_audio" && "🎤 Listening... (Please speak now)"}
                {scanState === "capturing_face" && "📸 Capturing Face..."}
                {scanState === "text_fallback" && "⌨️ We couldn't hear you. Please type your feeling:"}
                {scanState === "processing" && "⚙️ Analyzing Emotion..."}
                {scanState === "results" && "✅ Analysis Complete (Saved)."}
                {scanState === "idle" && "Ready to start."}
            </p>

            <div className="relative h-72 rounded-xl bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                {scanState === "idle" && (
                     <div className="text-center text-gray-400">
                        <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        <p>Preview Window</p>
                     </div>
                )}

                {(scanState === "recording_audio" || scanState === "capturing_face") && (
                    <>
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        {scanState === "recording_audio" && (
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                <motion.div 
                                    animate={{ scale: [1, 1.2, 1] }} 
                                    transition={{ repeat: Infinity, duration: 1 }}
                                    className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-2xl border-4 border-white/50"
                                >
                                    🎤
                                </motion.div>
                            </div>
                        )}
                    </>
                )}

                {scanState === "text_fallback" && (
                    <div className="w-full px-8 bg-white h-full flex flex-col justify-center items-center">
                         <p className="text-purple-600 font-semibold mb-2">Audio was silent.</p>
                         <textarea
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                            rows="4"
                            placeholder="Type how you are feeling..."
                            value={textInput}
                            onChange={(e) => setTextInput(e.target.value)}
                          />
                    </div>
                )}

                {scanState === "results" && imgSrc && (
                    <img src={imgSrc} alt="Captured" className="w-full h-full object-cover" />
                )}
            </div>

            <div className="mt-6 flex gap-3">
                {(scanState === "idle" || scanState === "results") && (
                    <button 
                        onClick={startScan}
                        className="flex-1 px-6 py-3 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 transition"
                    >
                        {scanState === "results" ? "Scan New" : "Start Scan"}
                    </button>
                )}

                {scanState === "text_fallback" && (
                    <button 
                        onClick={() => processData(imgSrc, audioBlob, textInput)}
                        className="flex-1 px-6 py-3 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 transition"
                    >
                        Submit Analysis
                    </button>
                )}
            </div>
        </motion.div>

        {/* RIGHT COLUMN: Results */}
        <motion.div layout className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl p-8 shadow-lg">
            <div className="mb-6">
              <h3 className="font-semibold text-2xl text-gray-900 mb-2">Mood & Suggested Actions</h3>
              <p className="text-sm text-gray-500">Based on your TriSense analysis</p>
            </div>

            {apiResult ? (
                 <div className="space-y-4">
                    <div 
                        onClick={() => navigate(`/playlist/${apiResult.emotion}`)}
                        className="p-4 bg-purple-50 border border-purple-100 rounded-xl cursor-pointer hover:bg-purple-100 transition shadow-sm"
                        title="Click to view full playlist"
                    >
                        <div className="flex justify-between items-center mb-1">
                            <h4 className="text-purple-900 font-bold uppercase tracking-wider text-xs">Detected Emotion</h4>
                            <span className="text-xs text-purple-600 font-semibold bg-white px-2 py-1 rounded-full">Click for Playlist →</span>
                        </div>
                        <p className="text-3xl font-display text-purple-700 capitalize">{apiResult.emotion}</p>
                        
                        <div className="mt-4 pt-3 border-t border-purple-100">
                             {apiResult.transcription ? (
                                <p className="text-md text-gray-700 italic mb-3 bg-white p-2 rounded-lg border border-purple-100">
                                    " {apiResult.transcription} "
                                </p>
                             ) : (
                                <p className="text-xs text-gray-400 italic mb-3">No speech detected.</p>
                             )}

                             <div className="text-xs text-gray-500 grid grid-cols-2 gap-y-1">
                                <span className="flex items-center">👤 Face Model: <b className="ml-1 text-purple-600">{apiResult.probabilities?.face}</b></span>
                                <span className="flex items-center">🔊 Audio Model: <b className="ml-1 text-purple-600">{apiResult.probabilities?.audio}</b></span>
                                <span className="flex items-center">📝 Text Model: <b className="ml-1 text-purple-600">{apiResult.probabilities?.text}</b></span>
                             </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h4 className="font-medium text-gray-700">Recommended Music (Click to Play)</h4>
                        {apiResult.songs && apiResult.songs.map((song, idx) => (
                            <div key={idx} onClick={() => handleSongClick(song.title, apiResult.emotion)}>
                                <ActionCard 
                                    mood="Music" 
                                    advice={`${song.title} - ${song.artist}`} 
                                    className="cursor-pointer hover:bg-gray-50 transition"
                                />
                            </div>
                        ))}
                    </div>
                 </div>
            ) : (
                <div className="space-y-4 opacity-50 grayscale">
                    <ActionCard mood="Waiting..." advice="Start the scan to see results here." />
                </div>
            )}
        </motion.div>
      </div>
    </div>
  );
}

export default LiveScan;