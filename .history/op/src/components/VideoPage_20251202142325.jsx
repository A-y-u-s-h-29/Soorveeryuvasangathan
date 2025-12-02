import React from "react";

const InstagramVideoSimple = () => {
  return (
    <section className="py-16 px-8 lg:px-20 bg-white">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          
          {/* Left Content */}
          <div className="w-full lg:w-1/2">
            <div className="max-w-2xl">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6 exo">
                Our Work in <span className="text-[#50C779]">Action</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                See firsthand how your support transforms lives through our Instagram stories.
              </p>
              
              <div className="space-y-4 mb-10">
                <h3 className="text-2xl font-bold text-gray-800">Why Follow Us?</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-[#50C779] rounded-full"></div>
                    <span className="text-gray-700">Daily updates on our activities</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-[#50C779] rounded-full"></div>
                    <span className="text-gray-700">Success stories and testimonials</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-[#50C779] rounded-full"></div>
                    <span className="text-gray-700">Behind-the-scenes moments</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-[#50C779] rounded-full"></div>
                    <span className="text-gray-700">Live updates from the field</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Right Video */}
          <div className="w-full lg:w-1/2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
              {/* Instagram Iframe */}
              <div className="relative" style={{ paddingBottom: '125%' }}>
                <iframe
                  src="https://www.instagram.com/p/DB1NT7FS1To/embed/"
                  className="absolute top-0 left-0 w-full h-[70vh] border-0"
                  title="Instagram Video"
                  allow="encrypted-media"
                  scrolling="no"
                />
              </div>
              
              {/* Fallback if iframe fails */}
              <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <a 
                  href="https://www.instagram.com/reel/DB1NT7FS1To/?igsh=OWMwMnpkdmNscWkx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-gray-800 px-6 py-3 rounded-xl font-semibold shadow-lg"
                >
                  Open in Instagram
                </a>
              </div>
            </div>
            
            {/* Instagram Follow Button */}
            <div className="mt-6 text-center">
              <a 
                href="https://www.instagram.com/soorveer_yuva"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-xl transition-shadow"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C20.316 1.092 19.648.68 18.86.374c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 01-2.88 0 1.44 1.44 0 012.88 0z" />
                </svg>
                Follow @soorveer_yuva
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstagramVideoSimple;