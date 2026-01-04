import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import musicData from '../musicData';

const Playlist = () => {
  const { emotion } = useParams(); 
  const navigate = useNavigate();
  
  // Debugging: Check the console (F12) to see if this prints
  console.log("Playlist loaded. Emotion:", emotion);

  // Safely get songs, handling cases where emotion might be undefined
  const songs = musicData[emotion?.toLowerCase()] || [];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 capitalize">
                {emotion} Playlist
            </h1>
            <button 
                onClick={() => navigate('/scan')} 
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 font-medium transition"
            >
                Back to Scan
            </button>
        </div>
        
        {/* Content */}
        {songs.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-xl text-gray-500">No music found for "{emotion}".</h2>
            <p className="text-gray-400 mt-2">Check your musicData.js file.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {songs.map((song) => (
              <div 
                key={song.id} 
                onClick={() => navigate(`/player/${emotion}/${song.id}`)}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center cursor-pointer hover:shadow-md hover:border-purple-200 transition"
              >
                <div className="flex items-center gap-4">
                    {/* Placeholder Icon */}
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">
                        ♪
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-gray-900">{song.title}</h3>
                        <p className="text-sm text-gray-500">{song.artist}</p>
                    </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                    ▶
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Playlist;