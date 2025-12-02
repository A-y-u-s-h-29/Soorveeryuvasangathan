import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from "lucide-react";

const VideoPage = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);

  // Auto-play video on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Autoplay prevented:", error);
        setIsPlaying(false);
      });
    }
  }, []);

  // Handle mouse movement for controls
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      const timer = setTimeout(() => {
        setShowControls(false);
      }, 3000);
      return () => clearTimeout(timer);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current.webkitRequestFullscreen) {
        containerRef.current.webkitRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setVideoProgress(progress);
    }
  };

  const handleProgressClick = (e) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = pos * videoRef.current.duration;
      setVideoProgress(pos * 100);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted={isMuted}
        loop
        playsInline
        onTimeUpdate={handleTimeUpdate}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
        <source src="/videos/hero-video.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

      {/* Main Content - Centered */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-8 text-center">
        <div className="max-w-4xl">
          {/* Tagline */}
          <span className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full text-sm font-semibold mb-6">
            Empowering Young Lives
          </span>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 exo leading-tight">
            Building <span className="text-[#50C779]">Futures</span><br />
            Transforming <span className="text-[#50C779]">Lives</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl mb-10 new opacity-90 max-w-3xl mx-auto">
            Watch how we're making a difference in the lives of children and youth every day
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
              onClick={togglePlay}
              className="bg-[#50C779] hover:bg-[#3EAE66] text-white px-8 py-4 rounded-2xl font-semibold text-lg transition duration-300 shadow-lg hover:scale-105 flex items-center gap-3"
            >
              {isPlaying ? (
                <>
                  <Pause className="h-5 w-5" />
                  Pause Video
                </>
              ) : (
                <>
                  <Play className="h-5 w-5" />
                  Play Video
                </>
              )}
            </button>
            
            <button className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition duration-300 flex items-center gap-3">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              3:45 min
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Video Controls (Fades in on hover) */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Progress Bar */}
        <div 
          className="h-1 bg-gray-600 cursor-pointer"
          onClick={handleProgressClick}
        >
          <div 
            className="h-full bg-[#50C779] transition-all duration-300"
            style={{ width: `${videoProgress}%` }}
          />
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            {/* Play/Pause */}
            <button 
              onClick={togglePlay}
              className="hover:bg-white/20 p-2 rounded-full transition"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5 text-white" />
              ) : (
                <Play className="h-5 w-5 text-white" />
              )}
            </button>

            {/* Volume */}
            <button 
              onClick={toggleMute}
              className="hover:bg-white/20 p-2 rounded-full transition"
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5 text-white" />
              ) : (
                <Volume2 className="h-5 w-5 text-white" />
              )}
            </button>

            {/* Time Display */}
            <div className="text-white text-sm font-mono">
              0:00 / 3:45
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Fullscreen */}
            <button 
              onClick={toggleFullscreen}
              className="hover:bg-white/20 p-2 rounded-full transition"
            >
              {isFullscreen ? (
                <Minimize className="h-5 w-5 text-white" />
              ) : (
                <Maximize className="h-5 w-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Touch Controls (Always visible on mobile) */}
      <div className="lg:hidden absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={togglePlay}
            className="bg-white/20 backdrop-blur-sm p-3 rounded-full"
          >
            {isPlaying ? (
              <Pause className="h-6 w-6 text-white" />
            ) : (
              <Play className="h-6 w-6 text-white" />
            )}
          </button>
          
          <div className="text-white text-center">
            <div className="text-sm">Soorveer Yuva Sangathan</div>
            <div className="text-xs opacity-80">Video playing</div>
          </div>
          
          <button 
            onClick={toggleFullscreen}
            className="bg-white/20 backdrop-blur-sm p-3 rounded-full"
          >
            <Maximize className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>

      {/* Skip Intro Button (Appears after 5 seconds) */}
      <div className="absolute top-10 right-10">
        <button className="bg-black/50 backdrop-blur-sm text-white px-6 py-3 rounded-full hover:bg-black/70 transition duration-300">
          Skip Intro
        </button>
      </div>
    </div>
  );
};

export default VideoPage;