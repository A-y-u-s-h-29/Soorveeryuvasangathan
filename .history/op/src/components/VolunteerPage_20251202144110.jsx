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
    }
  ];

  return (
    <div className="min-h-screen bg-white  px-4 sm:px-6 lg:px-8 exo">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block bg-[#50C779]/10 text-[#50C779] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Our Dedicated Team
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6 exo">
            Meet Our <span className="text-[#50C779]">Volunteers</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Passionate individuals committed to making a difference
          </p>
        </div>

        {/* Circular Volunteers Grid */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-16 lg:gap-24 mb-20">
          {volunteers.map((volunteer, index) => (
            <div key={volunteer.id} className="group text-center">
              {/* Circular Container */}
              <div className="relative mb-8">
                {/* Outer Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#50C779] to-[#3EAE66] rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-all duration-700 scale-0 group-hover:scale-110"></div>
                
                {/* Main Circle */}
                <div className="relative h-60 w-60 lg:h-72 lg:w-72 rounded-full overflow-hidden border-8 border-white shadow-2xl group-hover:border-[#50C779] transition-all duration-500">
                  <img 
                    src={volunteer.image} 
                    alt={volunteer.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                    <div className="transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="text-white text-2xl font-bold mb-2">{volunteer.name}</div>
                     
                    </div>
                  </div>
                </div>
                
                {/* Number Badge */}
                
              </div>
              
              {/* Text Below Circle */}
              <div className="max-w-xs mx-auto">
                <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-[#50C779] transition-colors duration-300">
                  {volunteer.name}
                </h3>
                
              </div>
            </div>
          ))}
        </div>

       

        {/* Join Us CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-[#50C779]/10 to-white rounded-3xl p-12 max-w-4xl mx-auto border border-gray-100">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6 exo">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Join our team of dedicated volunteers and help transform lives
            </p>
            <button className="bg-gradient-to-r from-[#50C779] to-[#3EAE66] hover:from-[#3EAE66] hover:to-[#50C779] text-white px-12 py-4 rounded-2xl font-bold text-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
              Join as Volunteer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerPage;