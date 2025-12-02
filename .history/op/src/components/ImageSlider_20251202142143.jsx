// src/components/ImageSlider.jsx
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Mobile and Desktop images separately
const sliderImages = [
  {
    id: 1,
    desktopSrc: "/images/ma10.avif",
    mobileSrc: "/images/mn1.jpg", // Mobile optimized image
    alt: "Education for Children",
    title: "Education for Every Child",
    description: "Providing quality education to underprivileged children and youth"
  },
  {
    id: 2,
    desktopSrc: "/images/ma8.jpg",
    mobileSrc: "/images/mn2.jpg",
    alt: "Clothes Distribution",
    title: "Clothes for Comfort",
    description: "Ensuring every child has proper clothing for all seasons"
  },
  {
    id: 3,
    desktopSrc: "/images/ma2.jpg",
    mobileSrc: "/images/mn3.jpg",
    alt: "Food Support",
    title: "Nutritious Food",
    description: "Providing healthy meals for proper growth and development"
  },
  {
    id: 4,
    desktopSrc: "/images/ma4.jpg",
    mobileSrc: "/images/mn4.avif",
    alt: "Shelter Support",
    title: "Safe Homes",
    description: "Creating safe living environments for children and youth"
  },
  {
    id: 5,
    desktopSrc: "/images/ma9.jpg",
    mobileSrc: "/images/mn5.jpg",
    alt: "Youth Development",
    title: "Youth Empowerment",
    description: "Building skills and confidence in young people"
  }
];

const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto slide
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentSlide, isAutoPlaying]);

  return (
    <div 
      className="relative w-full h-[100vh] overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Slides */}
      {sliderImages.map((image, index) => (
        <div
          key={image.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <div className="relative w-full h-full">
            {/* Background Image with overlay - Different images for mobile/desktop */}
            <div 
              className="absolute inset-0 bg-cover "
              style={{ 
                backgroundImage: `url(${
                  isMobile && image.mobileSrc 
                    ? image.mobileSrc 
                    : image.desktopSrc
                })` 
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent md:bg-gradient-to-r md:from-black/70 md:to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-20 h-full flex items-center px-4 sm:px-6 lg:px-20">
              <div className="max-w-2xl text-white mt-10 md:mt-0">
                <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 exo">
                  {image.title}
                </h2>
                <p className="text-lg sm:text-xl lg:text-2xl mb-8 new opacity-90">
                  {image.description}
                </p>
                <button className="bg-[#50C779] hover:bg-[#3EAE66] text-white px-6 py-3 sm:px-8 sm:py-3 rounded-2xl font-semibold text-base sm:text-lg transition duration-300 shadow-lg hover:scale-105">
                  Support a Child
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute hidden lg:block left-2 md:left-3 top-1/2 transform -translate-y-1/2 z-30 p-2 md:p-3 rounded-full transition duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-10 h-10 md:w-10 md:h-10 text-white" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute hidden lg:block right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-30 p-2 md:p-3 rounded-full transition duration-300"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 md:w-10 md:h-10 text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2 md:space-x-3">
        {sliderImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-[#50C779] w-6 md:w-8 h-3 md:h-3 rounded-full' 
                : 'bg-white/50 hover:bg-white w-3 h-3 rounded-full'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;