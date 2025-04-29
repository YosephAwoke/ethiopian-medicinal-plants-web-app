import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Motivation from './components/Motivation.jsx';
import Prediction from './components/Prediction.jsx';
import PlantInfo from './components/PlantInfo.jsx';
import Footer from './components/Footer.jsx';
import SignIn from './components/SignIn.jsx';
import SignUp from './components/SignUp.jsx';

const App = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const closeModal = () => {
    setShowSignIn(false);
    setShowSignUp(false);
  };

  return (
    <div>
      <Navbar onSignInClick={() => setShowSignIn(true)} onSignUpClick={() => setShowSignUp(true)} />
      <Hero />
      <Motivation />
      <Prediction />
      <PlantInfo />
      <Footer />

      {showSignIn && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={closeModal}>
          <div className="bg-white p-4 rounded-lg shadow-md w-11/12 max-w-md relative" style={{ maxHeight: '90vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
            <SignIn onSwitchToSignUp={() => { setShowSignIn(false); setShowSignUp(true); }} />
          </div>
        </div>
      )}

      {showSignUp && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={closeModal}>
          <div className="bg-white p-4 rounded-lg shadow-md w-11/12 max-w-md relative" style={{ maxHeight: '80vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
            <SignUp onSwitchToSignIn={() => { setShowSignUp(false); setShowSignIn(true); }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
