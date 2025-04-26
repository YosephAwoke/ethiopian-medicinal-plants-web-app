import React, { useState } from 'react';
import axios from 'axios';
import { FaImage } from 'react-icons/fa';

const Prediction = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handlePrediction = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('file', selectedImage);

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/upload-image', formData);
      setPredictionResult(response.data);
    } catch (error) {
      console.error('Error during prediction:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSelectedImage(null);
    setPredictionResult(null);
  };

  return (
    <section id="prediction" className="py-16 bg-gray-800 text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center mb-6">Plant Prediction</h2>
        <p className="text-sm lg:text-lg text-center mb-12">
          This project is built on a unique dataset of 24,000 images of Ethiopian traditional medicinal plants, meticulously collected specifically for this research. Prior to this, no image-based dataset of Ethiopian medicinal plants existed, making this a groundbreaking contribution. The dataset spans 64 distinct classes and has been instrumental in training a deep learning model with an impressive accuracy of 97.6%. Leveraging transfer learning with the Inception ResNetV2 architecture, this work significantly advances the Ethiopian scientific research community and provides valuable insights for the people.
        </p>

        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Upload Section */}
          <div
            className="w-full lg:w-1/2 border-3 border-dashed border-gray-500 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-700 relative"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            style={{ height: 'calc(100% + 50px)' }}
          >
            {selectedImage ? (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected Plant"
                className="w-full h-full object-contain rounded-lg"
              />
            ) : (
              <div className="text-center items-center justify-center h-full flex flex-col">
                <FaImage className="text-blue-300 text-6xl mb-4 text-center " />
                <p className="text-gray-300">Drag and drop an image here</p>
                <p className="text-gray-300">or</p>
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer text-green-400 font-semibold hover:underline"
                >
                  Browse Files
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
            )}
          </div>

          {/* Prediction Button and Result */}
          <div className="w-full lg:w-1/2">
            <button
              onClick={handlePrediction}
              className="w-full bg-green-700 text-white py-3 px-6 rounded-lg text-xl font-bold hover:bg-green-600 transition mb-4"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Identify Plant'}
            </button> 
            <button
              onClick={handleClear}
              className="w-full bg-red-700 text-white py-3 px-6 rounded-lg text-xl font-bold hover:bg-red-500 transition"
            >
              Clear
            </button>

            {predictionResult && (
              <div className="mt-8 bg-gray-900 p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-green-400 mb-4">Prediction Result</h3>
                <p className="text-lg text-gray-300 mb-2">
                  <strong className="text-white">Scientific Name:</strong> {predictionResult.predicted_class}
                </p>
                {predictionResult.medicinal_info && (
                  <div>
                    <p className="text-lg text-gray-300 mb-2">
                      <strong className="text-white">Local Name:</strong> {predictionResult.medicinal_info.local_name}
                    </p>
                    <p className="text-lg text-gray-300 mb-2">
                      <strong className="text-white">Habitat:</strong> {predictionResult.medicinal_info.habitat}
                    </p>
                    <p className="text-lg text-gray-300 mb-2">
                      <strong className="text-white">Parts Used:</strong> {predictionResult.medicinal_info.parts_used}
                    </p>
                    <p className="text-lg text-gray-300">
                      <strong className="text-white">Medicinal Uses:</strong> {predictionResult.medicinal_info.medicinal_uses}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Prediction;