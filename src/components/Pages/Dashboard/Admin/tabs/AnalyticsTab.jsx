import { mockAnalytics } from '@/lib/mockAnalytics';

export default function AnalyticsTab() {
  return (
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
  );
}