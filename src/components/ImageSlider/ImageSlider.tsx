import { Carousel } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

interface ImageSliderProps {
  slides: React.ReactNode[];
  slidesToShow?: number;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  slides,
  slidesToShow = 1,
}) => {
  const carouselRef = useRef<any>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [effectiveSlidesToShow, setEffectiveSlidesToShow] =
    useState(slidesToShow);

  // Update slidesToShow based on window width
  useEffect(() => {
    const updateSlides = () => {
      if (window.innerWidth < 640) setEffectiveSlidesToShow(1);
      else if (window.innerWidth < 1024)
        setEffectiveSlidesToShow(Math.min(slidesToShow, 2));
      else setEffectiveSlidesToShow(slidesToShow);

      // Reset to first slide when resizing to avoid empty space
      carouselRef.current?.goTo(0);
      setCurrentSlide(0);
    };

    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, [slidesToShow]);

  const handlePrev = () => carouselRef.current?.prev();
  const handleNext = () => carouselRef.current?.next();

  return (
    <div className="relative w-full">
      <Carousel
        ref={carouselRef}
        dots={false}
        slidesToShow={effectiveSlidesToShow}
        slidesToScroll={1}
        infinite={false}
        afterChange={(current) => setCurrentSlide(current)}
      >
        {slides.map((slide, idx) => (
          <div key={idx} className="px-2">
            {slide}
          </div>
        ))}
      </Carousel>

      {/* Left Arrow */}
      {currentSlide > 0 && (
        <button
          onClick={handlePrev}
          className="hidden lg:flex absolute top-1/2 left-4 transform -translate-y-1/2 
             bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-300 opacity-50 
             p-3 rounded-full shadow-md 
             hover:bg-white dark:hover:bg-gray-600 hover:text-black dark:hover:text-white hover:opacity-100 
             transition"
        >
          <IoMdArrowRoundBack className="text-3xl" />
        </button>
      )}

      {/* Right Arrow */}
      {currentSlide < slides.length - effectiveSlidesToShow && (
        <button
          onClick={handleNext}
          className="hidden lg:flex absolute top-1/2 right-4 transform -translate-y-1/2 
             bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-300 opacity-50 
             p-3 rounded-full shadow-md 
             hover:bg-white dark:hover:bg-gray-600 hover:text-black dark:hover:text-white hover:opacity-100 
             transition"
        >
          <IoMdArrowRoundBack className="text-3xl transform rotate-180" />
        </button>
      )}
    </div>
  );
};

export default ImageSlider;
