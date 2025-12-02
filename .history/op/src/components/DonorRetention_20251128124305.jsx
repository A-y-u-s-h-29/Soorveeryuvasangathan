import React from 'react';
import { motion } from 'framer-motion';

const DonorRetention = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex">
      {/* Left Content Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-2xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight"
          >
            Let's Retain & Grow Your <span className="text-blue-600">Donor Base</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-600 text-lg mb-8 leading-relaxed"
          >
            Your <span className="font-semibold text-blue-600">$40/month</span> provides clean water for 12 people annually. <span className="font-semibold">100% directly funds</span> vital water projects.
          </motion.p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Fund Rising Card */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-blue-500"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                Fund Rising
              </h2>
              <p className="text-gray-600 text-sm">
                Support life-changing projects—donate now to make a difference!
              </p>
            </motion.div>

            {/* Make Donation Card */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-green-500"
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💝</span>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                Make Donation
              </h2>
              <p className="text-gray-600 text-sm">
                Empower change—your donation creates hope and transforms lives.
              </p>
            </motion.div>
          </div>

          {/* Stats and Contact Section */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white p-6 rounded-2xl shadow-lg"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Learn More</h3>
              <div className="flex items-center text-gray-700">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600">📞</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Call Us Anytime</p>
                  <p className="text-blue-600 font-semibold">+088 (246) 642-27-10</p>
                </div>
              </div>
            </motion.div>

            {/* ONATE Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-2">ONATE</h3>
              <div className="text-3xl font-bold mb-2">$34,434</div>
              <p className="font-medium opacity-90">Helped fund</p>
              <p className="opacity-80">Wishes all over the world.</p>
            </motion.div>
          </div>

          {/* Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex gap-4 mt-8"
          >
            <button className="flex-1 bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl">
              Get this $29
            </button>
            <button className="flex-1 bg-green-500 text-white py-4 px-6 rounded-xl font-semibold hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl">
              Unlock 80+ Templates
            </button>
          </motion.div>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="hidden lg:block w-1/2 bg-gradient-to-br from-blue-400 to-purple-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-white text-center">
            <img src='/images'
        </div>
        
        {/* Floating Elements */}
       
      </div>
    </div>
  );
};

export default DonorRetention;