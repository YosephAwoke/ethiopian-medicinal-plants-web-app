import React, { useState, useEffect } from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Motivation from './components/Motivation.jsx';
import Prediction from './components/Prediction.jsx';
import PlantInfo from './components/PlantInfo.jsx';
import SubscribeCard from './components/SubscribeCard.jsx';
import Footer from './components/Footer.jsx';
import SignIn from './components/SignIn.jsx';
import SignUp from './components/SignUp.jsx';
import Profile from './components/Profile.jsx';
import FavoritePlants from './components/FavoritePlants.jsx';

const App = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState({ name: '', email: '' });
  const navigate = useNavigate();
  // Favorite plants state (persisted in localStorage)
  const [favoritePlants, setFavoritePlants] = useState(() => {
    const stored = localStorage.getItem('favoritePlants');
    return stored ? JSON.parse(stored) : [];
  });

  // Add or remove favorite
  const handleToggleFavorite = (plant) => {
    if (!isSignedIn) {
      setShowSignIn(true);
      return;
    }
    const exists = favoritePlants.some((fav) => fav["Scientific name"] === plant["Scientific name"]);
    let updated;
    if (exists) {
      updated = favoritePlants.filter((fav) => fav["Scientific name"] !== plant["Scientific name"]);
    } else {
      updated = [...favoritePlants, plant];
    }
    setFavoritePlants(updated);
    localStorage.setItem('favoritePlants', JSON.stringify(updated));
  };

  const handleRemoveFavorite = (plant) => {
    const updated = favoritePlants.filter((fav) => fav["Scientific name"] !== plant["Scientific name"]);
    setFavoritePlants(updated);
    localStorage.setItem('favoritePlants', JSON.stringify(updated));
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsSignedIn(true);
      setUserName(parsedUser.name);
    }
  }, []);

  const handleSignInSuccess = (user) => {
    setIsSignedIn(true);
    setUserName(user.name);
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    setShowSignIn(false);
  };

  const handleUserUpdate = (updatedUser) => {
    const mergedUser = { ...user, ...updatedUser };
    setUser(mergedUser);
    setUserName(mergedUser.name);
    localStorage.setItem('user', JSON.stringify(mergedUser));
  };

  const handleLogout = () => {
    setIsSignedIn(false);
    setUserName('');
    setUser({ name: '', email: '' });
    localStorage.removeItem('user');
    navigate('/');
  };

  const closeModal = () => {
    setShowSignIn(false);
    setShowSignUp(false);
  };

  return (
    <div>
      <Navbar
        onSignInClick={() => setShowSignIn(true)}
        isSignedIn={isSignedIn}
        user={user}
        onLogout={handleLogout}
        favoriteCount={favoritePlants.length}
      />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Motivation />
              <Prediction />
              <PlantInfo
                favoritePlants={favoritePlants}
                onToggleFavorite={handleToggleFavorite}
                isSignedIn={isSignedIn}
              />
              <SubscribeCard />
              <Footer />
            </>
          }
        />
        <Route path="/profile" element={<Profile user={user} onUpdateUser={handleUserUpdate} />} />
        <Route path="/favorites" element={<FavoritePlants favorites={favoritePlants} onRemoveFavorite={handleRemoveFavorite} />} />
      </Routes>

      {showSignIn && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-4 rounded-lg shadow-md w-11/12 max-w-md relative"
            style={{ maxHeight: '90vh', overflowY: 'auto' }}
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
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-4 rounded-lg shadow-md w-11/12 max-w-md relative"
            style={{ maxHeight: '80vh', overflowY: 'auto' }}
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
    </div>
  );
};

export default App;
