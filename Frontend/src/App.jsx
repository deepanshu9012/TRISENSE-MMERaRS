import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Removed unused icons to keep it clean (unless you need them in this specific file)
import Header from "./Components/Layout/Header";
import Footer from "./Components/Layout/Footer";

// Page Imports
import Home from "./pages/Home";
import Expressions from "./pages/Expressions";
import LiveScan from "./pages/LiveScan";
import Resources from "./pages/Resources";
import About from "./pages/About";

// --- NEW IMPORTS (Missing before) ---
import Playlist from "./pages/Playlist";
import MusicPlayer from "./pages/MusicPlayer";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 text-gray-900 antialiased flex flex-col">
        <Header />
        
        <main className="container mx-auto px-4 py-8 grow">
          <Routes>
            {/* Existing Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/expressions" element={<Expressions />} />
            <Route path="/live-scan" element={<LiveScan />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/about" element={<About />} />

            {/* --- NEW ROUTES (Add these to fix the blank page) --- */}
            <Route path="/playlist/:emotion" element={<Playlist />} />
            <Route path="/player/:emotion/:songId" element={<MusicPlayer />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}