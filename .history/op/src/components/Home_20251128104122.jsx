import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left section */}
      <section className="w-full md:w-3/5 flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-8">
        <div className="max-w-lg">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Welcome to the Home Page
          </h1>
          <p className="text-lg mb-6 opacity-90">
            This is the left section. Use this area for headings, descriptions,
            or calls-to-action. It's responsive and built with Tailwind CSS.
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
      </section>

      {/* Right section */}
      <section className="w-full md:w-2/5 flex items-center justify-center bg-gray-50 p-8">
        <div className="max-w-md text-center">
          <div className="inline-flex items-center justify-center w-48 h-48 bg-gradient-to-tr from-pink-400 to-yellow-400 rounded-lg mb-6 shadow-lg">
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
