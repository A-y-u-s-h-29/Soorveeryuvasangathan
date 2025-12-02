import React from "react";

const VolunteerPage = () => {
  const volunteers = [
    {
      id: 1,
      name: "Anjali Sharma",
      image: "/images/volunteer1.jpg",
      role: "Education Volunteer",
      description: "5+ years experience in child education"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      image: "/images/volunteer2.jpg",
      role: "Field Operations",
      description: "8+ years in community development"
    },
    {
      id: 3,
      name: "Priya Patel",
      image: "/images/volunteer3.jpg",
      role: "Nutrition Specialist",
      description: "Nutritionist with 6+ years experience"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6 exo">
            Meet Our <span className="text-[#50C779]">Volunteers</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dedicated individuals who selflessly contribute their time and skills to make a difference
          </p>
        </div>

        {/* Volunteer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {volunteers.map((volunteer) => (
            <div key={volunteer.id} className="group">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                {/* Image Container */}
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={volunteer.image} 
                    alt={volunteer.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Name Badge */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 transform translate-y-10 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-2xl font-bold text-white mb-2">{volunteer.name}</h3>
                    <p className="text-[#50C779] font-medium">{volunteer.role}</p>
                  </div>
                </div>
                
                {/* Content - Always Visible */}
                <div className="p-6">
                  <p className="text-gray-600 text-sm">{volunteer.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Join Us Section */}
        <div className="bg-gradient-to-r from-[#50C779] to-[#3EAE66] rounded-3xl p-12 text-center text-white shadow-xl">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 exo">
            Join Our Volunteer Team
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Make a difference in the lives of underprivileged children and youth
          </p>
          <button className="bg-white hover:bg-gray-100 text-[#50C779] px-10 py-4 rounded-2xl font-bold text-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            Become a Volunteer
          </button>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
            <div className="text-5xl font-bold text-[#50C779] mb-4">150+</div>
            <div className="text-xl text-gray-800 font-semibold">Active Volunteers</div>
          </div>
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
            <div className="text-5xl font-bold text-[#50C779] mb-4">5,000+</div>
            <div className="text-xl text-gray-800 font-semibold">Hours Contributed</div>
          </div>
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
            <div className="text-5xl font-bold text-[#50C779] mb-4">50+</div>
            <div className="text-xl text-gray-800 font-semibold">Communities Served</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerPage;