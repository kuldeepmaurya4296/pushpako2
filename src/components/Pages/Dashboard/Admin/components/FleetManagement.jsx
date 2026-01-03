import { mockFleet } from '@/lib/mockFleet';
import { Plus, Eye, Edit, Trash2 } from 'lucide-react';

export default function FleetManagement() {
  return (
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
  );
}