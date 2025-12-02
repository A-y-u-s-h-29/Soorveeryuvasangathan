import React from "react";

const cards = [
  {
    id: 1,
    img: "/images/main.avif",
    title: "Medical Support",
    text: "Providing medical aid and health education to communities in need.",
  },
  {
    id: 2,
    img: "/images/child.avif",
    title: "Nutrition & Food",
    text: "Helping supply nutritious meals and food programs for children.",
  },
  {
    id: 3,
    img: "/images/do.avif",
    title: "Safe Shelter",
    text: "Building safe homes and providing essentials for families.",
  },
];

function Care() {
  return (
    <div className="py-12 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-semibold exo text-gray-900 mb-8">
         We provide care & love
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-gray-50 rounded-lg shadow-sm overflow-hidden"
            >
              <div className="h-48 w-full bg-gray-200 flex items-center justify-center">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {card.title}
                </h3>
                <p className="text-gray-600">{card.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Care;
