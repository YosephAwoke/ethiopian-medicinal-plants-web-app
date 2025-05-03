import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = ({ user, onUpdateUser }) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(user.photo || '');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        'http://localhost:5000/api/auth/profile',
        { name, email, password },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setSuccess('Profile updated successfully!');
      setError('');
      onUpdateUser(response.data.user);
      setIsEditingProfile(false);
    } catch (err) {
      console.error('Profile Update Error:', err);
      setError(err.response?.data?.message || 'Something went wrong');
      setSuccess('');
    }
  };

  const handlePhotoUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (photo instanceof File) {
        formData.append('photo', photo);
      }

      const response = await axios.put(
        'http://localhost:5000/api/auth/profile',
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setSuccess('Photo updated successfully!');
      setError('');
      onUpdateUser(response.data.user);
      setIsEditingPhoto(false);
    } catch (err) {
      console.error('Photo Update Error:', err);
      setError(err.response?.data?.message || 'Something went wrong');
      setSuccess('');
    }
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-blue-100 flex flex-col items-center p-8">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl">
        <h2 className="text-3xl font-bold mb-6 text-center">Profile</h2>
        <p className="text-center text-gray-600 mb-8">Welcome to your profile page. Here you can view and update your personal information.</p>
        {success && <p className="text-green-500 mb-4 text-center">{success}</p>}
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="flex flex-col items-center">
            <img
              src={photo instanceof File ? URL.createObjectURL(photo) : photo || 'https://via.placeholder.com/150'}
              alt="User"
              className="w-40 h-40 rounded-full object-cover mb-4 border-2 border-gray-300"
            />
            {isEditingPhoto ? (
              <form onSubmit={handlePhotoUpdate} className="text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="text-sm text-gray-600 mb-4"
                />
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Save Photo
                </button>
                <button
                  onClick={() => setIsEditingPhoto(false)}
                  type="button"
                  className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <button
                onClick={() => setIsEditingPhoto(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Change Photo
              </button>
            )}
          </div>
          <div className="flex-1">
            {!isEditingProfile ? (
              <div>
                <p className="mb-4"><strong>Full Name:</strong> {name}</p>
                <p className="mb-4"><strong>Email:</strong> {email}</p>
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Edit Profile
                </button>
              </div>
            ) : (
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditingProfile(false)}
                  type="button"
                  className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;


