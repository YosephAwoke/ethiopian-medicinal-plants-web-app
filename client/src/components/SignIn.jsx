import React, { useState } from 'react';

const SignIn = ({ onSwitchToSignUp }) => {
  return (
    <div className=" ">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md ">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">Sign In</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
            <input type="email" id="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600" />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
            <input type="password" id="password" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600" />
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