import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#15362D]">
      {/* Left section (split vertically: top 40% / bottom 60%) */}
      <section className="w-full md:w-3/5  md:h-[115vh] flex flex-col">
        {/* Top - 40% on md, auto on mobile: single centered heading */}
        <div className="w-full h-[40%]  flex  items-center px-8  lg:px-25 py-10">
          <h1 className="text-5xl  lg:text-6xl leading-14 lg:leading-18 font-extrabold text-white  new">
            Empowering Lives Through Education
          </h1>
        </div>

        {/* Bottom - 60% on md, auto on mobile: background from back.svg with main.avif centered on top */}
        <div className="w-full md:h-[60%] h-auto flex items-center justify-center lg:mt-6">
          <div className="w-[100%] flex items-center justify-center bg-[url('/images/back.svg')]  bg-cover rounded-lg h-[27vh] md:h-[65vh]  mt-7">
            <img
              src="/images/main.avif"
              alt="Left bottom"
              className="max-w-full  lg:h-[75vh]  rounded shadow-lg object-contain mb-13 lg:mb-15"
            />
          </div>
        </div>
      </section>

      {/* Right section split vertically: top 50% image, bottom 50% text+buttons */}
      <section className="w-full md:w-2/5 flex flex-col p-6 md:p-8">
        {/* Top 50%: image */}
        <div className="w-full md:h-1/2 h-auto flex items-center justify-center">
          <img
            src="/images/child.avif"
            alt="Right top"
            className="max-w-full h-[60vh] rounded-lg shadow-lg object-contain"
          />
        </div>

        {/* Bottom 50%: text and two buttons */}
        <div className="w-full md:h-1/2 h-auto flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-3 text-white">
              Join Our Mission
            </h3>
            <p className="text-gray-200 mb-4 max-w-sm mx-auto">
              Support our programs and help empower students with quality
              educational resources. Your contribution makes a real difference.
            </p>
            <div className="flex items-center justify-center gap-4">
              <button className="bg-white text-[#15362D] px-4 py-2 rounded font-semibold">
                Donate
              </button>
              <button className="border border-white text-white px-4 py-2 rounded">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
