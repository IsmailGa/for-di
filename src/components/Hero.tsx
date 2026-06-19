import { motion } from 'motion/react';
import { Heart, Sparkles, ChevronDown } from 'lucide-react';
import React, { useState, useEffect } from 'react';

interface HeroProps {
  onScrollToGallery: () => void;
}

export default function Hero({ onScrollToGallery }: HeroProps) {
  const [girlName, setGirlName] = useState<string>("Ди");
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(girlName);

  useEffect(() => {
    localStorage.setItem('girlfriend_name', girlName);
  }, [girlName]);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim()) {
      setGirlName(tempName.trim());
      setIsEditingName(false);
    }
  };

  const titleText = `${girlName}, ты моё самое большое счастье ✨`;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Absolute decor assets */}
      <div className="absolute top-12 left-4 sm:left-12 w-48 sm:w-64 h-48 sm:h-64 bg-pink-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-12 right-4 sm:right-12 w-64 sm:w-80 h-64 sm:h-80 bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-12 sm:right-1/4 w-36 sm:w-48 h-36 sm:h-48 bg-indigo-200/20 rounded-full blur-2xl pointer-events-none" />

      {/* Confetti-like floating hearts in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300/40"
            style={{
              left: `${10 + i * 8}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -15, 0],
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4 + (i % 3) * 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut',
            }}
          >
            <Heart size={16 + (i % 4) * 6} fill="currentColor" stroke="none" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center justify-center">
        {/* Top small badge */}
        

        {isEditingName ? (
          <motion.form
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSaveName}
            className="mb-8 p-4 rounded-2xl glass flex flex-col sm:flex-row gap-2 items-center w-full max-w-md shadow-lg"
          >
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              placeholder="Введи свое имя..."
              className="px-4 py-2 bg-white/70 backdrop-blur-md rounded-xl text-purple-800 outline-hidden border border-purple-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 w-full transition-all text-center sm:text-left font-medium"
              maxLength={20}
              autoFocus
            />
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                type="submit"
                className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-xl font-medium transition-colors text-sm flex-1 sm:flex-initial cursor-pointer"
              >
                Сохранить
              </button>
              <button
                type="button"
                onClick={() => setIsEditingName(false)}
                className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 rounded-xl font-medium transition-colors text-sm cursor-pointer"
              >
                Отмена
              </button>
            </div>
          </motion.form>
        ) : null}

        {/* Animated letter headings */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold tracking-tight text-purple-950 mb-6 leading-tight max-w-3xl">
          {titleText.split(' ').map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: i * 0.12,
                ease: [0.215, 0.61, 0.355, 1],
              }}
            >
              {word.includes('✨') ? (
                <span className="bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  {word}
                </span>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </h1>

        {/* Nested romantic summary subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-base sm:text-lg md:text-xl text-purple-900/75 font-normal max-w-xl mx-auto leading-relaxed mb-12"
        >
          Добро пожаловать в наше личное уютное пространство воспоминаний, улыбок и нежных признаний. Это место принадлежит только нам двоим. 💕
        </motion.p>

        {/* Sweet Action button scroll down */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onScrollToGallery}
          className="group relative cursor-pointer px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl hover:shadow-pink-400/20 active:shadow-md transition-all duration-300"
          id="btn-scroll-gallery"
        >
          {/* Inner ambient ring */}
          <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
          <span className="flex items-center gap-2 relative z-10 text-sm tracking-wide">
            Отправить в путешествие воспоминаний
            <Heart size={16} fill="white" className="group-hover:animate-ping" />
          </span>
        </motion.button>
      </div>

      {/* Down arrow indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.7, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 2 }}
        className="absolute bottom-8 cursor-pointer text-purple-400"
        onClick={onScrollToGallery}
      >
        <ChevronDown size={28} className="animate-bounce" />
      </motion.div>
    </section>
  );
}
