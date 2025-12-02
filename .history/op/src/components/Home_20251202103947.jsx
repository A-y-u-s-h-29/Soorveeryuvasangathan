import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#15362D]  rounded-b-[5vh] lg:rounded-b-[15vh]">
      {/* Left section (split vertically: top 40% / bottom 60%) */}
      <section className="w-full md:w-3/5  md:h-[115vh] flex flex-col rounded-2xl">
        {/* Top - 40% on md, auto on mobile: single centered heading */}
        <div className="w-full h-[40%]  flex  items-center px-8  lg:px-25 py-10">
          <h1 className="text-5xl  lg:text-6xl leading-14 lg:leading-18 font-extrabold text-white  new">
           Soorveer
          </h1>
        </div>

        {/* Bottom - 60% on md, auto on mobile: background from back.svg with main.avif centered on top */}
        <div className="w-full md:h-[60%] h-auto flex items-center justify-center lg:mt-6">
          <div className="w-[100%] flex items-center justify-center bg-[url('/images/back.svg')]  bg-cover  h-[27vh] md:h-[65vh]  mt-7">
            <img
              src="/images/main.avif"
              alt="Left bottom"
              className="max-w-full  lg:h-[75vh]  rounded shadow-lg object-contain mb-13 lg:mb-15"
            />
          </div>
        </div>
      </section>

      {/* Right section split vertically: top 50% image, bottom 50% text+buttons */}
      <section className="w-full md:w-2/5 flex flex-col mt-10">
        {/* Top 50%: image */}
        <div className="w-full md:h-1/2 h-auto flex items-center justify-center rounded-3xl">
          <img
            src="/images/child.avif"
            alt="Right top"
            className="w-[90%] rounded-3xl lg:w-[60%] h-[43vh] lg:h-[55vh] shadow-lg object-contain"
          />
        </div>

        {/* Bottom 50%: text and two buttons */}
        <div className="w-full md:h-1/2 h-auto flex items-center justify-center -mt-5 p-10">
          <div className="text-center">
           
            <p className="text-gray-200 mb-4 max-w-xl mx-auto new text-xl hok">
        Every act of kindness—donation, volunteering, or partnership—brings us closer to a world where everyone thrives.
            </p>
            <div className="flex lg:items-center justify-center flex-col lg:flex-row gap-4">
              <button className="bg-[#50C779] text-white px-8 py-3 rounded-2xl font-semibold new text-xl">
                Join With Us
              </button>
              <button className="border-2 rounded-2xl border-[#50C779] text-semibold px-8 py-3 text-xl new text-[#50C779]!">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
