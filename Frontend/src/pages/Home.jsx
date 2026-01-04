import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="flex items-center justify-center min-h-[60vh]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto px-4"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-800">
          Detect Emotions. Understand Faces.
        </h2>

        <p className="mt-4 text-lg md:text-xl text-gray-700">
          A modern platform to read emotions, understand expressions,
          and find emotional balance.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            to="/live-scan" 
            className="group relative px-8 py-3.5 rounded-full bg-linear-to-r from-purple-600 to-purple-700 text-white font-medium text-base tracking-tight shadow-lg shadow-purple-600/30 hover:shadow-xl hover:shadow-purple-600/40 hover:scale-105 active:scale-100 transition-all duration-300 ease-out"
          >
            <span className="relative z-10">Try Live Scan</span>
            <span className="absolute inset-0 rounded-full bg-linear-to-r from-purple-700 to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Link>

          <Link 
            to="/expressions" 
            className="px-8 py-3.5 rounded-full bg-white/80 backdrop-blur-sm text-gray-800 font-medium text-base tracking-tight border border-gray-200/60 shadow-sm hover:bg-white hover:shadow-md hover:scale-105 active:scale-100 transition-all duration-300 ease-out"
          >
            Explore Expressions
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

export default Home;
