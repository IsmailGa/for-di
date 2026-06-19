import React, { useRef, useState, useEffect } from "react";
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import Reasons from "./components/Reasons";
import InteractiveZone from "./components/InteractiveZone";
import Footer from "./components/Footer";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart,
  Music,
  Volume2,
  VolumeX,
  Sparkles,
  Navigation,
  Menu,
  X,
} from "lucide-react";

export default function App() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const reasonsRef = useRef<HTMLDivElement>(null);
  const gamesRef = useRef<HTMLDivElement>(null);

  const [scrolled, setScrolled] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const [intervalId, setIntervalId] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Dynamic scroll listener for header appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Web Audio ambient chime generator (safe, clean, self-contained, no external mp3s needed)
  const startChimeSynth = () => {
    // Check auto-play policy
    const ctx = new (
      window.AudioContext || (window as any).webkitAudioContext
    )();
    setAudioCtx(ctx);

    // Cute gentle lullaby chord progressions: A Major, F# minor, D Major, E Major
    const progressions = [
      [220, 330, 440, 554, 659], // A, E, A, C#, E
      [185, 277, 370, 440, 554], // F#m
      [146, 220, 293, 370, 440], // D
      [164, 246, 329, 392, 493], // E
    ];

    let currentChordIndex = 0;

    const playRandomChime = () => {
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const chord = progressions[currentChordIndex];
      // Pick random 2 notes from the chord to chime
      const note1 = chord[Math.floor(Math.random() * chord.length)];
      const note2 = chord[Math.floor(Math.random() * chord.length)];

      const now = ctx.currentTime;

      // Synth Chime Node 1
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "triangle";
      osc1.frequency.setValueAtTime(note1 * (Math.random() > 0.8 ? 2 : 1), now); // occasionally 1 octave up for magic sparkles
      gain1.gain.setValueAtTime(0, now);
      gain1.gain.linearRampToValueAtTime(0.04, now + 0.1);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 2.6);

      // Synth Chime Node 2 after a slight humanized delay
      setTimeout(() => {
        if (!ctx) return;
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(note2, ctx.currentTime);
        gain2.gain.setValueAtTime(0, ctx.currentTime);
        gain2.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 0.15);
        gain2.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(ctx.currentTime);
        osc2.stop(ctx.currentTime + 3.1);
      }, 350);

      // Progress chord progression slowly
      if (Math.random() > 0.6) {
        currentChordIndex = (currentChordIndex + 1) % progressions.length;
      }
    };

    // Play right away
    playRandomChime();

    // Loop
    const interval = setInterval(playRandomChime, 2400);
    setIntervalId(interval);
  };

  const toggleMusic = () => {
    if (isPlayingMusic) {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
      if (audioCtx) {
        audioCtx.close();
        setAudioCtx(null);
      }
      setIsPlayingMusic(false);
    } else {
      setIsPlayingMusic(true);
      try {
        startChimeSynth();
      } catch (e) {
        console.error("Audio synthesizer failure:", e);
      }
    }
  };

  // Safe manual scrolling function
  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen relative font-sans flex flex-col bg-[radial-gradient(circle,_#fffbfd_0%,_#fbf7fc_50%,_#f9f3f9_100%)]">
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-4 inset-x-4 sm:inset-x-6 z-40 mx-auto max-w-4xl rounded-2xl transition-all duration-300 overflow-hidden ${
          scrolled
            ? "bg-white/75 backdrop-blur-lg border border-purple-100/70 shadow-md py-2.5 px-4 sm:px-6"
            : "bg-white/35 backdrop-blur-md border border-white/30 shadow-xs py-3 px-4"
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <div
            className="flex items-center gap-1.5 cursor-pointer min-w-0 shrink-0"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setIsMobileMenuOpen(false);
            }}
          >
            <Heart
              size={16}
              fill="#ef4444"
              className="text-pink-500 animate-pulse shrink-0"
            />
            <span className="font-serif font-bold text-sm tracking-wide text-purple-950 truncate">
              Only You ✨
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-purple-900/70 min-w-0">
            <button
              onClick={() => scrollTo(galleryRef)}
              className="hover:text-purple-950 transition-colors cursor-pointer whitespace-nowrap"
            >
              Воспоминания
            </button>
            <button
              onClick={() => scrollTo(reasonsRef)}
              className="hover:text-purple-950 transition-colors cursor-pointer whitespace-nowrap"
            >
              Причины
            </button>
            <button
              onClick={() => scrollTo(gamesRef)}
              className="hover:text-purple-950 transition-colors cursor-pointer whitespace-nowrap"
            >
              Интерактив
            </button>
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={toggleMusic}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer shrink-0 ${
                isPlayingMusic
                  ? "bg-pink-100/50 border-pink-200 text-pink-700 animate-pulse"
                  : "bg-white/60 border-purple-100 text-purple-900/70 hover:bg-white"
              }`}
              title="Переключить нежную фоновую музыку"
            >
              {isPlayingMusic ? <Volume2 size={12} /> : <VolumeX size={12} />}
              <span className="hidden sm:inline whitespace-nowrap">
                Музыка: {isPlayingMusic ? "Вкл" : "Выкл"}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-full border border-purple-100 bg-white/60 text-purple-900/70 hover:bg-white cursor-pointer shrink-0 transition-all"
              title="Переключить меню навигации"
            >
              {isMobileMenuOpen ? <X size={14} /> : <Menu size={14} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile navigation menu overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed top-20 inset-x-4 z-30 mx-auto max-w-4xl bg-white/90 backdrop-blur-lg border border-purple-100/80 shadow-lg rounded-2xl p-6 flex flex-col gap-4 text-center"
          >
            <button
              onClick={() => {
                scrollTo(galleryRef);
                setIsMobileMenuOpen(false);
              }}
              className="py-3 px-4 rounded-xl hover:bg-purple-50 text-sm font-semibold text-purple-950 transition-colors cursor-pointer"
            >
              Воспоминания
            </button>
            <button
              onClick={() => {
                scrollTo(reasonsRef);
                setIsMobileMenuOpen(false);
              }}
              className="py-3 px-4 rounded-xl hover:bg-purple-50 text-sm font-semibold text-purple-950 transition-colors cursor-pointer"
            >
              Причины
            </button>
            <button
              onClick={() => {
                scrollTo(gamesRef);
                setIsMobileMenuOpen(false);
              }}
              className="py-3 px-4 rounded-xl hover:bg-purple-50 text-sm font-semibold text-purple-950 transition-colors cursor-pointer"
            >
              Интерактив
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RENDER PAGES AND MODULES */}
      <main className="flex-1">
        {/* HERO */}
        <Hero onScrollToGallery={() => scrollTo(galleryRef)} />

        {/* MEMORY PHOTO PACT COCHLEAR */}
        {/* Добавлен класс scroll-mt-24 */}
        <div ref={galleryRef} className="scroll-mt-24">
          <Gallery />
        </div>

        {/* 10 REASONS ACCORDION COLUMN GRID */}
        {/* Добавлен класс scroll-mt-24 */}
        <div ref={reasonsRef} className="scroll-mt-24">
          <Reasons />
        </div>

        {/* MINI GAMES ZONE AREA */}
        {/* Добавлен класс scroll-mt-24 */}
        <div ref={gamesRef} className="scroll-mt-24">
          <InteractiveZone />
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
