import React, { useState } from 'react';
import axios from 'axios';

const SignUp = ({ onSwitchToSignIn }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', { name, email, password });
      console.log('Sign Up Successful:', response.data);
      alert('Account created successfully! Please sign in.');
      onSwitchToSignIn();
    } catch (err) {
      console.error('Sign Up Error:', err);
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">Create Account</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
          <button type="submit" className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition">Create Account</button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Already have an account? <span onClick={onSwitchToSignIn} className="text-green-600 font-semibold cursor-pointer hover:underline">Sign In</span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;