import React from "react";

const InstagramVideoSimple = () => {
  return (
    <section className="py-16 px-8 lg:px-20 bg-white">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center" id="work">
          
          {/* Left Content */}
       <div className="w-full lg:w-1/2">
  <div className="max-w-2xl">
    <span className="inline-block bg-[#50C779]/10 text-[#50C779] px-4 py-2 rounded-full text-sm font-semibold mb-4">
      Empowering Young Lives 
    </span>
    
    <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6 exo">
      Soorveer <span className="text-[#50C779]">Yuva Sangathan</span> Trust
    </h2>
    
    
    <div className="space-y-6 mb-10">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 bg-[#50C779]/10 rounded-full flex items-center justify-center flex-shrink-0">
          <svg className="h-6 w-6 text-[#50C779]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Quality Education</h3>
          <p className="text-gray-600">
            We provide access to quality education, school supplies, and skill development 
            programs to ensure every child has the tools to succeed.
          </p>
        </div>
      </div>
      
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 bg-[#50C779]/10 rounded-full flex items-center justify-center flex-shrink-0">
          <svg className="h-6 w-6 text-[#50C779]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Nutrition & Health</h3>
          <p className="text-gray-600">
            Nutritious meals, healthcare support, and hygiene education to ensure 
            proper growth and development of every child.
          </p>
        </div>
      </div>
      
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 bg-[#50C779]/10 rounded-full flex items-center justify-center flex-shrink-0">
          <svg className="h-6 w-6 text-[#50C779]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Shelter & Security</h3>
          <p className="text-gray-600">
            Safe living environments and basic amenities for homeless and vulnerable 
            children, providing them with security and comfort.
          </p>
        </div>
      </div>
    </div>
    
   
    
  
    
    {/* Donate Button Section */}
    <div className="bg-gradient-to-r from-[#50C779]/10 to-white p-8 rounded-2xl border border-[#50C779]/20">
      <h3 className="text-2xl font-bold text-gray-800 mb-4 exo">Your Support Makes a Difference</h3>
      <p className="text-gray-600 mb-6">
        Every donation helps us provide education, nutrition, clothing, and shelter 
        to children in need. Join us in creating lasting change.
      </p>
      
      <div className="space-y-4">
        <button className="w-full bg-gradient-to-r from-[#50C779] to-[#3EAE66] hover:from-[#3EAE66] hover:to-[#50C779] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-3">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Donate Now
        </button>
        
       
      </div>
      
     
      
  
      
     
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
                  className="absolute top-0 left-0 w-full h-full border-0"
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