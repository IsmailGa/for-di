import { motion } from 'motion/react';
import { Heart, Stars } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 px-4 bg-gradient-to-t from-purple-50/50 to-white overflow-hidden border-t border-purple-100/40 text-center">
      {/* Tiny background ambient shapes */}
      <div className="absolute top-1/2 left-10 w-24 h-24 bg-pink-100/30 rounded-full blur-xl pointer-events-none" />
      <div className="absolute bottom-4 right-10 w-32 h-32 bg-purple-100/20 rounded-full blur-xl pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center relative z-10">
        
        {/* Animated Floating Heart */}
        <motion.div
          animate={{
            y: [0, -12, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-pink-500 mb-6 drop-shadow-md"
        >
          <Heart size={36} fill="#ef4444" stroke="none" className="opacity-95" />
        </motion.div>

        {/* Short romantic quote in premium serif */}
        <p className="font-serif italic text-purple-950 font-medium text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-6 px-4">
          «В целом мире нет для меня сердца подобного твоему. В целом мире нет любви к тебе безграничнее моей.»
        </p>

        {/* Small subtitle confession info */}
        <div className="flex items-center gap-1.5 text-xs text-purple-900/60 font-medium mb-8">
          <span>Сделано с бесконечной нежностью для тебя</span>
          <Stars size={13} className="text-amber-400 rotate-12" />
        </div>

        {/* Minimalist divider */}
        <div className="w-16 h-[1.5px] bg-purple-100 mb-6" />

        {/* Bottom credits */}
        <div className="text-[10px] text-purple-900/40 uppercase tracking-widest font-semibold">
          <span>© {currentYear} • НАВСЕГДА ВМЕСТЕ • НАШЕ СЧАСТЬЕ</span>
        </div>
      </div>
    </footer>
  );
}
