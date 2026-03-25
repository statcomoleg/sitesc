"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface ReviewGalleryProps {
  images: string[];
}

export function ReviewGallery({ images }: ReviewGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);

  useEffect(() => {
    if (activeIndex === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight" && activeIndex < images.length - 1)
        setActiveIndex(activeIndex + 1);
      if (e.key === "ArrowLeft" && activeIndex > 0)
        setActiveIndex(activeIndex - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeIndex, close, images.length]);

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setActiveIndex(i)}
            className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-2 border-white/[0.08] hover:border-primary/50 transition-all duration-200 hover:scale-105 cursor-pointer group"
          >
            <Image
              src={src}
              alt={`Скриншот отзыва ${i + 1}`}
              fill
              className="object-cover group-hover:brightness-110 transition-all duration-200"
              sizes="96px"
            />
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр отзыва"
        >
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md animate-[fadeIn_150ms_ease-out]"
            onClick={close}
          />

          <button
            onClick={close}
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-dark/80 border border-primary/40 hover:border-primary hover:bg-dark transition-all duration-200 cursor-pointer"
            aria-label="Закрыть"
          >
            <X size={20} className="text-primary" />
          </button>

          {images.length > 1 && activeIndex > 0 && (
            <button
              onClick={() => setActiveIndex(activeIndex - 1)}
              className="absolute left-3 sm:left-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-dark/80 border border-white/10 hover:border-primary/40 transition-all duration-200 cursor-pointer text-text-muted hover:text-primary"
              aria-label="Предыдущее фото"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
          )}

          {images.length > 1 && activeIndex < images.length - 1 && (
            <button
              onClick={() => setActiveIndex(activeIndex + 1)}
              className="absolute right-3 sm:right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-dark/80 border border-white/10 hover:border-primary/40 transition-all duration-200 cursor-pointer text-text-muted hover:text-primary"
              aria-label="Следующее фото"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          )}

          <div className="relative max-w-2xl max-h-[85vh] w-full animate-[scaleIn_150ms_ease-out]">
            <Image
              src={images[activeIndex]}
              alt={`Отзыв ${activeIndex + 1}`}
              width={800}
              height={1200}
              className="w-full h-auto max-h-[85vh] object-contain rounded-2xl"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
            {images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-dark/70 border border-white/10 text-text-muted text-xs">
                {activeIndex + 1} / {images.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
