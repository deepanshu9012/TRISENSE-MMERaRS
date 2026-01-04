import React from "react";
import { motion } from "framer-motion";
import { FaYoutube, FaExternalLinkAlt, FaBook, FaShieldAlt, FaWind } from "react-icons/fa";

function Resources() {
  const youtube = [
    { 
      title: 'Understanding Depression', 
      url: 'https://youtu.be/z-IR48Mb3W0?si=S4gz7Baj54CY5loj',
      icon: FaBook,
      color: 'from-purple-500 to-purple-600'
    },
    { 
      title: 'Managing Anxiety - Simple Practices', 
      url: 'https://youtu.be/FpiWSFcL3-c?si=TVwR3CEO8wfpOMX0',
      icon: FaShieldAlt,
      color: 'from-purple-600 to-purple-700'
    },
    { 
      title: 'Short Guided Breathwork', 
      url: 'https://youtu.be/9fEo9my03Ks?si=SsrVfN71EZNxZeBB',
      icon: FaWind,
      color: 'from-purple-500 to-purple-600'
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4 tracking-tight">
          Helpful Resources & Videos
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Curated, compassionate materials to learn more about depression, anxiety, and mood care.
        </p>
      </motion.div>

      {/* Video Cards */}
      <div className="space-y-4 mb-10">
        {youtube.map((v, i) => (
          <motion.a
            key={i}
            href={v.url}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="group relative block"
          >
            {/* Glass Morphism Card */}
            <div className="relative bg-white/70 backdrop-blur-xl border-2 border-gray-200/80 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.06)] p-6 hover:bg-white/80 hover:border-gray-300/90 hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15)] transition-all duration-500 overflow-hidden">
              {/* Top Border */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-gray-300/60 to-transparent group-hover:via-purple-500/60 transition-all duration-500"></div>
              
              {/* Content */}
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-4 flex-1">
                  {/* Icon */}
                  <div className={`shrink-0 w-12 h-12 rounded-xl bg-linear-to-br ${v.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <v.icon className="text-lg" />
                  </div>
                  
                  {/* Text Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg text-gray-900 mb-1 group-hover:text-gray-800 transition-colors duration-300">
                      {v.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FaYoutube className="text-red-500 shrink-0" />
                      <span>YouTube</span>
                      <span>•</span>
                      <span>10–20 mins</span>
                    </div>
                  </div>
                </div>

                {/* External Link Icon */}
                <div className="shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-purple-50 transition-colors duration-300">
                    <FaExternalLinkAlt className="text-gray-400 group-hover:text-purple-600 transition-colors duration-300" />
                  </div>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-linear-to-r from-blue-50/0 via-blue-50/50 to-blue-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Note on Help Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative bg-linear-to-r from-purple-50/50 to-purple-100/50 backdrop-blur-sm border-2 border-purple-200/60 rounded-2xl p-6 md:p-8 overflow-hidden"
      >
        {/* Left Border Accent */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-purple-600 to-purple-700"></div>
        
        {/* Content */}
        <div className="pl-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">⚠️</span>
            <h3 className="font-semibold text-lg text-gray-900">Note on Help</h3>
          </div>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed">
            If you or someone you know is in immediate danger or having thoughts of self-harm, please contact local emergency services or a crisis line. The videos here are educational and not a substitute for professional care.
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-purple-100/30 to-transparent rounded-bl-full"></div>
      </motion.div>
    </div>
  );
}

export default Resources;