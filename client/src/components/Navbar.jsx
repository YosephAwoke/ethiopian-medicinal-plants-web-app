import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-green-600 to-green-800 text-white p-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-3xl font-extrabold tracking-wide">Ethiopian Medicinal Plants

        </div>
        <div className="ml-40 hidden md:flex space-x-6">
          <a
            href="#home"
            className="px-8 py-2 font-bold rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-500 hover:to-green-400 transition-all"
          >
            Home
          </a>
          <a
            href="#prediction"
            className="px-4 py-2 font-bold rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-500 hover:to-green-400 transition-all"
          >
            Prediction
          </a>
          <a
            href="#plant-info"
            className="px-4 py-2 font-bold rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-500 hover:to-green-400 transition-all"
          >
            Plant Info
          </a>
          <a
            href="#contributions"
            className="px-4 py-2 font-bold rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-500 hover:to-green-400 transition-all"
          >
            Contributions
          </a>
          <a
            href="#about-us"
            className="px-4 py-2 font-bold rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-500 hover:to-green-400 transition-all"
          >
            About Us
          </a>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <button className="flex items-center px-4 py-2 font-bold rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 transition-all">
            <FaUserCircle className="mr-2" />
            Sign In
          </button>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-green-700 p-4 space-y-2">
          <a href="#home" className="block px-4 py-2 font-bold rounded-lg bg-gradient-to-r from-green-500 to-green-700 hover:from-green-400 hover:to-green-600 transition-all">
            Home
          </a>
          <a href="#prediction" className="block px-4 py-2 font-bold rounded-lg bg-gradient-to-r from-green-500 to-green-700 hover:from-green-400 hover:to-green-600 transition-all">
            Prediction
          </a>
          <a href="#plant-info" className="block px-4 py-2 font-bold rounded-lg bg-gradient-to-r from-green-500 to-green-700 hover:from-green-400 hover:to-green-600 transition-all">
            Plant Info
          </a>
          <a href="#contributions" className="block px-4 py-2 font-bold rounded-lg bg-gradient-to-r from-green-500 to-green-700 hover:from-green-400 hover:to-green-600 transition-all">
            Contributions
          </a>
          <a href="#about-us" className="block px-4 py-2 font-bold rounded-lg bg-gradient-to-r from-green-500 to-green-700 hover:from-green-400 hover:to-green-600 transition-all">
            About Us
          </a>
          <button className="flex items-center w-full px-4 py-2 font-bold rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 transition-all">
            <FaUserCircle className="mr-2" />
            Sign In
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;