import React, { useState, useEffect } from 'react';


import axios from 'axios';

const Profile = ({ user, onUpdateUser, onLogout }) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [photoFile, setPhotoFile] = useState(null); // for preview only
  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    // Do not clear photoFile here; only clear after successful photo upload
  }, [user]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  // const navigate = useNavigate(); // No longer needed

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
      if (photoFile instanceof File) {
        formData.append('photo', photoFile);
      }

      const response = await axios.put(
        'http://localhost:5000/api/auth/profile/photo',
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('Backend response after photo upload:', response.data);
      setSuccess('Photo updated successfully!');
      setError('');
      onUpdateUser(response.data.user);
      setIsEditingPhoto(false);
      setPhotoFile(null); // clear preview
    } catch (err) {
      console.error('Photo Update Error:', err);
      setError(err.response?.data?.message || 'Something went wrong');
      setSuccess('');
    }
  };

  const handlePhotoChange = (e) => {
    setPhotoFile(e.target.files[0]);
  };

  // Helper to get the correct photo URL
  const getPhotoUrl = () => {
    if (photoFile instanceof File) {
      return URL.createObjectURL(photoFile);
    }
    const userPhoto = user.photo;
    if (!userPhoto) {
      return 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name || 'User');
    }
    if (userPhoto.startsWith('http://') || userPhoto.startsWith('https://')) {
      return userPhoto;
    }
    return `http://localhost:5000/${userPhoto}`;
  };

  // Debug output (optional, can remove after confirming fix)
  useEffect(() => {
    console.log('Profile user.photo value:', user.photo);
    console.log('Profile computed photo URL:', getPhotoUrl());
    // getPhotoUrl is a stable function, so it's safe to ignore exhaustive-deps warning here
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.photo, photoFile]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-200 to-blue-200 flex items-center justify-center p-8">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-6xl">
        <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">Profile</h2>
        <p className="text-center text-gray-600 mb-8">Manage your profile information and photo below.</p>
        {success && <p className="text-green-500 mb-4 text-center">{success}</p>}
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Profile Update Section */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4 text-gray-700">Update Profile</h3>
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

          {/* Photo Update Section */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center">
            <h3 className="text-2xl font-semibold mb-4 text-gray-700">Profile Photo</h3>
            <img
              src={getPhotoUrl()}
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
        </div>
      </div>

    </div>
  );
};

export default Profile;


