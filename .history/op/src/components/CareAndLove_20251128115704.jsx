import React from 'react'

const CareAndLove = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#15362D]">
      {/* Left: visual image area */}
      <div className="w-full md:w-3/5 flex items-center justify-center p-6">
        <div className="w-full h-full flex items-center justify-center bg-[url('/images/back.svg')] bg-center bg-cover rounded-lg p-6">
          <img
            src="/images/child.avif"
            alt="Care & Love"
            className="max-w-full md:max-h-[75vh] max-h-[50vh] rounded-lg shadow-lg object-cover"
          />
        </div>
      </div>

      {/* Right: content area with cards */}
      <div className="w-full md:w-2/5 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <p className="text-white text-sm mb-2">- We can do better</p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
            We provide care & love
          </h1>

          <div className="space-y-6">
            <div className="bg-white/5 rounded-lg p-5">
              <h3 className="text-xl font-semibold text-white mb-2">Medical & Education</h3>
              <p className="text-gray-200 mb-3">
                Delivering essential medical supplies and health education programs
                to communities in need.
              </p>
              <button className="bg-white text-[#15362D] px-4 py-2 rounded font-semibold">Learn More</button>
            </div>

            <div className="bg-white/5 rounded-lg p-5">
              <h3 className="text-xl font-semibold text-white mb-2">Food & Build Homes</h3>
              <p className="text-gray-200 mb-3">
                Help provide meals and build safe homes for struggling families.
              </p>
              <button className="bg-white text-[#15362D] px-4 py-2 rounded font-semibold">Learn More</button>
            </div>

            <div className="bg-white/5 rounded-lg p-5">
              <h3 className="text-xl font-semibold text-white mb-2">Fresh & Clean Water</h3>
              <p className="text-gray-200 mb-3">
                Support clean water projects that save lives and improve health.
              </p>
              <button className="bg-white text-[#15362D] px-4 py-2 rounded font-semibold">Learn More</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CareAndLove