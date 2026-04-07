"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { Play, Pause, Send, Phone, MessageCircle, ArrowDown } from "lucide-react";

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function PartnersContent() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  const handleTimeUpdate = useCallback(() => {
    const v = videoRef.current;
    if (!v || seeking) return;
    setCurrentTime(v.currentTime);
    setProgress(v.duration ? (v.currentTime / v.duration) * 100 : 0);
  }, [seeking]);

  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current) setDuration(videoRef.current.duration);
  }, []);

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current;
    if (!v) return;
    const val = Number(e.target.value);
    const time = (val / 100) * v.duration;
    v.currentTime = time;
    setProgress(val);
    setCurrentTime(time);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.addEventListener("timeupdate", handleTimeUpdate);
    v.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () => {
      v.removeEventListener("timeupdate", handleTimeUpdate);
      v.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [handleTimeUpdate, handleLoadedMetadata]);

  return (
    <div className="min-h-screen bg-dark flex flex-col">
      <header className="w-full border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="font-[family-name:var(--font-heading)] text-xl sm:text-2xl font-bold gradient-text hover:opacity-80 transition-opacity shrink-0"
          >
            СТАТКРЕДИТ
          </Link>
          <p className="text-text-muted text-sm sm:text-base text-right hidden sm:block">
            Кредитные и финансовые продукты, на которых вы можете зарабатывать
          </p>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="absolute top-[15%] right-[8%] w-64 h-64 border border-white/[0.04] rounded-full animate-[float_14s_ease-in-out_infinite]" />
          <div className="absolute bottom-[20%] left-[5%] w-80 h-80 border border-white/[0.03] rounded-full animate-[floatSlow_11s_ease-in-out_infinite]" />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-10 z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="font-[family-name:var(--font-heading)] text-[clamp(1.6rem,4.5vw,3.2rem)] font-bold leading-tight">
                <span className="text-text">Как новичку зарабатывать </span>
                <span className="gradient-text">от 100 000 руб. до 1 млн. руб.</span>
                <span className="text-text"> в месяц на наших кредитных и финансовых продуктах?</span>
              </h1>

              <div className="mt-8 inline-flex items-center gap-2.5 px-6 py-3 glass-card !rounded-full">
                <span className="w-2 h-2 bg-primary rounded-full animate-[pulse-glow_2s_ease-in-out_infinite]" />
                <span className="text-primary text-sm sm:text-base font-semibold">
                  Ищем партнёров, без вложений и опыта
                </span>
              </div>
            </div>

            <div className="mt-14 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-start">
              <div className="relative gradient-border !rounded-3xl overflow-hidden">
                <video
                  ref={videoRef}
                  className="w-full aspect-video object-cover cursor-pointer"
                  playsInline
                  preload="metadata"
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                  onEnded={() => setPlaying(false)}
                  onClick={togglePlay}
                >
                  <source src="/video.mp4" type="video/mp4" />
                </video>

                {/* Controls bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 pt-8 pb-3">
                  {/* Seek bar */}
                  <div className="relative flex items-center mb-2.5 group">
                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={0.1}
                      value={progress}
                      onChange={handleSeek}
                      onMouseDown={() => setSeeking(true)}
                      onMouseUp={() => setSeeking(false)}
                      onTouchStart={() => setSeeking(true)}
                      onTouchEnd={() => setSeeking(false)}
                      className="partners-seekbar w-full h-1 appearance-none bg-white/20 rounded-full cursor-pointer accent-primary"
                      style={{
                        background: `linear-gradient(to right, #E35336 ${progress}%, rgba(255,255,255,0.2) ${progress}%)`,
                      }}
                    />
                  </div>

                  {/* Bottom row: play btn + time */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlay}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl backdrop-blur-md transition-all cursor-pointer shrink-0 ${
                        playing
                          ? "bg-black/50 text-white/70 hover:text-white"
                          : "bg-primary/90 text-white hover:bg-primary"
                      }`}
                    >
                      {playing ? <Pause size={16} /> : <Play size={16} />}
                      <span className="text-xs font-medium">
                        {playing ? "Пауза" : "Смотреть"}
                      </span>
                    </button>
                    <span className="text-white/60 text-xs tabular-nums">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>
                </div>

                {/* Large play overlay (only when paused and not started) */}
                {!playing && currentTime === 0 && (
                  <button
                    onClick={togglePlay}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer transition-opacity hover:bg-black/20"
                    style={{ bottom: "80px" }}
                  >
                    <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center shadow-[0_0_60px_rgba(227,83,54,0.4)]">
                      <Play size={36} className="text-white ml-1" />
                    </div>
                  </button>
                )}
              </div>

              <div className="hidden lg:flex flex-col items-center gap-3 pt-8">
                <div className="glass-card !rounded-2xl px-5 py-4 max-w-[180px] text-center">
                  <p className="text-text text-sm font-medium leading-snug">
                    Запустите видео, чтобы узнать о партнёрстве
                  </p>
                </div>
                <ArrowDown size={24} className="text-primary animate-bounce -rotate-90" />
              </div>
            </div>
          </div>
        </section>

        <section className="relative pb-20 sm:pb-28">
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="font-[family-name:var(--font-heading)] text-[clamp(1.4rem,3.5vw,2.4rem)] font-bold text-text leading-tight">
                Хотите стать партнёром и начать зарабатывать с нами?
              </h2>
              <p className="mt-4 text-text-muted text-base sm:text-lg leading-relaxed">
                Свяжитесь со мной. Мы познакомимся, я отправлю подробности и помогу сделать первые шаги:
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://t.me/olegstatcom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-[#2AABEE]/15 border border-[#2AABEE]/30 text-[#2AABEE] font-semibold hover:bg-[#2AABEE]/25 hover:border-[#2AABEE]/50 transition-all duration-200"
                >
                  <Send size={20} />
                  Связаться в Телеграм
                </a>
                <a
                  href="https://wa.me/79682777422"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] font-semibold hover:bg-[#25D366]/25 hover:border-[#25D366]/50 transition-all duration-200"
                >
                  <Phone size={20} />
                  Связаться в Вотсап
                </a>
                <a
                  href="https://max.ru/u/f9LHodD0cOJ11pks5l0x3i98PQoxjhHPspPT0dybrKzYGrI5lgHMD6waPqM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-primary/15 border border-primary/30 text-primary font-semibold hover:bg-primary/25 hover:border-primary/50 transition-all duration-200"
                >
                  <MessageCircle size={20} />
                  Связаться в Max
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/[0.06] py-8">
        <div className="text-center">
          <Link
            href="/"
            className="font-[family-name:var(--font-heading)] text-lg font-bold gradient-text hover:opacity-80 transition-opacity"
          >
            СТАТКРЕДИТ
          </Link>
          <p className="mt-2 text-text-muted/50 text-sm">
            &copy; {new Date().getFullYear()} Стат-Кредит
          </p>
        </div>
      </footer>
    </div>
  );
}
