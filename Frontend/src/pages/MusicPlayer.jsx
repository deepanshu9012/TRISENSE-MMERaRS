import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import musicData from '../musicData';

const MusicPlayer = () => {
  const { emotion, songId } = useParams();
  const navigate = useNavigate();

  // 1. Get the list of songs for this emotion
  const songs = musicData[emotion?.toLowerCase()] || [];

  // 2. Find the index of the current song
  // We use parseInt because URLs are strings, but our IDs in data are numbers
  const currentIndex = songs.findIndex((s) => s.id === parseInt(songId));
  
  const currentSong = songs[currentIndex];

  // 3. Helper to handle navigation safely
  const handleNext = () => {
    if (currentIndex < songs.length - 1) {
      const nextSong = songs[currentIndex + 1];
      navigate(`/player/${emotion}/${nextSong.id}`);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevSong = songs[currentIndex - 1];
      navigate(`/player/${emotion}/${prevSong.id}`);
    }
  };

  // Error handling if song isn't found
  if (!currentSong) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Song not found</h2>
        <button 
            onClick={() => navigate(`/playlist/${emotion}`)}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg"
        >
            Back to Playlist
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      {/* Back Button */}
      <button 
        onClick={() => navigate(`/playlist/${emotion}`)} 
        className="absolute top-8 left-8 text-white/70 hover:text-white flex items-center gap-2 transition"
      >
        ← Back to Playlist
      </button>

      {/* Player Card */}
      <div className="bg-gray-800 p-8 rounded-3xl shadow-2xl max-w-md w-full text-center border border-gray-700">
        
        {/* Album Art */}
        <div className="w-64 h-64 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl mx-auto mb-8 shadow-lg flex items-center justify-center overflow-hidden">
             {/* If you have real covers, use: <img src={currentSong.cover} alt="cover" /> */}
             <span className="text-6xl text-white/20">🎵</span>
        </div>
        
        {/* Song Info */}
        <h2 className="text-2xl font-bold text-white mb-2 truncate">{currentSong.title}</h2>
        <h4 className="text-lg text-gray-400 mb-6 truncate">{currentSong.artist}</h4>

        {/* CONTROLS: Prev / Next Buttons */}
        <div className="flex justify-center items-center gap-6 mb-6">
            
            {/* PREVIOUS BUTTON */}
            <button 
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`p-4 rounded-full transition ${
                    currentIndex === 0 
                    ? 'text-gray-600 cursor-not-allowed' 
                    : 'text-white bg-gray-700 hover:bg-purple-600'
                }`}
            >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/> 
                </svg>
            </button>

            {/* NEXT BUTTON */}
            <button 
                onClick={handleNext}
                disabled={currentIndex === songs.length - 1}
                className={`p-4 rounded-full transition ${
                    currentIndex === songs.length - 1
                    ? 'text-gray-600 cursor-not-allowed' 
                    : 'text-white bg-gray-700 hover:bg-purple-600'
                }`}
            >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
                </svg>
            </button>
        </div>

        {/* AUDIO PLAYER */}
        {/* KEY ATTRIBUTE IS CRITICAL HERE: It forces the player to reload when song changes */}
        <audio 
            key={currentSong.file} 
            controls 
            autoPlay 
            className="w-full"
            // Optional: Auto-play next song when this one ends
            onEnded={handleNext}
        >
          <source src={currentSong.file} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default MusicPlayer;