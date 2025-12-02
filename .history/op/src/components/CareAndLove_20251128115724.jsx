import React from 'react';

const CareAndLove = () => {
  return (
    <div className="min-h-screen bg-[#f0f4f8] flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <p className="text-gray-600 text-lg mb-2">- We can do better</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            We provide care & love
          </h1>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-300 mb-8"></div>

        {/* Medical & Education */}
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
            Medical & Education
          </h2>
          <p className="text-gray-700 mb-3 leading-relaxed">
            Delivering essential medical supplies and health education programs.
          </p>
          <button className="flex items-center text-gray-900 font-semibold">
            Learn More <span className="ml-2">😊</span>
          </button>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-300 mb-8"></div>

        {/* Food & Build Home */}
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
            Food & Build Home
          </h2>
          <p className="text-gray-700 mb-3 leading-relaxed">
            Help us provide meals and build homes for struggling families.
          </p>
          <button className="flex items-center text-gray-900 font-semibold">
            Learn More <span className="ml-2">😊</span>
          </button>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-300 mb-8"></div>

        {/* Fresh & Clean Water */}
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
            Fresh & Clean Water
          </h2>
          <p className="text-gray-700 mb-3 leading-relaxed">
            Your contribution brings fresh, clean water to save lives globally.
          </p>
          <button className="flex items-center text-gray-900 font-semibold">
            Learn More <span className="ml-2">😊</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CareAndLove;