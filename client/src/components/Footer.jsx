import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Title and Navigation Links */}
          <div className="flex flex-col md:flex-row items-center w-full justify-between">
            <div className="flex flex-col items-center md:items-start">
              <h2
                className="text-3xl font-extrabold text-green-400 cursor-pointer hover:text-green-500 transition"
                onClick={() => (window.location.href = '#home')}
              >
                Ethiopian Medicinal Plants
              </h2>
            </div>
            <nav className="flex flex-wrap justify-center md:justify-end space-x-6 mt-4 md:mt-0">
              <a href="#home" className="hover:text-green-400 transition font-bold text-lg">
                Home
              </a>
              <a href="#prediction" className="hover:text-green-400 transition font-bold text-lg">
                Prediction
              </a>
              <a href="#plant-info-section" className="hover:text-green-400 transition font-bold text-lg">
                Plant Info
              </a>
              <a href="#contributions" className="hover:text-green-400 transition font-bold text-lg">
                Contributions
              </a>
              <a href="#about-us" className="hover:text-green-400 transition font-bold text-lg">
                About Us
              </a>
            </nav>
          </div>
        </div>

        {/* Description and Social Icons */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6">
          <p className="text-center md:text-left text-gray-300 max-w-md">
            Discover the rich heritage of Ethiopian medicinal plants. This platform provides insights into their uses, benefits, and predictions for a healthier future. We hope you enjoy exploring and learning!
          </p>
          <div className="flex justify-center md:justify-start space-x-6 mt-4 md:mt-0">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-green-400 transition"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-green-400 transition"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-green-400 transition"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 text-center border-t border-green-700 pt-6">
          <p className="text-sm md:text-base">
            &copy; 2025 All rights reserved. Developed by{' '}
            <span className="font-bold text-green-400">Yoseph Awoke</span>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;