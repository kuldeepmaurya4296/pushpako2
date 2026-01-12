import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function OverviewTab() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch('/api/admin/analytics');
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!data) return <div className="text-red-400">Failed to load overview</div>;

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Total Team Members</h3>
          <p className="text-3xl font-bold text-blue-400">{data.overview.totalTeam}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Total Blogs</h3>
          <p className="text-3xl font-bold text-green-400">{data.overview.totalBlogs}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-yellow-400">{data.overview.totalUsers}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Total Investors</h3>
          <p className="text-3xl font-bold text-purple-400">{data.overview.totalInvestors}</p>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Recent Activities</h2>
        <div className="space-y-4">
          {data.recentActivities.length > 0 ? (
            data.recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-gray-700 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${activity.type === 'user' ? 'bg-green-400' : 'bg-blue-400'}`}></div>
                <div>
                  <p className="text-sm">{activity.message}</p>
                  <p className="text-xs text-gray-400">{formatDate(activity.date)}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No recent activities.</p>
          )}
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
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span>Database: Connected</span>
          </div>
        </div>
      </div>
    </div>
  );
}