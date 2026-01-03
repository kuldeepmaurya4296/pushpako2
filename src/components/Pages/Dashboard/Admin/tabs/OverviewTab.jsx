import { mockFleet } from '@/lib/mockFleet';
import { mockUsers } from '@/lib/mockUsers';
import { mockInvestors } from '@/lib/mockInvestors';

export default function OverviewTab() {
  return (
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
              <p className="text-sm">New blog post published</p>
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
  );
}