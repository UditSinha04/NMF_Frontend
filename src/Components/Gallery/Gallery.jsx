import React, { useEffect, useState } from 'react';

export default function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/gallery')
      .then(res => res.json())
      .then(data => setImages(data))
      .catch(() => setImages([]));
  }, []);

  return (
    <div className="min-h-screen bg-[#f6f6e9] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Our Events Gallery</h2>
        <p className="text-gray-700 text-center mb-10 max-w-2xl mx-auto">
          Explore moments from our recent charity events, community outreach, and volunteer activities. Each picture tells a story of hope, compassion, and positive change made possible by our supporters and volunteers.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {images.map((src, idx) => (
            <div key={idx} className="rounded-lg overflow-hidden shadow hover:shadow-lg transition">
              <img
                src={src}
                alt={`Event ${idx + 1}`}
                className="w-full h-56 object-cover"
              />
            </div>
          ))}
        </div>
        {images.length === 0 && (
          <div className="text-center text-gray-500 mt-8">No images found.</div>
        )}
      </div>
    </div>
  );
}