import React, { useState } from 'react';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { Sparkles, Heart, Eye } from 'lucide-react';
import { loveReasons } from '../data';

// Helper component to render icon dynamically from string name
function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const IconComponent = (Icons as any)[name] || Icons.Heart;
  return <IconComponent className={className} size={24} />;
}

export default function Reasons() {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const toggleCard = (id: number) => {
    if (flippedCards.includes(id)) {
      setFlippedCards(flippedCards.filter((cardId) => cardId !== id));
    } else {
      setFlippedCards([...flippedCards, id]);
    }
  };

  const flipAll = () => {
    if (flippedCards.length === loveReasons.length) {
      setFlippedCards([]);
    } else {
      setFlippedCards(loveReasons.map((r) => r.id));
    }
  };

  return (
    <section id="reasons" className="py-24 px-4 relative bg-gradient-to-b from-pink-50/20 via-purple-50/30 to-indigo-50/10 overflow-hidden">
      {/* Decorative stars / bubbles */}
      <div className="absolute top-1/2 left-4 w-44 h-44 bg-pink-100/30 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-10 right-4 w-72 h-72 bg-purple-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Head description */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1 bg-pink-100 hover:bg-pink-200/60 text-pink-700 text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider mb-3"
          >
            <Sparkles size={12} className="text-pink-500 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Интерактивные свитки</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl font-serif font-semibold text-purple-950 mb-4"
          >
            10 причин, почему я тебя люблю
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-purple-900/70 max-w-xl mx-auto text-sm md:text-base leading-relaxed"
          >
            Каждый день с тобой — это благословение. Каждая карточка снизу скрывает одно из сокровенных качеств, за которые я люблю тебя всё сильнее с математической прогрессией. Нажимай на карточки, чтобы открыть секреты!
          </motion.p>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={flipAll}
            className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-purple-950 font-semibold text-xs border border-purple-100 shadow-sm hover:bg-purple-50 transition-colors cursor-pointer"
          >
            <Eye size={12} className="text-pink-500" />
            <span>{flippedCards.length === loveReasons.length ? 'Закрыть все открытки' : 'Перевернуть абсолютно все'}</span>
          </motion.button>
        </div>

        {/* 3D Cards Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {loveReasons.map((reason, index) => {
            const isFlipped = flippedCards.includes(reason.id);

            return (
              <div
                key={reason.id}
                className="w-full h-72 cursor-pointer relative perspective"
                onClick={() => toggleCard(reason.id)}
                style={{ perspective: '1200px' }}
                id={`reason-card-${reason.id}`}
              >
                <motion.div
                  className="w-full h-full relative"
                  style={{ transformStyle: 'preserve-3d' }}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                >
                  {/* FRONT SIDE (Card representation closed) */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-2xl glass hover:border-pink-300 transition-colors p-6 flex flex-col items-center justify-between shadow-xs border border-white"
                    style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                  >
                    <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center font-bold text-xs text-purple-800 border border-purple-100">
                      #{reason.id}
                    </div>

                    <div className="flex flex-col items-center">
                      {/* Floating glowing heart inside */}
                      <motion.div
                        animate={{ scale: [1, 1.12, 1] }}
                        transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.2 }}
                        className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center text-pink-500 mb-2 shadow-xs"
                      >
                        <Heart size={22} fill="#ef4444" stroke="none" className="opacity-80" />
                      </motion.div>
                      <h3 className="font-serif font-semibold text-purple-950 mt-1.5 text-sm">
                        Причина №{reason.id}
                      </h3>
                    </div>

                    <span className="text-[10px] text-purple-900/50 font-semibold uppercase tracking-wider hover:text-purple-900">
                      Нажми, чтобы открыть
                    </span>
                  </div>

                  {/* BACK SIDE (Card details revealed) */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-2xl p-5 flex flex-col justify-between text-left shadow-lg border border-pink-200/80"
                    style={{
                      transform: 'rotateY(180deg)',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      background: 'linear-gradient(135deg, #fff7fa 0%, #faf5ff 100%)',
                    }}
                  >
                    {/* Header bar on back */}
                    <div className="flex items-center justify-between border-b border-pink-100 pb-2 mb-2">
                      <span className="font-mono text-[10px] font-bold text-pink-500 uppercase tracking-widest">
                        Причина №{reason.id}
                      </span>
                      <div className="p-1.5 rounded-lg bg-pink-100/50 text-pink-600">
                        <DynamicIcon name={reason.iconName} className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Core description text */}
                    <div className="flex-1 overflow-y-auto pr-1">
                      <h4 className="font-serif font-bold text-purple-950 text-sm mb-1">
                        {reason.title}
                      </h4>
                      <p className="text-purple-900/75 text-xs font-normal leading-relaxed">
                        {reason.description}
                      </p>
                    </div>

                    {/* Small sweet heart details */}
                    <div className="flex items-center justify-end text-[9px] text-pink-400 font-semibold tracking-wider">
                      <span>С любовью</span>
                      <Heart size={8} fill="currentColor" className="ml-1" />
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
