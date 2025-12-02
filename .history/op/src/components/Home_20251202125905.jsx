import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Book, Shirt, Home, Utensils, Heart, Users } from "lucide-react";

// Slider images data
const sliderImages = [
  {
    id: 1,
    src: "/images/child1.jpg",
    alt: "Education for Children",
    title: "Education for Every Child",
    description: "Providing quality education to underprivileged children and youth"
  },
  {
    id: 2,
    src: "/images/child2.jpg",
    alt: "Clothes Distribution",
    title: "Clothes for Comfort",
    description: "Ensuring every child has proper clothing for all seasons"
  },
  {
    id: 3,
    src: "/images/child3.jpg",
    alt: "Food Support",
    title: "Nutritious Food",
    description: "Providing healthy meals for proper growth and development"
  },
  {
    id: 4,
    src: "/images/child4.jpg",
    alt: "Shelter Support",
    title: "Safe Homes",
    description: "Creating safe living environments for children and youth"
  },
  {
    id: 5,
    src: "/images/child5.jpg",
    alt: "Youth Development",
    title: "Youth Empowerment",
    description: "Building skills and confidence in young people"
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
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
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
    </div>
  );
};

// Navbar Component
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const navItems = [
    { name: "Home", href: "#" },
    { name: "Programs", href: "#programs" },
    { name: "Our Work", href: "#work" },
    { name: "Donate", href: "#donate" },
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
    <nav className={`w-full fixed top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className={`h-10 w-10 lg:h-12 lg:w-12 rounded-full flex items-center justify-center transition-all duration-300 ${
              isScrolled ? 'bg-[#50C779]' : 'bg-white/20 backdrop-blur-sm'
            }`}>
              <Heart className={`h-5 w-5 lg:h-6 lg:w-6 transition-all duration-300 ${
                isScrolled ? 'text-white' : 'text-white'
              }`} />
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
              Donate Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`lg:hidden transition-all duration-300 ${
              isScrolled ? 'text-gray-800' : 'text-white'
            }`}
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
              Donate Now
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

// Main Home Component
export default function HomePage() {
  return (
    <div className="bg-white text-gray-800">
     
      
      <Navbar />
      
      {/* Slider Section */}
      <section className="h-[70vh]">
        <ImageSlider />
      </section>

      {/* Our Focus Section */}
      <section className="py-16 px-8 lg:px-20 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 exo">
              Our Focus Areas
            </h2>
            <p className="text-xl text-gray-600 new max-w-3xl mx-auto">
              We are dedicated to providing comprehensive support for children and youth in need
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {/* Education */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl hover:border-[#50C779] transition-all duration-300 group">
              <div className="h-16 w-16 bg-[#50C779]/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#50C779] transition-all duration-300">
                <Book className="h-8 w-8 text-[#50C779] group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 exo">Education</h3>
              <p className="text-gray-600 mb-6">
                Quality education programs, school supplies, tuition support, and skill development for children and youth
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600">
                  <div className="h-2 w-2 bg-[#50C779] rounded-full mr-3"></div>
                  School Enrollment Support
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="h-2 w-2 bg-[#50C779] rounded-full mr-3"></div>
                  After-school Tutoring
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="h-2 w-2 bg-[#50C779] rounded-full mr-3"></div>
                  Career Counseling
                </li>
              </ul>
            </div>

            {/* Clothes */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl hover:border-[#50C779] transition-all duration-300 group">
              <div className="h-16 w-16 bg-[#50C779]/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#50C779] transition-all duration-300">
                <Shirt className="h-8 w-8 text-[#50C779] group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 exo">Clothes</h3>
              <p className="text-gray-600 mb-6">
                Providing new and gently used clothing for all seasons, ensuring dignity and comfort
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600">
                  <div className="h-2 w-2 bg-[#50C779] rounded-full mr-3"></div>
                  School Uniforms
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="h-2 w-2 bg-[#50C779] rounded-full mr-3"></div>
                  Winter Clothing
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="h-2 w-2 bg-[#50C779] rounded-full mr-3"></div>
                  Daily Wear
                </li>
              </ul>
            </div>

            {/* Food */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl hover:border-[#50C779] transition-all duration-300 group">
              <div className="h-16 w-16 bg-[#50C779]/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#50C779] transition-all duration-300">
                <Utensils className="h-8 w-8 text-[#50C779] group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 exo">Food</h3>
              <p className="text-gray-600 mb-6">
                Nutritious meals and food supplies to support proper growth and development
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600">
                  <div className="h-2 w-2 bg-[#50C779] rounded-full mr-3"></div>
                  Daily Meals Program
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="h-2 w-2 bg-[#50C779] rounded-full mr-3"></div>
                  Nutrition Education
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="h-2 w-2 bg-[#50C779] rounded-full mr-3"></div>
                  Food Kit Distribution
                </li>
              </ul>
            </div>

            {/* Home/Shelter */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl hover:border-[#50C779] transition-all duration-300 group">
              <div className="h-16 w-16 bg-[#50C779]/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#50C779] transition-all duration-300">
                <Home className="h-8 w-8 text-[#50C779] group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 exo">Home & Shelter</h3>
              <p className="text-gray-600 mb-6">
                Safe living environments, shelter support, and basic amenities for homeless children
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600">
                  <div className="h-2 w-2 bg-[#50C779] rounded-full mr-3"></div>
                  Shelter Homes
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="h-2 w-2 bg-[#50C779] rounded-full mr-3"></div>
                  Housing Support
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="h-2 w-2 bg-[#50C779] rounded-full mr-3"></div>
                  Basic Amenities
                </li>
              </ul>
            </div>
          </div>

          {/* Impact Stats */}
          <div className="bg-gradient-to-r from-[#50C779] to-[#3EAE66] rounded-3xl p-12 mb-20 shadow-xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "5,000+", label: "Children Educated" },
                { number: "50,000+", label: "Clothes Distributed" },
                { number: "1M+", label: "Meals Served" },
                { number: "500+", label: "Homes Supported" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold text-white mb-2 exo">{stat.number}</div>
                  <div className="text-white/90 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* How You Can Help */}
          <div className="mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-center mb-4 exo">
              How You Can Help
            </h2>
            <p className="text-xl text-gray-600 text-center mb-12 new max-w-3xl mx-auto">
              Your support can transform a child's life. Choose how you want to contribute.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  title: "Sponsor a Child", 
                  amount: "₹1000/month", 
                  desc: "Provide education, food, and clothing for one child",
                  icon: <Users className="h-10 w-10 text-[#50C779]" />
                },
                { 
                  title: "Donate Supplies", 
                  amount: "Any Amount", 
                  desc: "Contribute clothes, books, or school supplies",
                  icon: <Shirt className="h-10 w-10 text-[#50C779]" />
                },
                { 
                  title: "Volunteer", 
                  amount: "Your Time", 
                  desc: "Teach, mentor, or help with distribution",
                  icon: <Heart className="h-10 w-10 text-[#50C779]" />
                }
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:border-[#50C779] hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center mb-6">
                    {item.icon}
                    <div className="ml-4">
                      <h4 className="text-2xl font-bold exo">{item.title}</h4>
                      <div className="text-[#50C779] font-semibold">{item.amount}</div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6">{item.desc}</p>
                  <button className="w-full bg-[#50C779] hover:bg-[#3EAE66] text-white py-3 rounded-xl font-semibold transition duration-300">
                    Get Involved
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 exo">
              Together We Can Change Lives
            </h2>
            <p className="text-xl text-gray-600 mb-10 new max-w-3xl mx-auto">
              Every child deserves education, clothing, food, and a safe home. Join us in making this a reality.
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <button className="bg-[#50C779] hover:bg-[#3EAE66] text-white px-10 py-4 rounded-2xl font-semibold text-xl transition duration-300 shadow-lg hover:scale-105">
                Donate Now
              </button>
              <button className="bg-transparent border-2 border-[#50C779] text-[#50C779] hover:bg-[#50C779] hover:text-white px-10 py-4 rounded-2xl font-semibold text-xl transition duration-300">
                Volunteer Today
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}