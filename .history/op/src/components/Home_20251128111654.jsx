import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#15362D]">
      {/* Left section (split vertically: top 40% / bottom 60%) */}
      <section className="w-full md:w-3/5  md:h-[115vh] flex flex-col">
        {/* Top - 40% on md, auto on mobile: single centered heading */}
        <div className="w-full md:h-[40%] h-auto flex  items-center ">
          <h1 className="text-5xl  lg:text-6xl font-extrabold text-white max-w-  new">
            Empowering Lives Through Education
          </h1>
        </div>

        {/* Bottom - 60% on md, auto on mobile: background from back.svg with main.avif centered on top */}
        <div className="w-full md:h-[60%] h-auto flex items-center justify-center mt-6">
          <div className="w-[100%] flex items-center justify-center bg-[url('/images/back.svg')]  bg-cover rounded-lg  md:h-[70vh] h-auto mt-7">
            <img
              src="/images/main.avif"
              alt="Left bottom"
              className="max-w-full h-auto md:max-h-[75vh] max-h-[40vh] rounded shadow-lg object-contain mb-15"
            />
          </div>
        </div>
      </section>

      {/* Right section */}
      <section className="w-full md:w-2/5 flex items-center justify-center  p-8">
        <div className="max-w-md text-center">
          <div className="inline-flex items-center justify-center w-48 h-48 rounded-lg mb-6 shadow-lg">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z"
                fill="white"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Right Section</h2>
          <p className="text-gray-600">
            This is the right section — great for images, illustrations, or
            supplemental content. On smaller screens the layout stacks
            vertically.
          </p>
        </div>
      </section>
    </div>
  );
}
