export default function PerformanceTab() {
  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Company Performance</h2>
      <p className="text-gray-300">Track the company's growth and key metrics.</p>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-lg font-semibold">Fleet Expansion</h4>
          <p className="text-gray-400">24 aircraft deployed, 5 new models in development.</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold">Market Reach</h4>
          <p className="text-gray-400">Operating in 12 cities, expanding to 5 more this year.</p>
        </div>
      </div>
    </div>
  );
}