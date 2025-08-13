import React, { useState } from 'react';
import plantData from '../assets/medicinal_info_V2.json';

// Heart icon SVG
const HeartIcon = ({ filled, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill={filled ? 'red' : 'none'}
    viewBox="0 0 24 24"
    stroke="currentColor"
    className={`w-7 h-7 transition-colors duration-200 ${filled ? 'text-red-500' : 'text-gray-400'} hover:scale-110`}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
    />
  </svg>
);

const PlantInfo = ({ favoritePlants = [], onToggleFavorite, isSignedIn }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const plantsPerPage = 8;
  const totalPages = Math.ceil(plantData.plants.length / plantsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const currentPlants = plantData.plants.slice(
    (currentPage - 1) * plantsPerPage,
    currentPage * plantsPerPage
  );

  const [selectedPlant, setSelectedPlant] = useState(null);

  return (
    <section id="plant-info-section" className="py-16 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">Plant Information</h2>
        <p className="text-lg text-gray-600 mb-12 text-center">
          Explore detailed information about Ethiopian medicinal plants. Click on "Read More" to learn more about each plant.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {currentPlants.map((plant, index) => {
            const isFavorite = favoritePlants.some(
              (fav) => fav["Scientific name"] === plant["Scientific name"]
            );
            return (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md relative group">
                <button
                  className="absolute top-4 right-4 z-10 focus:outline-none"
                  title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                  onClick={() => onToggleFavorite && onToggleFavorite(plant)}
                  disabled={!isSignedIn}
                >
                  <HeartIcon filled={isFavorite} />
                  {!isSignedIn && (
                    <span className="absolute left-1/2 -translate-x-1/2 mt-2 text-xs bg-white text-red-500 px-2 py-1 rounded shadow-lg border border-red-200">Sign in to favorite</span>
                  )}
                </button>
                <img
                  src={plant.image}
                  alt={plant["Scientific name"]}
                  className="w-full h-50 object-cover rounded-t-lg mb-4"
                  onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
                />
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {plant["Scientific name"]}
                </h3>
                <p className="text-gray-600 mb-2">
                  <strong>Local Name:</strong> {plant["Local name"]}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Habitat:</strong> {plant["Habitat"]}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Parts Used:</strong> {plant["Parts used"]}
                </p>
                <p className="text-gray-600 mb-2 truncate">
                  <strong>Medicinal Uses:</strong> {plant["Medicinal Use"]}
                </p>
                <button
                  onClick={() => setSelectedPlant(plant)}
                  className="mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
                >
                  Read More
                </button>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap justify-center items-center mt-8 gap-2 lg:gap-4 w-full">
          {currentPage > 1 && (
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-3 py-2 lg:px-6 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Previous
            </button>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-2 lg:px-4 rounded-lg ${
                page === currentPage
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            >
              {page}
            </button>
          ))}
          {currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-3 py-2 lg:px-6 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Next
            </button>
          )}
        </div>
      </div>

                  {/* Modal for Plant Details */}
        {selectedPlant && (
          <div
            className="fixed inset-0 bg-gray-900 bg- flex items-center justify-center z-50"
            onClick={() => setSelectedPlant(null)} // Close on clicking the background
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-2/4 lg:w-3/8 relative"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
              <button
                onClick={() => setSelectedPlant(null)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              >
                &times;
              </button>
              <img
                src={selectedPlant.image}
                alt={selectedPlant["Scientific name"]}
                className="w-full h-auto object-contain rounded-lg mb-4"
                onError={(e) => (e.target.src = 'https://via.placeholder.com/150')} // Fallback image
              />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {selectedPlant["Scientific name"]}
              </h3>
              <p className="text-gray-600 mb-2">
                <strong>Local Name:</strong> {selectedPlant["Local name"]}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Habitat:</strong> {selectedPlant["Habitat"]}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Parts Used:</strong> {selectedPlant["Parts used"]}
              </p>
              <p className="text-gray-600">
                <strong>Medicinal Uses:</strong> {selectedPlant["Medicinal Use"]}
              </p>
            </div>
          </div>
        )}
      
    </section>
  );
};

export default PlantInfo;