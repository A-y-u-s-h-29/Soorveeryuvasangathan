// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { HashLink } from 'react-router-hash-link';
import { useNavigate } from 'react-router-dom';
import { Heart } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  
  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Programs", href: "#programs" },
    { name: "Our Work", href: "#work" },
    
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

  // Smooth scroll function for hash links
  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80; // Adjust this value based on your navbar height
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
  };

  // Handle Donate Now button click
  const handleDonateClick = () => {
    // Close mobile menu if open
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
    // Navigate to donate page
    navigate("/donate");
  };

  return (
    <nav className={`w-full fixed top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo with Home Link */}
          <HashLink 
            to="#home" 
            smooth 
            scroll={(el) => scrollWithOffset(el)}
            className="flex items-center"
          >
            <img src="/images/logo.jpg" className="h-15 w-15 rounded-full" alt="Logo" />
            <span className={`ml-3 font-bold text-xl lg:text-2xl exo transition-all duration-300 ${
              isScrolled ? 'text-gray-800' : 'text-white'
            }`}>
              Soorveer Yuva Sangathan Trust
            </span>
          </HashLink>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 exo">
            {navItems.map((item) => (
              <HashLink
                key={item.name}
                to={item.href}
                smooth
                scroll={(el) => scrollWithOffset(el)}
                className={`font-semibold exo text-md transition duration-300 relative group ${
                  isScrolled ? 'text-gray-800' : 'text-white'
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 ${
                  isScrolled ? 'bg-[#50C779]' : 'bg-white'
                } group-hover:w-full`}></span>
              </HashLink>
            ))}
            <button
              onClick={handleDonateClick}
              className="bg-[#50C779] hover:bg-[#3EAE66] text-white px-6 py-2 rounded-2xl font-semibold exo text-lg hover:scale-105 transition duration-300 shadow-lg"
            >
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
              <HashLink
                key={item.name}
                to={item.href}
                smooth
                scroll={(el) => scrollWithOffset(el)}
                className="block py-3 px-4 text-gray-700 hover:text-[#50C779] hover:bg-gray-50 rounded-lg transition duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </HashLink>
            ))}
            <button
              onClick={handleDonateClick}
              className="w-full mt-3 bg-[#50C779] text-white px-6 py-3 rounded-xl font-semibold text-lg hover:bg-[#3EAE66] transition duration-300 block text-center"
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