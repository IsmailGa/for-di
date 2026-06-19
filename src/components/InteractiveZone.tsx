import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Smile, Gift, Calendar, Award } from 'lucide-react';
import { predictions } from '../data';
import { Prediction } from '../types';

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  scale: number;
  color: string;
}

export default function InteractiveZone() {
  // Game 1: Cookie states
  const [currentPrediction, setCurrentPrediction] = useState<Prediction | null>(null);
  const [isCookieCracking, setIsCookieCracking] = useState(false);
  const [isCookieBroken, setIsCookieBroken] = useState(false);

  // Game 2: Clicker states
  const [clickCount, setClickCount] = useState<number>(() => {
    return parseInt(localStorage.getItem('love_clicks') || '0');
  });
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);

  const breakCookie = () => {
    if (isCookieCracking) return;
    setIsCookieCracking(true);

    setTimeout(() => {
      // Pick random prediction from data
      const randomIndex = Math.floor(Math.random() * predictions.length);
      setCurrentPrediction(predictions[randomIndex]);
      setIsCookieBroken(true);
      setIsCookieCracking(false);
    }, 850);
  };

  const resetCookie = () => {
    setIsCookieBroken(false);
    setCurrentPrediction(null);
  };

  const colors = [
    'text-pink-400',
    'text-pink-500',
    'text-purple-400',
    'text-purple-500',
    'text-lavender-500',
    'text-indigo-400',
    'text-red-400',
    'text-rose-500'
  ];

  const handleHeartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left + (Math.random() * 40 - 20);
    const y = e.clientY - rect.top - 20;

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomScale = 0.5 + Math.random() * 0.8;

    const newHeart: FloatingHeart = {
      id: Date.now() + Math.random(),
      x,
      y,
      scale: randomScale,
      color: randomColor,
    };

    setFloatingHearts((prev) => [...prev, newHeart]);
    const nextCount = clickCount + 1;
    setClickCount(nextCount);
    localStorage.setItem('love_clicks', nextCount.toString());

    // Clean up heart after its animation completes (approx 2s)
    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1800);
  };

  // Fun helper to get levels based on clicks
  const getLoveLevel = (clicks: number) => {
    if (clicks < 10) return { title: 'Симпатия', desc: 'Ты делаешь первые прикосновения к моему сердцу 💖' };
    if (clicks < 30) return { title: 'Романтика', desc: 'Уровень нежности растет! Бабочки уже в животе 🦋' };
    if (clicks < 70) return { title: 'Притяжение', desc: 'Гравитация любви затягивает нас в красивый танец ✨' };
    if (clicks < 150) return { title: 'Страстная Любовь', desc: 'Огненная влюбленость! Вместе мы можем покорить мир 🔥' };
    if (clicks < 300) return { title: 'Космический Клик', desc: 'Наша связь ярче, чем взрыв сверхновой звезды! 🌌' };
    return { title: 'Абсолютная Бесконечность', desc: 'Любовь, прошедшая сквозь пространство и время. Наша вечность ❤️' };
  };

  const levelInfo = getLoveLevel(clickCount);

  return (
    <section id="games" className="py-24 px-4 bg-[radial-gradient(circle_at_bottom,_rgba(224,231,255,0.2)_0%,_rgba(255,255,255,1)_50%,_rgba(243,232,255,0.4)_100%)] relative overflow-hidden">
      {/* Decorative vectors */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-indigo-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-pink-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* Module title header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1 bg-indigo-100 hover:bg-indigo-200/60 text-indigo-700 text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider mb-3"
          >
            <Gift size={12} className="text-pink-500 animate-bounce" />
            <span>Интерактивная Зона</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl font-serif font-semibold text-purple-950 mb-4"
          >
            Милые Залипательные Игры
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-purple-900/70 max-w-xl mx-auto text-sm md:text-base leading-relaxed"
          >
            Немного волшебства прямо здесь. Открой хрустящее печенье судьбы с комплиментом или понажимай на наше общее сердечко, увеличивая космический уровень любви!
          </motion.p>
        </div>

        {/* Both Games Side-by-Side Flex Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* GAME 1: FORTUNE COOKIE COMPLIMENTS */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass rounded-3xl p-6 sm:p-8 flex flex-col justify-between min-h-[460px] relative overflow-hidden border border-white shadow-md hover:border-purple-200 transition-all text-center"
          >
            <div>
              <div className="flex items-center justify-between border-b border-purple-100 pb-4 mb-6">
                <span className="text-xs font-semibold text-indigo-700 uppercase tracking-widest">
                  🥠 Печенье Предсказаний
                </span>
                <Sparkles size={16} className="text-pink-500 animate-pulse" />
              </div>

              <p className="text-purple-900/70 text-xs sm:text-sm leading-relaxed mb-8">
                Разломи это счастливое песочное печенье, чтобы прочитать тайное послание, милый комплимент, приятное предсказание или обещание, которое обязательно сбудется!
              </p>
            </div>

            {/* Cookie Container Visual */}
            <div className="flex-1 flex flex-col items-center justify-center py-6">
              <AnimatePresence mode="wait">
                {!isCookieBroken ? (
                  <motion.button
                    key="cookie"
                    onClick={breakCookie}
                    disabled={isCookieCracking}
                    className="relative group focus:outline-hidden cursor-pointer"
                    initial={{ scale: 0.9, rotate: 0 }}
                    animate={
                      isCookieCracking
                        ? {
                            rotate: [0, -10, 10, -10, 10, 0],
                            scale: [1, 1.1, 1],
                            transition: { duration: 0.8 },
                          }
                        : { scale: 1, rotate: [0, 2, -2, 0], transition: { repeat: Infinity, duration: 4 } }
                    }
                    exit={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Golden crisp cookie body representation using tailwind circles and gradients */}
                    <div className="w-40 h-28 bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-300 rounded-b-full rounded-tl-full flex items-center justify-center shadow-lg border border-amber-400 relative overflow-hidden transform rotate-45 group-hover:shadow-amber-200/50 group-hover:shadow-xl transition-shadow">
                      {/* Cracking helper text label */}
                      <div className="absolute inset-0 bg-white/10 group-hover:bg-transparent transition-colors" />
                    </div>
                    {/* Shadow elements */}
                    <div className="w-32 h-5 bg-purple-950/10 blur-md rounded-full mx-auto mt-4" />
                    <span className="absolute inset-x-0 bottom-4 text-purple-950 text-[10px] font-bold tracking-wider uppercase group-hover:text-pink-600 transition-colors pointer-events-none">
                      {isCookieCracking ? 'Разламываю...' : 'Кликни, чтобы разломить'}
                    </span>
                  </motion.button>
                ) : (
                  <motion.div
                    key="prediction"
                    initial={{ opacity: 0, scale: 0.8, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -15 }}
                    className="w-full max-w-sm"
                  >
                    {/* Beautiful scroll certificate visual */}
                    <div className="relative p-6 bg-amber-50/70 border-2 border-dashed border-amber-300 rounded-2xl shadow-inner text-center">
                      {/* Top floating icons */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-0.5 bg-amber-400 text-purple-950 text-[10px] font-bold rounded-full shadow-sm">
                        {currentPrediction?.type === 'promise' ? '🔐 Обещание' : currentPrediction?.type === 'activity' ? '🗓️ План' : '💖 Комплимент'}
                      </div>

                      <p className="font-serif italic text-purple-950/90 text-sm sm:text-base leading-relaxed my-3 px-3">
                        « {currentPrediction?.text} »
                      </p>

                      <div className="text-[10px] text-purple-900/50 mt-4 flex items-center justify-center gap-1">
                        <Heart size={10} className="text-pink-500 animate-pulse" fill="currentColor animate-pulse" />
                        <span>Твой личный купон счастья</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Repeat buttons */}
            {isCookieBroken && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={resetCookie}
                className="mt-6 py-2.5 px-6 rounded-full border border-indigo-200 hover:border-pink-300 text-indigo-950 text-xs font-semibold hover:bg-pink-50/50 transition-all cursor-pointer self-center"
              >
                Разломить Новое Печенье ✨
              </motion.button>
            )}
          </motion.div>

          {/* GAME 2: CORE HEART CLICKER */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass rounded-3xl p-6 sm:p-8 flex flex-col justify-between min-h-[460px] relative overflow-hidden border border-white shadow-md hover:border-purple-200 transition-all"
          >
            <div>
              <div className="flex items-center justify-between border-b border-purple-100 pb-4 mb-6">
                <span className="text-xs font-semibold text-rose-600 uppercase tracking-widest">
                  ❤️ Сердечный Кликер
                </span>
                <div className="flex items-center gap-1 bg-rose-50 text-rose-600 text-[10px] px-2.5 py-1 rounded-full font-bold">
                  <Award size={12} />
                  <span>Уровень {clickCount >= 300 ? 'Бесконечный' : Math.floor(clickCount / 10) + 1}</span>
                </div>
              </div>

              {/* Loveline progress status */}
              <div className="text-center mb-6">
                <span className="block font-serif text-lg font-bold text-purple-950 mb-0.5">
                  Твое звание: {levelInfo.title}
                </span>
                <span className="text-[11px] text-purple-900/70 block px-4 py-1.5 rounded-lg bg-pink-100/25">
                  {levelInfo.desc}
                </span>
              </div>
            </div>

            {/* Big button clicker visual frame */}
            <div className="flex-1 flex flex-col items-center justify-center relative my-4">
              {/* Floating micro hearts output portal */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {floatingHearts.map((heart) => (
                  <motion.div
                    key={heart.id}
                    initial={{ opacity: 1, y: heart.y, x: heart.x, scale: heart.scale }}
                    animate={{
                      y: heart.y - 180,
                      x: heart.x + (Math.random() * 80 - 40),
                      opacity: 0,
                      scale: heart.scale * 1.5,
                      rotate: Math.random() * 360,
                    }}
                    transition={{ duration: 1.6, ease: 'easeOut' }}
                    className={`absolute ${heart.color} pointer-events-none`}
                  >
                    <Heart size={18} fill="currentColor" />
                  </motion.div>
                ))}
              </div>

              {/* The big red beat heart button */}
              <motion.button
                onClick={handleHeartClick}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.9 }}
                className="relative cursor-pointer p-8 rounded-full border border-pink-100 bg-[linear-gradient(135deg,_#fff1f2_0%,_#ffe4e6_100%)] shadow-inner focus:outline-hidden group"
              >
                {/* Visual ripple layers in back */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-rose-200/50 pointer-events-none"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.6, 0, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                
                <Heart
                  size={52}
                  className="text-pink-500 fill-pink-500 transition-colors group-hover:text-rose-500 group-hover:fill-rose-500 relative z-10"
                />
              </motion.button>
            </div>

            {/* Score label footer info */}
            <div className="text-center pt-4">
              <div className="text-3xl font-extrabold text-purple-950 tracking-tight flex items-center justify-center gap-2">
                <span>{clickCount}</span>
                <Heart size={20} className="text-rose-500 inline fill-rose-500" />
              </div>
              <span className="text-[10px] text-purple-900/60 uppercase tracking-wider font-bold">
                Всего ласковых прикосновений
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
