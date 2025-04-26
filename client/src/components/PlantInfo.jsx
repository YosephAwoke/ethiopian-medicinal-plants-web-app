import React, { useState } from 'react';
import plantData from '../assets/medicinal_info_V2.json';

const PlantInfo = () => {
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
          {currentPlants.map((plant, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <img
                src={plant.image}
                alt={plant["Scientific name"]}
                className="w-full h-40 object-cover rounded-t-lg mb-4"
                onError={(e) => (e.target.src = 'https://via.placeholder.com/150')} // Fallback image
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
              <button
                onClick={() => setSelectedPlant(plant)}
                className="mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
              >
                Read More
              </button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-8 space-x-4">
          {currentPage > 1 && (
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Previous
            </button>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded-lg ${
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
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Next
            </button>
          )}
        </div>

        {/* Modal for Plant Details */}
        {selectedPlant && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 relative">
              <button
                onClick={() => setSelectedPlant(null)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              >
                &times;
              </button>
              <img
                src={selectedPlant.image}
                alt={selectedPlant["Scientific name"]}
                className="w-full h-60 object-cover rounded-lg mb-4"
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
      </div>
    </section>
  );
};

export default PlantInfo;