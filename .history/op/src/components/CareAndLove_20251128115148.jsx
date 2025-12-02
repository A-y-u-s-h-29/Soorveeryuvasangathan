import React from 'react';

const CareAndLove = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8 md:p-12">
          {/* Header Section */}
          <div className="text-center mb-12">
            <p className="text-gray-600 text-lg mb-4">- We can do better</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              We provide care & love
            </h1>
          </div>

          {/* Divider */}
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mb-12"></div>

          {/* Services Grid */}
          <div className="space-y-8">
            {/* Medical & Education */}
            <div className="bg-white rounded-lg p-6 border-l-4 border-blue-500 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Medical & Education
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Delivering essential medical supplies and health education programs.
              </p>
              <button className="flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                Learn More <span className="ml-2 text-lg">💬</span>
              </button>
            </div>

            {/* Food & Build Home */}
            <div className="bg-white rounded-lg p-6 border-l-4 border-green-500 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Food & Build Home
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Help us provide meals and build homes for struggling families.
              </p>
              <button className="flex items-center text-green-600 font-semibold hover:text-green-700 transition-colors">
                Learn More <span className="ml-2 text-lg">💮</span>
              </button>
            </div>

            {/* Fresh & Clean Water */}
            <div className="bg-white rounded-lg p-6 border-l-4 border-teal-500 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Fresh & Clean Water
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Your contribution brings fresh, clean water to save lives globally.
              </p>
              <button className="flex items-center text-teal-600 font-semibold hover:text-teal-700 transition-colors">
                Learn More <span className="ml-2 text-lg">💯</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareAndLove;