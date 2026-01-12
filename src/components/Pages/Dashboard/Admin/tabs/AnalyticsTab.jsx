import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function AnalyticsTab() {
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

  if (!data) return <div className="text-red-400">Failed to load analytics</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Analytics Dashboard</h2>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Total Blog Views</h3>
          <p className="text-3xl font-bold text-blue-400">{data.overview.totalViews.toLocaleString()}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Published Blogs</h3>
          <p className="text-3xl font-bold text-green-400">{data.overview.totalPublishedBlogs}</p>
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

      {/* Top Pages */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Top Performing Blogs</h3>
        <div className="space-y-3">
          {data.traffic.topPages.length > 0 ? (
            data.traffic.topPages.map((page, index) => (
              <div key={index} className="flex items-center justify-between border-b border-gray-700 pb-2 last:border-0">
                <div className="flex flex-col">
                  <span className="font-medium text-white">{page.title}</span>
                  <span className="text-xs text-gray-500 truncate max-w-md">{page.page}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-green-400 font-bold">{page.views.toLocaleString()} views</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No data available yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}