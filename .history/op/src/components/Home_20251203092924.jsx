// src/components/Home.jsx
import React from "react";

import ImageSlider from "./ImageSlider";
import { Book, Shirt, Home as HomeIcon, Utensils, Heart, Users } from "lucide-react";

const Home = () => {
  return (
    <div className="bg-white text-gray-800 ">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
      
    
      
      {/* Slider Section */}
      <section className="h-[100vh]">
        <ImageSlider />
      </section>

   
      <section className="py-16 px-8 lg:px-20 bg-white">
        <div className="container mx-auto">
          <div className="text-center lg:mb-10">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 exo">
              Our Focus Areas
            </h2>
            <p className="text-xl text-gray-600 new max-w-3xl mx-auto">
              We are dedicated to providing comprehensive support for children and youth in need
            </p>
          </div>

         

         {/* Services Grid - Circle Design */}
<div className="grid grid-cols-2 lg:grid-cols-4 gap-15  px-1 lg:px-4 -mt-15 lg:mt-0" id="programs">
  {/* Education */}
  <div className="flex flex-col items-center text-center group">
    <div className="relative mb-6">
      {/* Outer circle with hover effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#50C779] to-[#3EAE66] rounded-full blur-lg opacity-0 group-hover:opacity-70 transition-all duration-500 scale-0 group-hover:scale-110"></div>
      
      {/* Main circle with image */}
      <div className="relative h-40 w-40 lg:h-58 lg:w-58 rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:border-[#50C779] transition-all duration-300">
        <img 
          src="/images/mc1.avif" 
          alt="Education" 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Overlay icon */}
        
      </div>
      
      {/* Number badge */}
     
    </div>
    
    {/* Content below circle */}
    <h3 className="text-2xl font-bold mb-3 exo text-gray-800 group-hover:text-[#50C779] transition-colors duration-300">
      Education
    </h3>
   

    
    {/* Learn More Button */}
   
  </div>

  {/* Clothes */}
  <div className="flex flex-col items-center text-center group">
    <div className="relative mb-6">
      <div className="absolute inset-0 bg-gradient-to-r from-[#50C779] to-[#3EAE66] rounded-full blur-lg opacity-0 group-hover:opacity-70 transition-all duration-500 scale-0 group-hover:scale-110"></div>
      
      <div className="relative h-40 w-40 lg:h-58 lg:w-58 rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:border-[#50C779] transition-all duration-300">
        <img 
          src="/images/mc2.jpg" 
          alt="Clothes" 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
      </div>
      
     
    </div>
    
    <h3 className="text-2xl font-bold mb-3 exo text-gray-800 group-hover:text-[#50C779] transition-colors duration-300">
      Clothes
    </h3>
   
  </div>

  {/* Food */}
  <div className="flex flex-col items-center text-center group">
    <div className="relative mb-6">
      <div className="absolute inset-0 bg-gradient-to-r from-[#50C779] to-[#3EAE66] rounded-full blur-lg opacity-0 group-hover:opacity-70 transition-all duration-500 scale-0 group-hover:scale-110"></div>
      
      <div className="relative h-40 w-40 lg:h-58 lg:w-58 rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:border-[#50C779] transition-all duration-300">
        <img 
          src="/images/mc3.jpg" 
          alt="Food" 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
       
      </div>
     
    </div>
    
    <h3 className="text-2xl font-bold mb-3 exo text-gray-800 group-hover:text-[#50C779] transition-colors duration-300">
      Food
    </h3>
   
  </div>

  {/* Home & Shelter */}
  <div className="flex flex-col items-center text-center group">
    <div className="relative mb-6">
      <div className="absolute inset-0 bg-gradient-to-r from-[#50C779] to-[#3EAE66] rounded-full blur-lg opacity-0 group-hover:opacity-70 transition-all duration-500 scale-0 group-hover:scale-110"></div>
      
      <div className="relative h-40 w-40 lg:h-58 lg:w-58 rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:border-[#50C779] transition-all duration-300">
        <img 
          src="/images/mc4.jpg" 
          alt="Home & Shelter" 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
      </div>
      
      
    </div>
    
    <h3 className="text-2xl font-bold mb-3 exo text-gray-800 group-hover:text-[#50C779] transition-colors duration-300">
      Home & Shelter
    </h3>
   
  </div>
</div>

         
        </div>
      </section>
    </div>
  );
};

export default Home;