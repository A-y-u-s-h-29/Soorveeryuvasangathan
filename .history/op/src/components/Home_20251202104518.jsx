import React, { useState } from "react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Child", href: "#child" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="w-full bg-[#15362D]/95 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-700">
      <div className="container mx-auto px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="h-10 w-10 lg:h-12 lg:w-12 bg-[#50C779] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="ml-3 text-white font-bold text-xl lg:text-2xl new">
              Soorveer Yuva Sangathan Trust
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-200 hover:text-white font-medium new text-lg transition duration-300 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#50C779] group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
            <button className="bg-[#50C779] text-white px-6 py-2 rounded-2xl font-semibold new text-lg hover:bg-[#3EAE66] hover:scale-105 transition duration-300 shadow-lg">
              Contact Us
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-white"
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
          <div className="lg:hidden mt-4 bg-[#1a4739] rounded-xl p-4 animate-fadeIn">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block py-3 px-4 text-gray-200 hover:text-white hover:bg-[#2a5a4a] rounded-lg transition duration-300"
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

// CSS for animation (tailwind.config.js mein add karein ya inline style)
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }
`;

export default function Home() {
  return (
    <>
      <style>{styles}</style>
      <Navbar />
      
      <div className="min-h-screen flex flex-col md:flex-row bg-[#15362D] rounded-b-[5vh] lg:rounded-b-[15vh]">
        {/* ... rest of your Home component ... */}
      </div>
    </>
  );
}