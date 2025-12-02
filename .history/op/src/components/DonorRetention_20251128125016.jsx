import React from "react";

export default function DonorRetention() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-stretch bg-[#f8faf9]">
      {/* Left content */}
      <div className="w-full md:w-1/2 flex items-center p-8 bg-white">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-6xl font-bold text-[#15362D] mb-8 exo">
         Let's Retain & Grow  Your Donor Base
          </h1>
          <p className="text-gray-700 mb-4 exo">
            Our mobile education bus brings learning resources and trained
            volunteers directly to underserved communities. Be a part of this
            movement to ensure every child has access to quality education.
          </p>

          <h2 className="text-4xl exo font-semibold text-[#15362D] mb-2">
           Fund Rising
          </h2>
          <p className="text-gray-700 mb-6 exo">
          Support life-changing projects—donate now to make a difference!
          </p>

          <h2 className="text-4xl exo font-semibold text-[#15362D] mb-2">
         Make Donation
          </h2>
          <p className="text-gray-700 mb-6 exo">
         Empower change—your donation creates hope and transforms lives.
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
            className="w-full h-full object-contain rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
