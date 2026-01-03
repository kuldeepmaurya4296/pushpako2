'use client';
import { useState } from 'react';
import { mockBlogs } from '@/lib/mockBlogs';
import Link from 'next/link';
import { Edit, Eye, Trash2, Plus } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-[#060B18] text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 md:gap-4 mb-8">
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
            onClick={() => setActiveTab('blogs')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'blogs' ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-500 transition`}
          >
            Blogs
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

        {activeTab === 'blogs' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Blog Management</h2>
              <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add New Blog
              </button>
            </div>

            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Blog</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Author</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Views</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {mockBlogs.map((blog) => (
                      <tr key={blog.id} className="hover:bg-gray-750">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <img className="h-10 w-10 rounded-lg object-cover" src={blog.featuredImage} alt={blog.title} />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-white line-clamp-1">{blog.title}</div>
                              <div className="text-sm text-gray-400">{new Date(blog.publishedAt).toLocaleDateString()}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">{blog.author}</td>
                        <td className="px-6 py-4 text-sm text-gray-300">{blog.category}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            blog.isPublished ? 'bg-green-600 text-white' : 'bg-yellow-600 text-white'
                          }`}>
                            {blog.isPublished ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">{blog.views}</td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/blogs/${blog.id}`}
                              className="text-blue-400 hover:text-blue-300 transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                            <button className="text-yellow-400 hover:text-yellow-300 transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="text-red-400 hover:text-red-300 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Blog Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Total Blogs</h3>
                <p className="text-3xl font-bold text-blue-400">{mockBlogs.length}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Published</h3>
                <p className="text-3xl font-bold text-green-400">{mockBlogs.filter(b => b.isPublished).length}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Total Views</h3>
                <p className="text-3xl font-bold text-yellow-400">{mockBlogs.reduce((sum, b) => sum + b.views, 0)}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Total Comments</h3>
                <p className="text-3xl font-bold text-purple-400">{mockBlogs.reduce((sum, b) => sum + b.comments.length, 0)}</p>
              </div>
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