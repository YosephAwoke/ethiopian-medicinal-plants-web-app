import React, { useState } from 'react';
import axios from 'axios';

const Contributions = () => {
  const [contributions, setContributions] = useState([]);
  const [newContribution, setNewContribution] = useState('');
  const [error, setError] = useState('');

  const fetchContributions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/contributions', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setContributions(response.data);
    } catch (err) {
      console.error('Fetch Contributions Error:', err);
      setError('Failed to fetch contributions');
    }
  };

  const handleAddContribution = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/contributions', { content: newContribution }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setContributions([...contributions, response.data]);
      setNewContribution('');
      setError('');
    } catch (err) {
      console.error('Add Contribution Error:', err);
      setError('Failed to add contribution');
    }
  };

  React.useEffect(() => {
    fetchContributions();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">Your Contributions</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleAddContribution} className="mb-6">
          <textarea
            value={newContribution}
            onChange={(e) => setNewContribution(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 mb-4"
            placeholder="Add your contribution..."
          ></textarea>
          <button type="submit" className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition">Add Contribution</button>
        </form>
        <ul className="space-y-4">
          {contributions.map((contribution, index) => (
            <li key={index} className="p-4 bg-gray-100 rounded-lg shadow">
              {contribution.content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Contributions;