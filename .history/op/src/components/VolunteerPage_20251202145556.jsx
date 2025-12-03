import React from "react";

const VolunteerPage = () => {
  const volunteers = [
    {
      id: 1,
      name: "Sapna Sharma",
      image: "/images/vo1.jpg",
      role: "Education Volunteer",
      description: "5+ years experience in child education"
    },
    {
      id: 2,
      name: "Rinki Sharma",
      image: "/images/vo2.jpg",
      role: "Field Operations",
      description: "8+ years in community development"
    },
    {
      id: 3,
      name: "Sanjana Yadav",
      image: "/images/vo3.jpg",
      role: "Nutrition Specialist",
      description: "Nutritionist with 6+ years experience"
    },
    {
      id: 4,
      name: "Ravi Sharma",
      image: "/images/vo4.png",
      role: "Healthcare Volunteer",
      description: "Medical professional with 5+ years experience"
    }
  ];

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-8 exo">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-block bg-[#50C779]/10 text-[#50C779] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Our Dedicated Team
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 md:mb-6 exo">
            Meet Our <span className="text-[#50C779]">Volunteers</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Passionate individuals committed to making a difference
          </p>
        </div>

        {/* Circular Volunteers Grid - Mobile: 2 columns, Laptop: 4 columns */}
        <div className="grid grid-cols-2 lg:grid-cols-4 justify-items-center gap-6 md:gap-8 lg:gap-10 xl:gap-12 mb-16 md:mb-20">
          {volunteers.map((volunteer, index) => (
            <div key={volunteer.id} className="group text-center">
              {/* Circular Container */}
              <div className="relative mb-4 md:mb-6">
                {/* Outer Glow - Visible on hover for desktop */}
                <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#50C779] to-[#3EAE66] rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-all duration-700 scale-0 group-hover:scale-110"></div>
                
                {/* Main Circle - Responsive sizing */}
                <div className="relative h-32 w-32 sm:h-36 sm:w-36 md:h-40 md:w-40 lg:h-44 lg:w-44 xl:h-48 xl:w-48 rounded-full overflow-hidden border-4 border-white shadow-lg md:shadow-xl group-hover:border-[#50C779] transition-all duration-300">
                  <img 
                    src={volunteer.image} 
                    alt={volunteer.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Overlay on Hover - Desktop only */}
                  <div className="hidden lg:block absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <div className="transform translate-y-8 group-hover:translate-y-30 transition-transform duration-300">
                      <div className="text-white text-sm xl:text-base font-bold">{volunteer.name}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Text Below Circle */}
              <div className="max-w-full mx-auto px-1">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-1 group-hover:text-[#50C779] transition-colors duration-300">
                  {volunteer.name}
                </h3>
                
              </div>
            </div>
          ))}
        </div>

        {/* Join Us CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-[#50C779]/10 to-white rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 max-w-4xl mx-auto border border-gray-100">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 md:mb-6 exo">
              Ready to Make a Difference?
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto">
              Join our team of dedicated volunteers and help transform lives
            </p>
            <button className="bg-gradient-to-r from-[#50C779] to-[#3EAE66] hover:from-[#3EAE66] hover:to-[#50C779] text-white px-6 md:px-8 lg:px-10 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold text-base md:text-lg lg:text-xl transition-all duration-300 shadow-lg md:shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5">
              Join as Volunteer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerPage;