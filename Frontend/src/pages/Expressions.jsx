import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Added for navigation
import { FaPlayCircle } from "react-icons/fa"; // Optional: precise icon for the action

function Expressions() {
  const navigate = useNavigate();

  const expressions = [
    { 
      id: 'joy', 
      title: 'Joy / Happiness', 
      desc: 'Lightness in the eyes, relaxed smile. A signal of safety and connection.',
      icon: '😊',
      tips: [
        { label: 'Savoring', text: 'Take a moment to fully feel this energy.' },
        { label: 'Activity', text: 'Share this feeling with a friend or journal it.' },
        { label: 'Music', text: 'Play upbeat tracks to sustain the vibe.' }
      ]
    },
    { 
      id: 'sadness', 
      title: 'Sadness', 
      desc: 'Softened features, slower gaze. A call for healing and reflection.',
      icon: '😔',
      tips: [
        { label: 'Self-Compassion', text: 'Allow yourself to cry; it releases stress.' },
        { label: 'Activity', text: 'Wrap up in a blanket or take a slow walk.' },
        { label: 'Music', text: 'Listen to soothing, slow-tempo melodies.' }
      ]
    },
    { 
      id: 'anger', 
      title: 'Anger', 
      desc: 'Furrowed brow, tight jaw. A protective response to boundaries being crossed.',
      icon: '😠',
      tips: [
        { label: 'Cool Down', text: 'Count backwards from 10 to 1.' },
        { label: 'Activity', text: 'Physical movement like running or squeezing a stress ball.' },
        { label: 'Music', text: 'High-energy rock or intense beats to release tension.' }
      ]
    },
    { 
      id: 'fear', 
      title: 'Fear / Anxiety', 
      desc: 'Wide eyes, quickened breath. The body is preparing for safety.',
      icon: '😨',
      tips: [
        { label: 'Grounding', text: 'Name 5 things you see and 4 things you feel.' },
        { label: 'Breathing', text: 'Inhale for 4s, hold for 7s, exhale for 8s.' },
        { label: 'Music', text: 'Calm, ambient sounds to lower heart rate.' }
      ]
    },
    { 
      id: 'surprise', 
      title: 'Surprise', 
      desc: 'Raised eyebrows, dropped jaw. A reaction to the unexpected.',
      icon: '😲',
      tips: [
        { label: 'Check-in', text: 'Is this a good surprise or a shock?' },
        { label: 'Stabilize', text: 'Place a hand on your chest to center yourself.' },
        { label: 'Music', text: 'Dynamic and eclectic rhythms.' }
      ]
    },
    { 
      id: 'disgust', 
      title: 'Disgust', 
      desc: 'Wrinkled nose, narrowed eyes. A rejection of something unpleasant.',
      icon: '🤢',
      tips: [
        { label: 'Perspective', text: 'Identify exactly what triggered this feeling.' },
        { label: 'Environment', text: 'Step away or change your sensory input.' },
        { label: 'Music', text: 'Clean, crisp, or heavy experimental sounds.' }
      ]
    },
    { 
      id: 'neutral', 
      title: 'Neutral', 
      desc: 'Calm baseline, relaxed muscles. The perfect state for reset.',
      icon: '😐',
      tips: [
        { label: 'Mindfulness', text: 'Do a quick body scan meditation.' },
        { label: 'Focus', text: 'Great time for deep work or reading.' },
        { label: 'Music', text: 'Lo-fi beats or classical background music.' }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-5 tracking-tight">
          Understanding Expressions
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Every emotion has a purpose. Click on any card below to explore its tailored music playlist.
        </p>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {expressions.map((e, index) => (
          <motion.article
            key={e.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ 
              y: -8,
              scale: 1.02,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            onClick={() => navigate(`/playlist/${e.id}`)} // CLICK ACTION ADDED
            className="group relative rounded-2xl overflow-hidden cursor-pointer"
          >
            {/* Glass Morphism Background */}
            <div className="absolute inset-0 bg-white/70 backdrop-blur-xl border-2 border-gray-200/80 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.06)] group-hover:bg-white/80 group-hover:border-purple-300/50 group-hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15)] transition-all duration-500 ease-out"></div>
            
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
            
            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out rounded-2xl"></div>
            
            {/* Content */}
            <div className="p-8 lg:p-10 relative z-10">
              {/* Header with Icon */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <motion.div 
                    className="flex items-center gap-3 mb-2"
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.span 
                      className="text-4xl"
                      whileHover={{ 
                        scale: 1.2,
                        rotate: [0, -10, 10, -10, 0],
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {e.icon}
                    </motion.span>
                    <h3 className="font-semibold text-2xl text-gray-900 tracking-tight group-hover:text-purple-700 transition-colors duration-300">
                      {e.title}
                    </h3>
                  </motion.div>
                </div>
                {/* Play Icon Indicator */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-purple-500 text-2xl">
                    <FaPlayCircle />
                </div>
              </div>

              {/* Description */}
              <motion.p 
                className="text-gray-600 mb-8 leading-relaxed text-[15px] font-light min-h-[48px]"
                whileHover={{ color: "#374151" }}
                transition={{ duration: 0.3 }}
              >
                {e.desc}
              </motion.p>

              {/* Elegant Divider */}
              <div className="relative mb-8">
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200/80 to-transparent group-hover:via-purple-300/80 group-hover:h-0.5 transition-all duration-500"></div>
              </div>

              {/* Tips List */}
              <div className="space-y-5">
                {e.tips.map((tip, tipIndex) => (
                  <motion.div 
                    key={tipIndex} 
                    className="relative pl-6"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Elegant bullet */}
                    <motion.div 
                      className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-gray-400/60 group-hover:bg-purple-500/80 transition-colors duration-300"
                      whileHover={{ scale: 1.5 }}
                      transition={{ duration: 0.2 }}
                    ></motion.div>
                    <div>
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-1.5 group-hover:text-purple-600 transition-colors duration-300">
                        {tip.label}
                      </span>
                      <p className="text-sm text-gray-700 leading-relaxed font-light group-hover:text-gray-900 transition-colors duration-300">
                        {tip.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Click CTA Overlay (Subtle) */}
            <div className="absolute bottom-4 right-6 text-xs font-medium text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Click to Listen →
            </div>

          </motion.article>
        ))}
      </div>
    </div>
  );
}

export default Expressions;