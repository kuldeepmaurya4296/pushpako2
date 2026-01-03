'use client';
import { useState } from 'react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-[#060B18] text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'overview' ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-500 transition`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('fleet')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'fleet' ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-500 transition`}
          >
            Fleet Management
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'users' ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-500 transition`}
          >
            User Management
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'analytics' ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-500 transition`}
          >
            Analytics
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Total Aircraft</h3>
              <p className="text-3xl font-bold text-blue-400">24</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Active Flights</h3>
              <p className="text-3xl font-bold text-green-400">8</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Registered Users</h3>
              <p className="text-3xl font-bold text-yellow-400">1,234</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Revenue</h3>
              <p className="text-3xl font-bold text-purple-400">$45,678</p>
            </div>
          </div>
        )}

        {activeTab === 'fleet' && (
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Fleet Management</h2>
            <p className="text-gray-300">Manage your aircraft fleet here. Add, edit, or remove aircraft.</p>
            {/* Placeholder for fleet management interface */}
            <div className="mt-4">
              <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition">Add New Aircraft</button>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">User Management</h2>
            <p className="text-gray-300">Manage user accounts, permissions, and access.</p>
            {/* Placeholder for user management */}
            <div className="mt-4">
              <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition">Add New User</button>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Analytics</h2>
            <p className="text-gray-300">View detailed analytics and reports.</p>
            {/* Placeholder for analytics charts */}
            <div className="mt-4">
              <p className="text-gray-400">Charts and graphs will be displayed here.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}