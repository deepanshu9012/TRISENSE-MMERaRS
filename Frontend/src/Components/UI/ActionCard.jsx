import { motion } from "framer-motion";

function ActionCard({ mood, advice }) {
  const moodColors = {
    Calm: "from-emerald-500 to-teal-600",
    Anxious: "from-rose-500 to-pink-600",
    Low: "from-amber-500 to-orange-600",
  };

  const colorClass = moodColors[mood] || "from-gray-400 to-gray-500";

  return (
    <motion.div
      whileHover={{ x: 4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="group relative bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-xl p-4 hover:border-gray-300/80 hover:shadow-md transition-all duration-300 overflow-hidden"
    >
      {/* Subtle gradient accent */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${colorClass} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
      
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-2 h-2 rounded-full bg-linear-to-r ${colorClass}`}></div>
            <span className="text-sm font-semibold text-gray-900">{mood}</span>
          </div>
          <span className="text-xs text-gray-500 uppercase tracking-wider">Suggested</span>
          <p className="mt-2 text-sm text-gray-700 leading-relaxed">{advice}</p>
        </div>
        <div className="text-xs text-gray-400 group-hover:text-gray-500 transition-colors">⋯</div>
      </div>
    </motion.div>
  );
}

export default ActionCard;