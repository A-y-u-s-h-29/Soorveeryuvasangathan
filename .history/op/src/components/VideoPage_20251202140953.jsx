import React, { useRef, useEffect } from "react";

const SimpleVideoHero = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/background.mp4" type="video/mp4" />
        {/* Fallback Image */}
        <img src="/images/hero-fallback.jpg" alt="Hero" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-8 lg:px-20">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 exo leading-tight">
            Hope in <span className="text-[#50C779]">Motion</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-xl">
            Witness the journey of transformation as we create brighter futures for children
          </p>
          <button className="bg-[#50C779] hover:bg-[#3EAE66] text-white px-8 py-4 rounded-2xl font-semibold text-lg transition duration-300">
            Watch Full Story
          </button>
        </div>
      </div>

      {/* Play Indicator */}
      <div className="absolute bottom-10 left-10 flex items-center gap-3 text-white/80">
        <div className="h-12 w-12 rounded-full border-2 border-white/30 flex items-center justify-center">
          <div className="h-4 w-4 bg-[#50C779] rounded-full animate-pulse"></div>
        </div>
        <div>
          <div className="text-sm">Now Playing</div>
          <div className="font-semibold">Our Impact Story</div>
        </div>
      </div>
    </div>
  );
};

export default SimpleVideoHero;