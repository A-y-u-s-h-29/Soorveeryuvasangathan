import React from 'react';

const CareAndLove = () => {
  return (
    <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <p className="text-gray-500 text-lg font-medium mb-3 tracking-wide">- We can do better</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            We provide care & love
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-gray-400 to-gray-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Medical & Education Card */}
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                <span className="text-xl">💊</span>
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                Medical & Education
              </h2>
            </div>
            <p className="text-gray-600 mb-4 leading-relaxed text-sm">
              Delivering essential medical supplies and health education programs.
            </p>
            <button className="flex items-center text-gray-700 font-medium hover:text-gray-900 transition-colors text-sm">
              Learn More 
              <span className="ml-2 transform hover:translate-x-1 transition-transform">😊</span>
            </button>
          </div>

          {/* Food & Build Home Card */}
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mr-3">
                <span className="text-xl">🏠</span>
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                Food & Build Home
              </h2>
            </div>
            <p className="text-gray-600 mb-4 leading-relaxed text-sm">
              Help us provide meals and build homes for struggling families.
            </p>
            <button className="flex items-center text-gray-700 font-medium hover:text-gray-900 transition-colors text-sm">
              Learn More 
              <span className="ml-2 transform hover:translate-x-1 transition-transform">😊</span>
            </button>
          </div>

          {/* Fresh & Clean Water Card */}
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-cyan-50 rounded-lg flex items-center justify-center mr-3">
                <span className="text-xl">💧</span>
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                Fresh & Clean Water
              </h2>
            </div>
            <p className="text-gray-600 mb-4 leading-relaxed text-sm">
              Your contribution brings fresh, clean water to save lives globally.
            </p>
            <button className="flex items-center text-gray-700 font-medium hover:text-gray-900 transition-colors text-sm">
              Learn More 
              <span className="ml-2 transform hover:translate-x-1 transition-transform">😊</span>
            </button>
          </div>
        </div>

        {/* Bottom Divider */}
        <div className="w-20 h-1 bg-gradient-to-r from-gray-400 to-gray-600 mx-auto mt-12 rounded-full"></div>
      </div>
    </div>
  );
};

export default CareAndLove;