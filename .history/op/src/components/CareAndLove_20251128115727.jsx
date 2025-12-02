import React from 'react';

const CareAndLove = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <p className="text-blue-600 text-lg font-medium mb-3">- We can do better</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            We provide care & love
          </h1>
        </div>

        {/* Main Divider */}
        <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-12 rounded-full"></div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Medical & Education Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px]">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">💊</span>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              Medical & Education
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Delivering essential medical supplies and health education programs.
            </p>
            <button className="flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors group">
              Learn More 
              <span className="ml-2 transform group-hover:translate-x-1 transition-transform">😊</span>
            </button>
          </div>

          {/* Food & Build Home Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px]">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🏠</span>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              Food & Build Home
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Help us provide meals and build homes for struggling families.
            </p>
            <button className="flex items-center text-green-600 font-semibold hover:text-green-700 transition-colors group">
              Learn More 
              <span className="ml-2 transform group-hover:translate-x-1 transition-transform">😊</span>
            </button>
          </div>

          {/* Fresh & Clean Water Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-cyan-100 hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px]">
            <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">💧</span>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              Fresh & Clean Water
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Your contribution brings fresh, clean water to save lives globally.
            </p>
            <button className="flex items-center text-cyan-600 font-semibold hover:text-cyan-700 transition-colors group">
              Learn More 
              <span className="ml-2 transform group-hover:translate-x-1 transition-transform">😊</span>
            </button>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl">
            Join Our Mission
          </button>
        </div>
      </div>
    </div>
  );
};

export default CareAndLove;