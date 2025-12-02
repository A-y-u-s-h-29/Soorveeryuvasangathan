// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";

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

export default Navbar;