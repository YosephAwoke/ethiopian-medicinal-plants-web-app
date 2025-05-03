import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Profile from './Profile';

const Navbar = ({ isSignedIn, userName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [signedIn, setSignedIn] = useState(isSignedIn);
  const [currentUserName, setCurrentUserName] = useState(userName);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setSignedIn(true);
      setCurrentUserName(user.name);
    }
  }, []);

  const closeModal = () => {
    setShowSignIn(false);
    setShowSignUp(false);
  };

  const handleSignInSuccess = (user) => {
    setSignedIn(true);
    setCurrentUserName(user.name);
    localStorage.setItem('user', JSON.stringify(user));
    setShowSignIn(false);
  };

  const handleLogout = () => {
    setSignedIn(false);
    setCurrentUserName('');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <>
      <nav className="sticky top-0 bg-gradient-to-r from-green-600 to-green-800 text-white p-6 shadow-lg z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h2 className="text-3xl font-extrabold tracking-wide cursor-pointer hover:text-green-200 transition" onClick={() => window.location.href = '#home'}>Ethiopian Medicinal Plants</h2>
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
              href="#plant-info-section"
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
          <div className="hidden md:flex items-center space-x-4 relative">
            {signedIn ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center px-4 py-2 font-bold rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 transition-all"
                >
                  <FaUserCircle className="mr-2" />
                  {currentUserName}
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white text-black rounded-lg shadow-lg border border-gray-200 z-50">
                    <a
                      href="#"
                      onClick={() => {
                        setDropdownOpen(false);
                        navigate('/profile');
                      }}
                      className="block px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded-t-lg"
                    >
                      Edit Profile
                    </a>
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        handleLogout();
                      }}
                      className="block w-full text-left px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded-b-lg"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowSignIn(true)}
                className="flex items-center px-4 py-2 font-bold rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 transition-all"
              >
                <FaUserCircle className="mr-2" />
                Sign In
              </button>
            )}
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
            {signedIn && (
              <a
                href="#profile"
                className="block px-4 py-2 font-bold rounded-lg bg-gradient-to-r from-green-500 to-green-700 hover:from-green-400 hover:to-green-600 transition-all"
              >
                Profile
              </a>
            )}
            {!signedIn && (
              <button
                onClick={() => setShowSignIn(true)}
                className="flex items-center w-full px-4 py-2 font-bold rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 transition-all"
              >
                <FaUserCircle className="mr-2" />
                Sign In
              </button>
            )}
          </div>
        )}
      </nav>

      {showSignIn && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-8 rounded-lg shadow-md w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <SignIn
              onSwitchToSignUp={() => {
                setShowSignIn(false);
                setShowSignUp(true);
              }}
              onSignInSuccess={handleSignInSuccess}
            />
          </div>
        </div>
      )}

      {showSignUp && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-8 rounded-lg shadow-md w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <SignUp
              onSwitchToSignIn={() => {
                setShowSignUp(false);
                setShowSignIn(true);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
