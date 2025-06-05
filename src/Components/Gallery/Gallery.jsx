import React from 'react'

const galleryImages = [
  "/Images/IMG_01.jpeg",
  "/Images/IMG_02.jpeg",
  "/Images/IMG_03.jpeg",
  "/Images/IMG_04.jpeg",
  "/Images/IMG_05.jpeg",
  "/Images/IMG_06.jpeg"
];

export default function Gallery() {
  return (
    <div className="min-h-screen bg-[#f6f6e9] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Our Events Gallery</h2>
        <p className="text-gray-700 text-center mb-10 max-w-2xl mx-auto">
          Explore moments from our recent charity events, community outreach, and volunteer activities. Each picture tells a story of hope, compassion, and positive change made possible by our supporters and volunteers.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {galleryImages.map((src, idx) => (
            <div key={idx} className="rounded-lg overflow-hidden shadow hover:shadow-lg transition">
              <img
                src={src}
                alt={`Event ${idx + 1}`}
                className="w-full h-56 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}