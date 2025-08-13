import React, { useState } from 'react';

const SubscribeCard = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    // Simple email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    setError('');
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    // Save to localStorage for demo; in production, send to backend
    let subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
    if (subscribers.includes(email)) {
      setError('You have already subscribed!');
      return;
    }
    subscribers.push(email);
    localStorage.setItem('subscribers', JSON.stringify(subscribers));
    setSubscribed(true);
  };

  return (
    <div className="max-w-md mx-auto mt-12 mb-16 px-8 py-8 bg-gradient-to-br from-green-400/80 via-green-200/70 to-white/80 rounded-3xl shadow-2xl backdrop-blur-md border border-green-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Subscribe for Updates</h2>
      <p className="text-gray-600 mb-6 text-center">Get the latest news and updates about Ethiopian medicinal plants straight to your inbox.</p>
      {subscribed ? (
        <div className="flex flex-col items-center">
          <div className="text-green-600 text-4xl mb-2">✓</div>
          <div className="text-lg font-semibold text-green-700 mb-2">Thank you for subscribing!</div>
          <div className="text-gray-500 text-sm">We'll keep you updated with the latest info.</div>
        </div>
      ) : (
        <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
          <input
            type="email"
            className="rounded-lg px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white/80 placeholder-gray-400 text-gray-800 shadow-sm"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <button
            type="submit"
            className="bg-gradient-to-r from-green-500 via-green-400 to-green-300 text-white font-semibold py-3 rounded-lg shadow-lg hover:from-green-600 hover:to-green-400 transition-all duration-200"
          >
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
};

export default SubscribeCard;
