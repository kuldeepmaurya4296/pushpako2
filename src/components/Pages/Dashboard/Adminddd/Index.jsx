'use client';
import { useState } from 'react';
import { mockBlogs } from '@/lib/mockBlogs';
import { mockUsers } from '@/lib/mockUsers';
import { mockFleet } from '@/lib/mockFleet';
import { mockTechnologies } from '@/lib/mockTechnologies';
import { mockPartners } from '@/lib/mockPartners';
import { mockAboutUs } from '@/lib/mockAboutUs';
import { mockServices } from '@/lib/mockServices';
import { mockTeam } from '@/lib/mockTeam';
import { mockInvestors } from '@/lib/mockInvestors';
import { mockAnalytics } from '@/lib/mockAnalytics';
import Link from 'next/link';
import { Edit, Eye, Trash2, Plus, Users, Plane, FileText, BarChart3, Settings, ChevronDown, ChevronRight } from 'lucide-react';

export default function AdminDashboard() {
  const [activeMainTab, setActiveMainTab] = useState('overview');
  const [activeSubTab, setActiveSubTab] = useState('blogs'); // for website management
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="min-h-screen bg-[#060B18] text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        {/* Main Navigation Tabs */}
        <div className="flex flex-wrap gap-2 md:gap-4 mb-8">
          <button
            onClick={() => setActiveMainTab('overview')}
            className={`px-4 py-2 rounded-lg ${activeMainTab === 'overview' ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-500 transition`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveMainTab('investors')}
            className={`px-4 py-2 rounded-lg ${activeMainTab === 'investors' ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-500 transition`}
          >
            Investors Management
          </button>
          <button
            onClick={() => {
              setActiveMainTab('website');
              toggleSection('website');
            }}
            className={`px-4 py-2 rounded-lg ${activeMainTab === 'website' ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-500 transition flex items-center gap-2`}
          >
            Website Management
            {expandedSections.website ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setActiveMainTab('analytics')}
            className={`px-4 py-2 rounded-lg ${activeMainTab === 'analytics' ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-500 transition`}
          >
            Analytics
          </button>
        </div>

        {/* Website Management Sub-tabs */}
        {activeMainTab === 'website' && expandedSections.website && (
          <div className="flex flex-wrap gap-2 md:gap-4 mb-8 ml-4">
            <button
              onClick={() => setActiveSubTab('blogs')}
              className={`px-3 py-1 text-sm rounded-lg ${activeSubTab === 'blogs' ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-500 transition`}
            >
              Blogs Management
            </button>
            <button
              onClick={() => setActiveSubTab('users')}
              className={`px-3 py-1 text-sm rounded-lg ${activeSubTab === 'users' ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-500 transition`}
            >
              User Management
            </button>
            <button
              onClick={() => setActiveSubTab('fleet')}
              className={`px-3 py-1 text-sm rounded-lg ${activeSubTab === 'fleet' ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-500 transition`}
            >
              Fleet Management
            </button>
            <button
              onClick={() => setActiveSubTab('technology')}
              className={`px-3 py-1 text-sm rounded-lg ${activeSubTab === 'technology' ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-500 transition`}
            >
              Technology Management
            </button>
            <button
              onClick={() => setActiveSubTab('about')}
              className={`px-3 py-1 text-sm rounded-lg ${activeSubTab === 'about' ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-500 transition`}
            >
              About Us Management
            </button>
            <button
              onClick={() => setActiveSubTab('services')}
              className={`px-3 py-1 text-sm rounded-lg ${activeSubTab === 'services' ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-500 transition`}
            >
              Services Management
            </button>
            <button
              onClick={() => setActiveSubTab('team')}
              className={`px-3 py-1 text-sm rounded-lg ${activeSubTab === 'team' ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-500 transition`}
            >
              Team Management
            </button>
          </div>
        )}

        {/* Content based on active tab */}
        {activeMainTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Total Aircraft</h3>
                <p className="text-3xl font-bold text-blue-400">{mockFleet.length}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Active Aircraft</h3>
                <p className="text-3xl font-bold text-green-400">{mockFleet.filter(f => f.status === 'active').length}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Total Users</h3>
                <p className="text-3xl font-bold text-yellow-400">{mockUsers.length}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Total Investors</h3>
                <p className="text-3xl font-bold text-purple-400">{mockInvestors.length}</p>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Recent Activities</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-gray-700 rounded-lg">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <div>
                    <p className="text-sm">New user registration: {mockUsers[mockUsers.length - 1]?.name}</p>
                    <p className="text-xs text-gray-400">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-gray-700 rounded-lg">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <div>
                    <p className="text-sm">Fleet maintenance completed for {mockFleet[0]?.name}</p>
                    <p className="text-xs text-gray-400">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-gray-700 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <div>
                    <p className="text-sm">New blog post published: {mockBlogs[0]?.title}</p>
                    <p className="text-xs text-gray-400">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">System Status</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span>Website: Operational</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span>API: Operational</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <span>Maintenance Due: {mockFleet.filter(f => new Date(f.nextMaintenance) <= new Date()).length} aircraft</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeMainTab === 'investors' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Investors Management</h2>
              <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add New Investor
              </button>
            </div>

            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Investor</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Investment</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Current Value</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ROI</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {mockInvestors.map((investor) => (
                      <tr key={investor.id} className="hover:bg-gray-750">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <img className="h-10 w-10 rounded-full object-cover" src={investor.profilePicture} alt={investor.name} />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-white">{investor.name}</div>
                              <div className="text-sm text-gray-400">{investor.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300 capitalize">{investor.type}</td>
                        <td className="px-6 py-4 text-sm text-gray-300">${investor.investmentAmount.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm text-gray-300">${investor.currentValue.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm text-green-400">{investor.roi}%</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            investor.status === 'active' ? 'bg-green-600 text-white' : 'bg-gray-600 text-white'
                          }`}>
                            {investor.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex items-center gap-2">
                            <button className="text-blue-400 hover:text-blue-300 transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
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

            {/* Investor Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Total Investors</h3>
                <p className="text-3xl font-bold text-blue-400">{mockInvestors.length}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Active Investors</h3>
                <p className="text-3xl font-bold text-green-400">{mockInvestors.filter(i => i.status === 'active').length}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Total Investment</h3>
                <p className="text-3xl font-bold text-yellow-400">${mockInvestors.reduce((sum, i) => sum + i.investmentAmount, 0).toLocaleString()}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Avg ROI</h3>
                <p className="text-3xl font-bold text-purple-400">{(mockInvestors.reduce((sum, i) => sum + i.roi, 0) / mockInvestors.length).toFixed(1)}%</p>
              </div>
            </div>
          </div>
        )}

        {activeMainTab === 'website' && activeSubTab === 'blogs' && (
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

        {activeMainTab === 'website' && activeSubTab === 'users' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">User Management</h2>
              <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add New User
              </button>
            </div>

            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Source</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Created</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {mockUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-750">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-white">{user.name}</div>
                            <div className="text-sm text-gray-400">{user.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300 capitalize">{user.type}</td>
                        <td className="px-6 py-4 text-sm text-gray-300">{user.source}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            user.status === 'new' ? 'bg-blue-600 text-white' :
                            user.status === 'contacted' ? 'bg-yellow-600 text-white' :
                            user.status === 'qualified' ? 'bg-green-600 text-white' : 'bg-purple-600 text-white'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex items-center gap-2">
                            <button className="text-blue-400 hover:text-blue-300 transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
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

            {/* User Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Total Users</h3>
                <p className="text-3xl font-bold text-blue-400">{mockUsers.length}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">New Users</h3>
                <p className="text-3xl font-bold text-green-400">{mockUsers.filter(u => u.status === 'new').length}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Qualified Leads</h3>
                <p className="text-3xl font-bold text-yellow-400">{mockUsers.filter(u => u.status === 'qualified').length}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Converted</h3>
                <p className="text-3xl font-bold text-purple-400">{mockUsers.filter(u => u.status === 'converted').length}</p>
              </div>
            </div>
          </div>
        )}

        {activeMainTab === 'website' && activeSubTab === 'fleet' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Fleet Management</h2>
              <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add New Aircraft
              </button>
            </div>

            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Aircraft</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Model</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Flight Hours</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {mockFleet.map((aircraft) => (
                      <tr key={aircraft.id} className="hover:bg-gray-750">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-white">{aircraft.name}</div>
                          <div className="text-sm text-gray-400">{aircraft.type}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">{aircraft.model}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            aircraft.status === 'active' ? 'bg-green-600 text-white' :
                            aircraft.status === 'maintenance' ? 'bg-yellow-600 text-white' : 'bg-red-600 text-white'
                          }`}>
                            {aircraft.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">{aircraft.location}</td>
                        <td className="px-6 py-4 text-sm text-gray-300">{aircraft.flightHours}</td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex items-center gap-2">
                            <button className="text-blue-400 hover:text-blue-300 transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
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

            {/* Fleet Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Total Aircraft</h3>
                <p className="text-3xl font-bold text-blue-400">{mockFleet.length}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Active</h3>
                <p className="text-3xl font-bold text-green-400">{mockFleet.filter(f => f.status === 'active').length}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">In Maintenance</h3>
                <p className="text-3xl font-bold text-yellow-400">{mockFleet.filter(f => f.status === 'maintenance').length}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Total Flight Hours</h3>
                <p className="text-3xl font-bold text-purple-400">{mockFleet.reduce((sum, f) => sum + f.flightHours, 0)}</p>
              </div>
            </div>
          </div>
        )}

        {activeMainTab === 'website' && activeSubTab === 'technology' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Technology Management</h2>
              <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add New Technology
              </button>
            </div>

            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Technology</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Version</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Downloads</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {mockTechnologies.map((tech) => (
                      <tr key={tech.id} className="hover:bg-gray-750">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <img className="h-10 w-10 rounded-lg object-cover" src={tech.featuredImage} alt={tech.title} />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-white">{tech.title}</div>
                              <div className="text-sm text-gray-400">{tech.description.substring(0, 50)}...</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">{tech.category}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            tech.status === 'active' ? 'bg-green-600 text-white' :
                            tech.status === 'development' ? 'bg-yellow-600 text-white' : 'bg-gray-600 text-white'
                          }`}>
                            {tech.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">{tech.version}</td>
                        <td className="px-6 py-4 text-sm text-gray-300">{tech.downloads}</td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex items-center gap-2">
                            <button className="text-blue-400 hover:text-blue-300 transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
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

            {/* Technology Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Total Technologies</h3>
                <p className="text-3xl font-bold text-blue-400">{mockTechnologies.length}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Active</h3>
                <p className="text-3xl font-bold text-green-400">{mockTechnologies.filter(t => t.status === 'active').length}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Total Downloads</h3>
                <p className="text-3xl font-bold text-yellow-400">{mockTechnologies.reduce((sum, t) => sum + t.downloads, 0)}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Total Views</h3>
                <p className="text-3xl font-bold text-purple-400">{mockTechnologies.reduce((sum, t) => sum + t.views, 0)}</p>
              </div>
            </div>
          </div>
        )}

        {activeMainTab === 'website' && activeSubTab === 'about' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">About Us Management</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Hero Section */}
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Hero Section</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                    <p className="text-white bg-gray-700 p-3 rounded">{mockAboutUs.hero.title}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Subtitle</label>
                    <p className="text-white bg-gray-700 p-3 rounded">{mockAboutUs.hero.subtitle}</p>
                  </div>
                  <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition">Edit Hero</button>
                </div>
              </div>

              {/* Vision Section */}
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Vision Section</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                    <p className="text-white bg-gray-700 p-3 rounded">{mockAboutUs.vision.title}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Content</label>
                    <p className="text-white bg-gray-700 p-3 rounded text-sm">{mockAboutUs.vision.content.substring(0, 100)}...</p>
                  </div>
                  <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition">Edit Vision</button>
                </div>
              </div>

              {/* Values */}
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Core Values</h3>
                <div className="space-y-3">
                  {mockAboutUs.values.map((value, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-700 p-3 rounded">
                      <span className="text-white">{value.title}</span>
                      <button className="text-yellow-400 hover:text-yellow-300">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Footer Information</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Social Links</label>
                    <p className="text-white bg-gray-700 p-2 rounded text-sm">{mockAboutUs.footer.socialLinks.length} links configured</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Company Info</label>
                    <p className="text-white bg-gray-700 p-2 rounded text-sm">{mockAboutUs.footer.companyInfo.name}</p>
                  </div>
                  <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition">Edit Footer</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeMainTab === 'website' && activeSubTab === 'services' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Services Management</h2>
              <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add New Service
              </button>
            </div>

            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Service</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Pricing</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Inquiries</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {mockServices.map((service) => (
                      <tr key={service.id} className="hover:bg-gray-750">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-white">{service.title}</div>
                            <div className="text-sm text-gray-400 ml-2">{service.description.substring(0, 40)}...</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">{service.category}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            service.status === 'active' ? 'bg-green-600 text-white' :
                            service.status === 'development' ? 'bg-yellow-600 text-white' : 'bg-gray-600 text-white'
                          }`}>
                            {service.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">
                          {service.pricing.standard ? `$${service.pricing.standard.price.toLocaleString()}` : 'Custom'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">
                          {mockAnalytics.content.serviceInquiries.find(s => s.service === service.title)?.inquiries || 0}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex items-center gap-2">
                            <button className="text-blue-400 hover:text-blue-300 transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
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

            {/* Services Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Total Services</h3>
                <p className="text-3xl font-bold text-blue-400">{mockServices.length}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Active Services</h3>
                <p className="text-3xl font-bold text-green-400">{mockServices.filter(s => s.status === 'active').length}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Total Inquiries</h3>
                <p className="text-3xl font-bold text-yellow-400">{mockAnalytics.content.serviceInquiries.reduce((sum, s) => sum + s.inquiries, 0)}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Popular Services</h3>
                <p className="text-3xl font-bold text-purple-400">{mockServices.filter(s => s.isPopular).length}</p>
              </div>
            </div>
          </div>
        )}

        {activeMainTab === 'website' && activeSubTab === 'team' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Team Management</h2>
              <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add New Member
              </button>
            </div>

            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Member</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Department</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {mockTeam.map((member) => (
                      <tr key={member.id} className="hover:bg-gray-750">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <img className="h-10 w-10 rounded-full object-cover" src={member.image} alt={member.name} />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-white">{member.name}</div>
                              <div className="text-sm text-gray-400">{member.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">{member.role}</td>
                        <td className="px-6 py-4 text-sm text-gray-300">{member.department}</td>
                        <td className="px-6 py-4 text-sm text-gray-300">{member.location}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            member.isActive ? 'bg-green-600 text-white' : 'bg-gray-600 text-white'
                          }`}>
                            {member.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex items-center gap-2">
                            <button className="text-blue-400 hover:text-blue-300 transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
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

            {/* Team Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Total Members</h3>
                <p className="text-3xl font-bold text-blue-400">{mockTeam.length}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Active Members</h3>
                <p className="text-3xl font-bold text-green-400">{mockTeam.filter(m => m.isActive).length}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Departments</h3>
                <p className="text-3xl font-bold text-yellow-400">{new Set(mockTeam.map(m => m.department)).size}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Locations</h3>
                <p className="text-3xl font-bold text-purple-400">{new Set(mockTeam.map(m => m.location)).size}</p>
              </div>
            </div>
          </div>
        )}

        {activeMainTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Analytics Dashboard</h2>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Total Visitors</h3>
                <p className="text-3xl font-bold text-blue-400">{mockAnalytics.overview.totalUsers.toLocaleString()}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Page Views</h3>
                <p className="text-3xl font-bold text-green-400">{mockAnalytics.traffic.pageViews.toLocaleString()}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Conversion Rate</h3>
                <p className="text-3xl font-bold text-yellow-400">{mockAnalytics.overview.conversionRate}%</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Avg Session</h3>
                <p className="text-3xl font-bold text-purple-400">{mockAnalytics.traffic.avgSessionDuration}</p>
              </div>
            </div>

            {/* Traffic Sources */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Traffic Sources</h3>
              <div className="space-y-3">
                {mockAnalytics.traffic.trafficSources.map((source, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="capitalize">{source.source}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-400 h-2 rounded-full"
                          style={{ width: `${source.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-400 w-12">{source.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Pages */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Top Pages</h3>
              <div className="space-y-3">
                {mockAnalytics.traffic.topPages.map((page, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{page.page}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-400">{page.views.toLocaleString()} views</span>
                      <span className="text-sm text-gray-400">{page.bounceRate}% bounce</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}