import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Profile from './Profile';

const Navbar = ({ isSignedIn, user, onLogout, favoriteCount = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [signedIn, setSignedIn] = useState(isSignedIn);
  const [currentUser, setCurrentUser] = useState(user);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentUser(user);
    setSignedIn(isSignedIn);
  }, [user, isSignedIn]);

  const closeModal = () => {
    setShowSignIn(false);
    setShowSignUp(false);
  };

  const handleSignInSuccess = (userObj) => {
    setSignedIn(true);
    setCurrentUser(userObj);
    localStorage.setItem('user', JSON.stringify(userObj));
    setShowSignIn(false);
  };

  const handleLogout = () => {
    setSignedIn(false);
    setCurrentUser({ name: '', email: '', photo: '' });
    localStorage.removeItem('user');
    if (onLogout) onLogout();
    navigate('/');
  };
  // Helper to get the correct photo URL
  const getPhotoUrl = () => {
    if (!currentUser || !currentUser.photo) {
      return 'https://via.placeholder.com/40';
    }
    if (currentUser.photo.startsWith('http://') || currentUser.photo.startsWith('https://')) {
      return currentUser.photo;
    }
    return `http://localhost:5000/${currentUser.photo.replace(/^\\?uploads\\?/, 'uploads/')}`;
  };

  return (
    <>
      <nav className="sticky top-0 bg-gradient-to-r from-green-600 to-green-800 text-white p-6 shadow-lg z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h2 className="text-3xl font-extrabold tracking-wide cursor-pointer hover:text-green-200 transition" onClick={() => {
            navigate('/');
            setIsOpen(false);
            setDropdownOpen(false);
            setTimeout(() => {
              const el = document.getElementById('home');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}>Ethiopian Medicinal Plants</h2>
          <div className="ml-40 hidden md:flex space-x-6">
            <button
              onClick={() => {
                navigate('/');
                setTimeout(() => {
                  const el = document.getElementById('home');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="px-8 py-2 font-bold rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-500 hover:to-green-400 transition-all"
            >
              Home
            </button>
            <button
              onClick={() => {
                navigate('/');
                setTimeout(() => {
                  const el = document.getElementById('prediction');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="px-4 py-2 font-bold rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-500 hover:to-green-400 transition-all"
            >
              Prediction
            </button>
            <button
              onClick={() => {
                navigate('/');
                setTimeout(() => {
                  const el = document.getElementById('plant-info-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="px-4 py-2 font-bold rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-500 hover:to-green-400 transition-all"
            >
              Plant Info
            </button>
            <button
              onClick={() => {
                navigate('/');
                setTimeout(() => {
                  const el = document.getElementById('contributions');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="px-4 py-2 font-bold rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-500 hover:to-green-400 transition-all"
            >
              Contributions
            </button>
            <button
              onClick={() => {
                navigate('/');
                setTimeout(() => {
                  const el = document.getElementById('about-us');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="px-4 py-2 font-bold rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-500 hover:to-green-400 transition-all"
            >
              About Us
            </button>
          </div>
          <div className="hidden md:flex items-center space-x-4 relative">
            {signedIn ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center px-4 py-2 font-bold rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 transition-all"
                >
                  <img
                    src={getPhotoUrl()}
                    alt="User"
                    className="mr-2 w-8 h-8 rounded-full object-cover border-2 border-white"
                  />
                  {currentUser && currentUser.name}
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-gradient-to-br from-blue-500 via-green-400 to-green-600 text-white rounded-2xl shadow-2xl border border-green-300 z-50 py-4 flex flex-col items-stretch transition-all duration-300">
                    <a
                      href="#"
                      onClick={() => {
                        setDropdownOpen(false);
                        navigate('/profile');
                      }}
                      className="block px-6 py-4 text-base font-semibold hover:bg-white/20 rounded-t-2xl transition-all duration-200 cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z' /></svg>
                        Edit Profile
                      </span>
                    </a>
                    <a
                      href="#"
                      onClick={() => {
                        setDropdownOpen(false);
                        navigate('/favorites');
                      }}
                      className="block px-6 py-4 text-base font-semibold hover:bg-white/20 transition-all duration-200 cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>
                        Favorites
                        {favoriteCount > 0 && (
                          <span className="ml-2 bg-white text-red-500 rounded-full px-2 py-0.5 text-xs font-bold">{favoriteCount}</span>
                        )}
                      </span>
                    </a>
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        handleLogout();
                      }}
                      className="block w-full text-left px-6 py-4 text-base font-semibold hover:bg-white/20 rounded-b-2xl transition-all duration-200 cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 16l4-4m0 0l-4-4m4 4H7' /></svg>
                        Logout
                      </span>
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
            <button onClick={() => {
              navigate('/');
              setIsOpen(false);
              setTimeout(() => {
                const el = document.getElementById('home');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }} className="block w-full text-left px-4 py-2 font-bold rounded-lg bg-gradient-to-r from-green-500 to-green-700 hover:from-green-400 hover:to-green-600 transition-all">Home</button>
            <button onClick={() => {
              navigate('/');
              setIsOpen(false);
              setTimeout(() => {
                const el = document.getElementById('prediction');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }} className="block w-full text-left px-4 py-2 font-bold rounded-lg bg-gradient-to-r from-green-500 to-green-700 hover:from-green-400 hover:to-green-600 transition-all">Prediction</button>
            <button onClick={() => {
              navigate('/');
              setIsOpen(false);
              setTimeout(() => {
                const el = document.getElementById('plant-info-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }} className="block w-full text-left px-4 py-2 font-bold rounded-lg bg-gradient-to-r from-green-500 to-green-700 hover:from-green-400 hover:to-green-600 transition-all">Plant Info</button>
            <button onClick={() => {
              navigate('/');
              setIsOpen(false);
              setTimeout(() => {
                const el = document.getElementById('contributions');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }} className="block w-full text-left px-4 py-2 font-bold rounded-lg bg-gradient-to-r from-green-500 to-green-700 hover:from-green-400 hover:to-green-600 transition-all">Contributions</button>
            <button onClick={() => {
              navigate('/');
              setIsOpen(false);
              setTimeout(() => {
                const el = document.getElementById('about-us');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }} className="block w-full text-left px-4 py-2 font-bold rounded-lg bg-gradient-to-r from-green-500 to-green-700 hover:from-green-400 hover:to-green-600 transition-all">About Us</button>
            {signedIn && (
              <>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/profile');
                  }}
                  className="block w-full text-left px-4 py-2 font-bold rounded-lg bg-gradient-to-r from-green-500 to-green-700 hover:from-green-400 hover:to-green-600 transition-all"
                >
                  Profile
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/favorites');
                  }}
                  className="block w-full text-left px-4 py-2 font-bold rounded-lg bg-gradient-to-r from-pink-400 to-red-500 hover:from-pink-300 hover:to-red-400 transition-all flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>
                  Favorites
                  {favoriteCount > 0 && (
                    <span className="ml-2 bg-white text-red-500 rounded-full px-2 py-0.5 text-xs font-bold">{favoriteCount}</span>
                  )}
                </button>
              </>
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
