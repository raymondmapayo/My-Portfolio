import React, { useEffect, useRef, useState } from "react";

type ImageSliderProps = {
  images: string[]; // array of image paths (public or imported)
  interval?: number; // ms between slides (default 3000)
  className?: string; // wrapper extra classes
  showIndicators?: boolean; // dots
  showArrows?: boolean; // optional prev/next arrows
  children?: React.ReactNode; // overlays (date, typed text, etc.)
};

const HeroSlider: React.FC<ImageSliderProps> = ({
  images,
  interval = 3000,
  className = "",
  showIndicators = true,
  showArrows = false,
  children,
}) => {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);
  const isHoveredRef = useRef(false);

  // autoplay
  useEffect(() => {
    if (!images || images.length <= 1) return;
    const start = () => {
      // clear existing
      if (timerRef.current) window.clearInterval(timerRef.current);
      timerRef.current = window.setInterval(() => {
        if (!isHoveredRef.current) {
          setIndex((i) => (i + 1) % images.length);
        }
      }, interval);
    };
    start();
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [images, interval]);

  const goTo = (i: number) =>
    setIndex(((i % images.length) + images.length) % images.length);
  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  return (
    <div
      className={`relative overflow-hidden rounded-xl ${className}`}
      onMouseEnter={() => (isHoveredRef.current = true)}
      onMouseLeave={() => (isHoveredRef.current = false)}
      aria-roledescription="carousel"
    >
      {/* Slide container */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{
          width: `${images.length * 100}%`,
          transform: `translateX(-${index * (100 / images.length)}%)`,
        }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-full h-full relative"
            style={{ width: `${100 / images.length}%` }}
          >
            <img
              src={src}
              alt={`slide-${i}`}
              className="w-full h-full object-cover block rounded-xl"
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* overlays (date / typed text) - user-provided */}
      <div className="absolute inset-0 pointer-events-none">
        {/* children may include absolute-positioned content; allow interactions inside children by wrapping them in a pointer-events-auto element */}
        <div className="w-full h-full pointer-events-none">
          <div className="w-full h-full pointer-events-auto">{children}</div>
        </div>
      </div>

      {/* Indicators */}
      {showIndicators && images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {images.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                i === index ? "scale-125" : "opacity-60"
              } bg-white/90`}
            />
          ))}
        </div>
      )}

      {/* Arrows (optional) */}
      {showArrows && images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/30 text-white pointer-events-auto"
            aria-label="Previous slide"
            type="button"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/30 text-white pointer-events-auto"
            aria-label="Next slide"
            type="button"
          >
            ›
          </button>
        </>
      )}
    </div>
  );
};

export default HeroSlider;
