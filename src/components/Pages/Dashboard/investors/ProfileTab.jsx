'use client';
import { useState } from 'react';

export default function ProfileTab({ investor, isEditing: initialEditing }) {
  const [profile, setProfile] = useState({
    name: investor.name,
    email: investor.email,
  });
  const [isEditing, setIsEditing] = useState(initialEditing || false);

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Investor Profile</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          {isEditing ? (
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg text-white"
            />
          ) : (
            <p className="text-gray-300">{profile.name}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          {isEditing ? (
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg text-white"
            />
          ) : (
            <p className="text-gray-300">{profile.email}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Investment Amount</label>
          <p className="text-gray-300">${investor.investmentAmount.toLocaleString()}</p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Join Date</label>
          <p className="text-gray-300">{investor.joinDate}</p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
          {isEditing && (
            <button
              onClick={() => {
                // In a real app, save to backend
                setIsEditing(false);
                alert('Profile updated (static for now)');
              }}
              className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
}