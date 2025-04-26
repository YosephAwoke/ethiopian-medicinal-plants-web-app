import React, { useEffect, useState } from 'react';

const Hero = () => {
  const images = [
    '/img/EtCoffee.jpg',
    '/img/nigella-sativa.jpg',
    '/img/AloeMonticola.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Slower transition (5 seconds)
    return () => clearInterval(interval);
  }, [images.length]);

  const scrollToMotivation = () => {
    const motivationSection = document.getElementById('motivation-section');
    if (motivationSection) {
      motivationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen bg-gray-900 flex flex-col items-center justify-center text-center">
      {/* Background Image Section */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-1000 flex"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="w-full h-full flex-shrink-0"
              style={{ width: '100%' }}
            >
              <img
                src={image}
                alt={`Plant ${index + 1}`}
                className="w-full h-full object-cover"
                style={{
                  filter: 'brightness(0.8)', // Darken the image slightly
                }}
              />
            </div>
          ))}
        </div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-transparent to-gray-900"></div>
      </div>

      {/* Text Section */}
        <div className="relative z-10 max-w-4xl px-6">
          <h1 className="text-4xl md:text-7xl font-extrabold text-white text-center leading-tight mb-6 text-shadow-lg">
            Explore Ethiopian Traditional Medicinal Plants with AI
          </h1>
          <p className="text-sm md:text-xl text-gray-200 mb-6 text-bold font-semibold text-center">
            Dive into the rich heritage of Ethiopian traditional medicine. Discover plants that have been used for generations to heal and nurture, and leverage our AI-powered model to identify medicinal plants from uploaded images. Learn their local names, habitats, medicinal uses, and more. Contribute your knowledge and be part of preserving this invaluable tradition.
          </p>
          <button 
            onClick={scrollToMotivation} 
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
          >
            Get Started
          </button>
        </div>

        {/* Manual Scroll Buttons */}
      <div className="absolute bottom-28 flex space-x-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-4 h-4 rounded-full ${
              currentIndex === index
                ? 'bg-green-600'
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default Hero;
