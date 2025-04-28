import React from 'react';
// import Navbar from './components/Navbar';
// import Hero from './components/Hero';
import './index.css';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Motivation from './components/Motivation.jsx';
import Prediction from './components/Prediction.jsx';
import PlantInfo from './components/PlantInfo.jsx';
import Footer from './components/Footer.jsx';

const App = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Motivation />
      <Prediction />
      <PlantInfo />
      <Footer />
    </div>
  );
};

export default App;
