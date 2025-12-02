import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Slider images data
const sliderImages = [
  {
    id: 1,
    src: "/images/ma1.jpg",
    alt: "Community Service",
    title: "Empowering Communities",
    description: "Together we can make a difference in every life"
  },
  {
    id: 2,
    src: "/images/ma1.jpg",
    alt: "Education for All",
    title: "Education for Every Child",
    description: "Providing quality education to underprivileged children"
  },
  {
    id: 3,
    src: "/images/ma1.jpg",
    alt: "Healthcare Access",
    title: "Healthcare Initiatives",
    description: "Ensuring healthcare access for all communities"
  },
  {
    id: 4,
    src: "/images/ma1.jpg",
    alt: "Women Empowerment",
    title: "Women Empowerment",
    description: "Building a stronger society through women empowerment"
  },
  {
    id: 5,
    src: "/images/ma1.jpg",
    alt: "Environmental Care",
    title: "Environmental Sustainability",
    description: "Working towards a greener and cleaner environment"
  }
];

// Slider Component
const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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
      className="relative w-full h-[70vh] overflow-hidden"
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
            {/* Background Image with overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${image.src})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-20 h-full flex items-center px-8 lg:px-20">
              <div className="max-w-2xl text-white">
                <h2 className="text-4xl lg:text-6xl font-bold mb-4 exo">
                  {image.title}
                </h2>
                <p className="text-xl lg:text-2xl mb-8 new opacity-90">
                  {image.description}
                </p>
                <button className="bg-[#50C779] hover:bg-[#3EAE66] text-white px-8 py-3 rounded-2xl font-semibold text-lg transition duration-300 shadow-lg hover:scale-105">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition duration-300"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
        {sliderImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-[#50C779] w-8' 
                : 'bg-white/50 hover:bg-white'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-30">
        <div 
          className={`h-full bg-[#50C779] transition-all duration-1000 ease-linear ${
            isAutoPlaying ? 'animate-progress' : ''
          }`}
          style={{ width: isAutoPlaying ? '100%' : '0%' }}
        />
      </div>
    </div>
  );
};

// Navbar Component with White Background
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const navItems = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Child", href: "#child" },
    { name: "Contact", href: "#contact" },
  ];

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`w-full sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white shadow-lg border-b border-gray-100' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className={`h-10 w-10 lg:h-12 lg:w-12 rounded-full flex items-center justify-center transition-all duration-300 ${
              isScrolled ? 'bg-[#50C779]' : 'bg-white/20 backdrop-blur-sm'
            }`}>
              <span className={`font-bold text-xl transition-all duration-300 ${
                isScrolled ? 'text-white' : 'text-white'
              }`}>
                S
              </span>
            </div>
            <span className={`ml-3 font-bold text-xl lg:text-2xl new transition-all duration-300 ${
              isScrolled ? 'text-gray-800' : 'text-white'
            }`}>
              Soorveer Yuva Sangathan Trust
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`font-medium new text-lg transition duration-300 relative group ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-[#50C779]' 
                    : 'text-gray-200 hover:text-white'
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 ${
                  isScrolled ? 'bg-[#50C779]' : 'bg-white'
                } group-hover:w-full`}></span>
              </a>
            ))}
            <button className="bg-[#50C779] hover:bg-[#3EAE66] text-white px-6 py-2 rounded-2xl font-semibold new text-lg hover:scale-105 transition duration-300 shadow-lg">
              Contact Us
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 bg-white rounded-xl p-4 shadow-xl animate-fadeIn">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block py-3 px-4 text-gray-700 hover:text-[#50C779] hover:bg-gray-50 rounded-lg transition duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <button 
              className="w-full mt-3 bg-[#50C779] text-white px-6 py-3 rounded-xl font-semibold new text-lg hover:bg-[#3EAE66] transition duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact Us
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

// Main Home Component with White Background
export default function Home() {
  return (
    <div className="bg-white">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-progress {
          animation: progress 5s linear;
        }
      `}</style>
      
      <Navbar />
      
      {/* Slider Section (70% height) */}
      <section className="h-[70vh]">
        <ImageSlider />
      </section>

      {/* Content Below Slider - White Background */}
      <section className="py-16 px-8 lg:px-20 bg-white">
        <div className="container mx-auto">
          {/* Mission, Vision, Impact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Mission Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl hover:border-[#50C779]/30 transition-all duration-300">
              <div className="h-14 w-14 bg-[#50C779] rounded-full flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 exo">Our Mission</h3>
              <p className="text-gray-600 new leading-relaxed">
                To empower underprivileged communities through education, healthcare, and sustainable development initiatives.
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl hover:border-[#50C779]/30 transition-all duration-300">
              <div className="h-14 w-14 bg-[#50C779] rounded-full flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 exo">Our Vision</h3>
              <p className="text-gray-600 new leading-relaxed">
                A world where every individual has access to education, healthcare, and opportunities for growth.
              </p>
            </div>

            {/* Impact Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl hover:border-[#50C779]/30 transition-all duration-300">
              <div className="h-14 w-14 bg-[#50C779] rounded-full flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 exo">Our Impact</h3>
              <p className="text-gray-600 new leading-relaxed">
                Over 10,000 lives transformed through our various community development programs and initiatives.
              </p>
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-center text-gray-800 mb-4 exo">
              What We Do
            </h2>
            <p className="text-xl text-gray-600 text-center mb-12 new max-w-3xl mx-auto">
              We work across multiple sectors to create sustainable change in communities.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Education", icon: "📚", desc: "Quality education for children" },
                { title: "Healthcare", icon: "🏥", desc: "Medical camps & facilities" },
                { title: "Women Empowerment", icon: "👩", desc: "Skill development programs" },
                { title: "Environment", icon: "🌱", desc: "Sustainability initiatives" }
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:border-[#50C779] hover:shadow-lg transition-all duration-300">
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2 exo">{item.title}</h4>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action Section */}
          <div className="bg-gradient-to-r from-[#50C779] to-[#3EAE66] rounded-3xl p-12 text-center shadow-xl">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 exo">
              Join Us in Making a Difference
            </h2>
            <p className="text-xl text-white/90 mb-10 new max-w-3xl mx-auto">
              Your support can help us reach more communities and create lasting change. Every contribution matters.
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <button className="bg-white hover:bg-gray-100 text-[#50C779] px-10 py-4 rounded-2xl font-semibold text-xl transition duration-300 shadow-lg hover:scale-105">
                Donate Now
              </button>
              <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-10 py-4 rounded-2xl font-semibold text-xl transition duration-300">
                Become a Volunteer
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "10,000+", label: "Lives Impacted" },
              { number: "500+", label: "Volunteers" },
              { number: "50+", label: "Communities" },
              { number: "5", label: "Active Programs" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-[#50C779] mb-2 exo">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}