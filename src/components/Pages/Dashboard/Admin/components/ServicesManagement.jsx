import { mockServices } from '@/lib/mockServices';
import { mockAnalytics } from '@/lib/mockAnalytics';
import { Plus, Eye, Edit, Trash2 } from 'lucide-react';

export default function ServicesManagement() {
  return (
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
  );
}