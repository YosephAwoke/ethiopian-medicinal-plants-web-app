import React, { useState } from 'react';
import axios from 'axios';

const SignIn = ({ onSwitchToSignUp, onSignInSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signin', { email, password });
      console.log('Sign In Successful:', response.data);
      localStorage.setItem('token', response.data.token);
      setSuccess('Sign In Successful!');
      setError('');
      setTimeout(() => {
        onSignInSuccess(response.data.user); // Notify parent component of successful sign-in
      }, 1500);
    } catch (err) {
      console.error('Sign In Error:', err);
      setError(err.response?.data?.message || 'Something went wrong');
      setSuccess('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">Sign In</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}
        <form onSubmit={handleSignIn}>
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
          <button type="submit" className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition">Sign In</button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account? <span onClick={onSwitchToSignUp} className="text-green-600 font-semibold cursor-pointer hover:underline">Create one</span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;