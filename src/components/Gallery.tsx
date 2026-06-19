import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Исправлен импорт motion/react на стандартный framer-motion, если у тебя старая версия, верни обратно
import {
  Camera,
  Calendar,
  MapPin,
  Plus,
  Trash2,
  X,
  ZoomIn,
} from "lucide-react";
import { memoryPhotos as initialPhotos } from "../data";
import { MemoryPhoto } from "../types";

export default function Gallery() {
  const [photos, setPhotos] = useState<MemoryPhoto[]>(() => {
    const saved = localStorage.getItem("love_portfolio_photos");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialPhotos;
      }
    }
    return initialPhotos;
  });

  const [selectedPhoto, setSelectedPhoto] = useState<MemoryPhoto | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [newCaption, setNewCaption] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newImgUrl, setNewImgUrl] = useState("");
  const [fileError, setFileError] = useState("");

  useEffect(() => {
    localStorage.setItem("love_portfolio_photos", JSON.stringify(photos));
  }, [photos]);

  return (
    <section
      id="gallery"
      className="py-24 px-4 relative bg-[radial-gradient(circle_at_top,_rgba(243,232,255,0.4)_0%,_rgba(255,255,255,1)_60%,_rgba(253,242,248,0.3)_100%)]"
    >
      {/* Decorative blurred background shapes */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-pink-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 bg-purple-100/80 text-purple-700 text-xs px-3 py-1.5 rounded-full font-semibold uppercase tracking-wider mb-4 select-none"
          >
            <Camera size={13} className="text-pink-500" />
            <span>Фотогалерея</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl font-serif font-semibold text-purple-950 mb-4"
          >
            Музей наших теплых моментов
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-purple-900/70 max-w-xl mx-auto text-sm md:text-base leading-relaxed"
          >
            Взгляни на наши чудесные дни, согретые улыбками и нежностью. Ты
            можешь нажать на любую карточку, чтобы рассмотреть памятный момент
            поближе!
          </motion.p>
        </div>

        <div className="relative w-full rounded-3xl">
          {photos.length === 0 ? (
            <div className="py-24 text-center text-purple-400 flex flex-col items-center glass p-8 rounded-3xl border border-purple-100 bg-white/40">
              <Camera size={48} className="stroke-1 mb-3 animate-pulse" />
              <p className="font-serif text-lg text-purple-950">Полочка пуста.</p>
            </div>
          ) : (
            /* Изменено на columns для эффекта Masonry (как в Pinterest) */
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
              {photos.map((photo, i) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="break-inside-avoid relative rounded-2xl overflow-hidden bg-white hover:border-pink-300 border border-purple-100/60 transition-all duration-300 shadow-sm hover:shadow-xl cursor-pointer p-3 pb-4 flex flex-col mb-6"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  {/* Контейнер БЕЗ жесткого aspect-ratio, чтобы фотка не резалась */}
                  <div className="w-full h-auto overflow-hidden bg-purple-50 rounded-xl relative group-hover:shadow-inner">
                    <img
                      src={photo.url}
                      alt={photo.caption}
                      className="w-full h-auto object-contain transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-purple-950/10 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="p-3 bg-white/95 rounded-full text-purple-950 shadow-md">
                        <ZoomIn size={18} className="text-purple-700" />
                      </div>
                    </div>

                    {/* Quick Labels над фото */}
                    <div className="absolute top-2.5 left-2.5 flex gap-1.5 pointer-events-none">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 backdrop-blur-md text-purple-950 shadow-xs border border-purple-100/50">
                        <Calendar size={10} className="text-pink-500" />
                        {photo.date || "Момент"}
                      </span>
                    </div>
                  </div>

                  {/* Photo Info Content */}
                  <div className="pt-3.5 px-1 text-left">
                    {photo.caption && (
                      <p className="font-serif italic text-purple-950 font-normal leading-relaxed text-[15px] hover:text-pink-600 transition-colors mb-1.5">
                        {photo.caption}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-xs text-purple-900/60 font-medium mt-auto">
                      {photo.date && (
                        <span className="flex items-center gap-1 text-[11px]">
                          <Calendar size={11} className="text-pink-400" />
                          {photo.date}
                        </span>
                      )}
                      {photo.location ? (
                        <span className="flex items-center gap-1 text-[11px] max-w-[50%] ml-auto">
                          <MapPin size={11} className="text-indigo-400 shrink-0" />
                          <span className="truncate">{photo.location}</span>
                        </span>
                      ) : null}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* LIGHTBOX DIALOG DETAILS (Модалка при клике) */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="absolute inset-0 bg-purple-950/70 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl z-20 border border-purple-100 flex flex-col max-h-[90vh]"
            >
              {/* Исправлено в модалке: здесь фото теперь центрируется и НЕ обрезается вообще */}
              <div className="relative flex-1 bg-purple-950/20 flex items-center justify-center p-2 overflow-hidden min-h-[300px] md:min-h-[450px]">
                {/* Эффект размытого заднего фона для эстетики, если фото вертикальное */}
                <img
                  src={selectedPhoto.url}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-30 pointer-events-none"
                />
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption}
                  className="relative max-w-full max-h-[60vh] object-contain rounded-xl shadow-lg z-10"
                  referrerPolicy="no-referrer"
                />
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors cursor-pointer z-20"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Информация в модалке */}
              <div className="p-6 sm:p-8 text-left bg-gradient-to-b from-white to-purple-50/40 shrink-0">
                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-purple-700/80 mb-3">
                  {selectedPhoto.date && (
                    <span className="flex items-center gap-1 px-3 py-1 bg-purple-50 rounded-full">
                      <Calendar size={12} className="text-pink-500" />
                      {selectedPhoto.date}
                    </span>
                  )}
                  {selectedPhoto.location && (
                    <span className="flex items-center gap-1 px-3 py-1 bg-purple-50 rounded-full">
                      <MapPin size={12} className="text-indigo-500" />
                      {selectedPhoto.location}
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-purple-950 leading-relaxed mb-3">
                  {selectedPhoto.caption || "Прекрасный момент"}
                </h3>

                <p className="text-purple-950/60 text-xs sm:text-sm italic leading-relaxed">
                  Иногда одно простое мгновение, запечатленное на кадре, хранит в себе терабайт тепла и бесконечной нежности... ✨
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}