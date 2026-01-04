import { motion } from "framer-motion";
import { FaUser, FaComments, FaMicrophone, FaShieldAlt, FaMobileAlt, FaHeart } from "react-icons/fa";

function About() {
  const recognitionTypes = [
    {
      title: "Face Recognition",
      description: "Advanced facial expression analysis to detect emotions through micro-expressions and facial cues.",
      icon: FaUser,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Text Analysis",
      description: "Natural language processing to understand emotional context and sentiment from written communication.",
      icon: FaComments,
      color: "from-purple-600 to-purple-700"
    },
    {
      title: "Voice Recognition",
      description: "Voice pattern analysis to identify emotional states through tone, pitch, and speech patterns.",
      icon: FaMicrophone,
      color: "from-purple-500 to-purple-600"
    }
  ];

  const principles = [
    {
      title: "Privacy-First Design",
      description: "No data shared without explicit consent in production.",
      icon: FaShieldAlt,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Lightweight & Fast",
      description: "Optimized for mobile and low-bandwidth contexts.",
      icon: FaMobileAlt,
      color: "from-purple-600 to-purple-700"
    },
    {
      title: "Evidence-Inspired",
      description: "Simple, compassionate actions based on research.",
      icon: FaHeart,
      color: "from-purple-500 to-purple-600"
    }
  ];

return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Main Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative bg-white/70 backdrop-blur-xl border-2 border-gray-200/80 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.06)] p-10 md:p-12 lg:p-16 mb-16"
      >
        {/* Top Border */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-gray-300/60 to-transparent"></div>
        
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 mb-3 text-center leading-tight tracking-tight">
              <span className="block">Understanding Emotions</span>
              <span className="block bg-linear-to-r from-purple-600 via-purple-700 to-purple-600 bg-clip-text text-transparent">
                Through Multi-Modal Recognition
              </span>
            </h2>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="h-px w-12 bg-linear-to-r from-transparent to-gray-300"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-linear-to-r from-purple-600 to-purple-700"></div>
              <div className="h-px w-12 bg-linear-to-r from-gray-300 to-transparent"></div>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-center max-w-3xl mx-auto">
            Trisense combines <strong className="text-gray-900">face recognition</strong>, <strong className="text-gray-900">text analysis</strong>, and <strong className="text-gray-900">voice recognition</strong> to provide comprehensive emotional insights and support your wellbeing journey.
          </p>
        </div>
      </motion.div>

      {/* Recognition Types Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
          Recognition Technologies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recognitionTypes.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative h-full"
            >
              {/* Glass Morphism Card */}
              <div className="relative h-full bg-white/70 backdrop-blur-xl border-2 border-gray-200/80 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.06)] p-6 hover:bg-white/80 hover:border-gray-300/90 hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15)] transition-all duration-500 overflow-hidden flex flex-col">
                {/* Top Border */}
                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Icon */}
                <div className={`shrink-0 w-14 h-14 rounded-xl bg-linear-to-br ${item.color} flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="text-xl" />
                </div>
                
                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <h3 className="font-semibold text-xl text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm flex-1">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Core Principles Section */}
      <div>
        <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
          Our Core Principles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {principles.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative h-full"
            >
              {/* Glass Morphism Card */}
              <div className="relative h-full bg-white/70 backdrop-blur-xl border-2 border-gray-200/80 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.06)] p-6 hover:bg-white/80 hover:border-gray-300/90 hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15)] transition-all duration-500 overflow-hidden flex flex-col">
                {/* Top Border */}
                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Icon */}
                <div className={`shrink-0 w-14 h-14 rounded-xl bg-linear-to-br ${item.color} flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="text-xl" />
                </div>
                
                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <h3 className="font-semibold text-xl text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm flex-1">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
</div>
);
}

export default About;