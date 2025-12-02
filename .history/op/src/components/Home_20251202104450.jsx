import React from "react";

// Navbar component banayein (ya same file mein rakhein)
const Navbar = () => {
  const navItems = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Child", href: "#child" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="w-full bg-[#15362D] sticky top-0 z-50 border-b border-gray-700">
      <div className="container mx-auto px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/images/logo.png" // Apna logo path daalein
              alt="Soorveer Yuva Sangathan Trust Logo"
              className="h-10 w-auto lg:h-12"
            />
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
                className="text-gray-200 hover:text-white font-medium new text-lg transition duration-300"
              >
                {item.name}
              </a>
            ))}
            {/* Contact Button */}
            <button className="bg-[#50C779] text-white px-6 py-2 rounded-2xl font-semibold new text-lg hover:bg-[#3EAE66] transition duration-300">
              Contact Us
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation (Optional - Dropdown) */}
        {/* <div className="lg:hidden mt-4">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block py-2 text-gray-200 hover:text-white"
            >
              {item.name}
            </a>
          ))}
        </div> */}
      </div>
    </nav>
  );
};

export default function Home() {
  return (
    <>
      {/* Navbar ko top par add karein */}
      <Navbar />
      
      <div className="min-h-screen flex flex-col md:flex-row bg-[#15362D] rounded-b-[5vh] lg:rounded-b-[15vh]">
        {/* Left section */}
        <section className="w-full md:w-3/5 md:h-[115vh] flex flex-col rounded-2xl">
          {/* Top - 40% on md, auto on mobile */}
          <div className="w-full h-[40%] flex items-center px-8 lg:px-25 py-10">
            <h1 className="text-5xl lg:text-5xl leading-14 lg:leading-18 font-bold text-white new uppercase exo">
              Soorveer Yuva Sangathan Trust
            </h1>
          </div>

          {/* Bottom - 60% on md */}
          <div className="w-full md:h-[60%] h-auto flex items-center justify-center lg:mt-6">
            <div className="w-[100%] flex items-center justify-center bg-[url('/images/back.svg')] bg-cover h-[27vh] md:h-[65vh] mt-7">
              <img
                src="/images/main.avif"
                alt="Left bottom"
                className="max-w-full lg:h-[75vh] rounded shadow-lg object-contain mb-13 lg:mb-15"
              />
            </div>
          </div>
        </section>

        {/* Right section */}
        <section className="w-full md:w-2/5 flex flex-col mt-10">
          {/* Top 50%: image */}
          <div className="w-full md:h-1/2 h-auto flex items-center justify-center rounded-3xl">
            <img
              src="/images/child.avif"
              alt="Right top"
              className="w-[90%] rounded-3xl lg:w-[60%] h-[43vh] lg:h-[55vh] shadow-lg object-contain"
            />
          </div>

          {/* Bottom 50%: text and buttons */}
          <div className="w-full md:h-1/2 h-auto flex items-center justify-center -mt-5 p-10">
            <div className="text-center">
              <p className="text-gray-200 mb-4 max-w-xl mx-auto new text-xl hok">
                Every act of kindness—donation, volunteering, or partnership—brings us closer to a world where everyone thrives.
              </p>
              <div className="flex lg:items-center justify-center flex-col lg:flex-row gap-4">
                <button className="bg-[#50C779] text-white px-8 py-3 rounded-2xl font-semibold new text-xl hover:bg-[#3EAE66] transition duration-300">
                  Donate
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}