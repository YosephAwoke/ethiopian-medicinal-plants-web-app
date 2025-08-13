import React from 'react';

const FavoritePlants = ({ favorites, onRemoveFavorite }) => {
  if (!favorites || favorites.length === 0) {
    return (
      <div className="text-center text-gray-500 py-12">
        <h2 className="text-2xl font-bold mb-4">No Favorite Plants Yet</h2>
        <p>Add plants to your favorites to see them here!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-blue-100 flex flex-col items-center p-8">
      <h2 className="text-4xl font-bold mb-8 text-gray-800">Your Favorite Plants</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
        {favorites.map((plant, idx) => (
          <div key={idx} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <img
              src={plant.image}
              alt={plant["Scientific name"]}
              className="w-full h-48 object-cover rounded-t-lg mb-4"
            />
            <h3 className="text-xl font-bold text-gray-800 mb-2">{plant["Scientific name"]}</h3>
            <p className="text-gray-600 mb-2"><strong>Local Name:</strong> {plant["Local name"]}</p>
            <button
              onClick={() => onRemoveFavorite(plant)}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritePlants;
