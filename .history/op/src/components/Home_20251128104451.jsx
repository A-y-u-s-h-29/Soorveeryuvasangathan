import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#15362D]">
      {/* Left section (split vertically: top 40% / bottom 60%) */}
      <section className="w-full md:w-3/5 p-8 h-full flex flex-col">
        {/* Top - 40% */}
        <div className="w-full h-[40%] flex items-center">
          <div className="max-w-lg">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Welcome to the Home Page
            </h1>
            <p className="text-lg mb-6 opacity-90">
              This is the top area of the left section (40%). Put prominent
              headings and primary CTAs here.
            </p>
            <div className="flex gap-4">
              <button className="bg-white text-indigo-700 font-semibold px-4 py-2 rounded shadow">
                Get Started
              </button>
              <button className="bg-transparent border border-white text-white px-4 py-2 rounded">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Bottom - 60% */}
        <div className="w-full h-[60%] flex items-start mt-6">
          <div className="max-w-lg text-sm text-white/90">
            <h3 className="text-xl font-semibold mb-2">Secondary Content</h3>
            <p>
              This bottom area (60%) can hold supporting information, feature
              lists, testimonials, or anything that complements the main CTA
              above. It remains stacked below the top area on smaller screens.
            </p>
            <ul className="mt-4 list-disc list-inside space-y-2 text-sm">
              <li>Feature or benefit one</li>
              <li>Feature or benefit two</li>
              <li>Feature or benefit three</li>
            </ul>
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
