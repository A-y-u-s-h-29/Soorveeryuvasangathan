import React from "react";

export default function DonorRetention() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-stretch bg-[#f8faf9]">
      {/* Left content */}
      <div className="w-full md:w-1/2 flex items-center p-8 bg-white">
        <div className="max-w-lg">
          <h1 className="text-3xl md:text-4xl font-bold text-[#15362D] mb-4">
            Support Our Mobile Education Bus
          </h1>
          <p className="text-gray-700 mb-4">
            Our mobile education bus brings learning resources and trained
            volunteers directly to underserved communities. Be a part of this
            movement to ensure every child has access to quality education.
          </p>

          <h2 className="text-xl font-semibold text-[#15362D] mb-2">
            How you can help
          </h2>
          <p className="text-gray-700 mb-6">
            Your donation helps maintain the bus, fund learning materials, and
            support volunteer training programs.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <button className="bg-[#15362D] text-white px-5 py-2 rounded font-semibold">
              Donate Now
            </button>
            <div className="flex items-center gap-3">
              <button className="border border-[#15362D] text-[#15362D] px-4 py-2 rounded">
                Call Us
              </button>
              <span className="text-[#15362D] font-medium">
                +1 (555) 123-4567
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right image */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gradient-to-tr from-indigo-50 to-white">
        <div className="w-full  flex ">
          <img
            src="/images/do.avif"
            alt="Education Bus"
            className="w-full h-auto md:h-[60vh] object-contain rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
