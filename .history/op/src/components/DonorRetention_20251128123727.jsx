import React from 'react';

const DonorRetention = () => {
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-sm">
        <div className="p-8">
          {/* Main Heading */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Let's Retain & Grow Your Donor Base
          </h1>
          
          {/* Subtitle */}
          <p className="text-gray-700 text-lg mb-8 leading-relaxed">
            Your $40/month provides clean water for 12 people annually. 100% directly funds vital water projects.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div>
              {/* Fund Rising Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Fund Rising
                </h2>
                <p className="text-gray-600">
                  Support life-changing projects—donate now to make a difference!
                </p>
              </div>

              {/* Make Donation Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Make Donation
                </h2>
                <p className="text-gray-600">
                  Empower change—your donation creates hope and transforms lives.
                </p>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-gray-300 my-6"></div>

              {/* Learn More Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Learn More
                </h3>
                <div className="flex items-center text-gray-700">
                  <span className="font-medium mr-2">Call Us Anytime</span>
                  <span>+088 (246) 642-27-10</span>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* ONATE Section */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">ONATE</h3>
                <div className="text-3xl font-bold text-gray-900 mb-2">$34,434</div>
                <p className="text-gray-600 font-medium">Helped fund</p>
                <p className="text-gray-600">Wishes all over the world.</p>
              </div>

              {/* Buttons */}
              <div className="space-y-4">
                <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Get this $29
                </button>
                <button className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                  Unlock 80+ Templates
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorRetention;