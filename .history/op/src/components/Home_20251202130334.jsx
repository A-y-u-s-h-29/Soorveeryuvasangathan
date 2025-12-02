// src/components/Home.jsx
import React from "react";
import Navbar from "./Navbar";
import ImageSlider from "./ImageSlider";
import { Book, Shirt, Home as HomeIcon, Utensils, Heart, Users } from "lucide-react";

const Home = () => {
  return (
    <div className="bg-white text-gray-800">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
      
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
                <HomeIcon className="h-8 w-8 text-[#50C779] group-hover:text-white" />
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
};

export default Home;