export default function PortfolioTab({ investor }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Investment Amount</h3>
        <p className="text-3xl font-bold text-green-400">${investor.investmentAmount.toLocaleString()}</p>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Current Value</h3>
        <p className="text-3xl font-bold text-blue-400">${investor.currentValue.toLocaleString()}</p>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">ROI</h3>
        <p className="text-3xl font-bold text-yellow-400">+{investor.roi}%</p>
      </div>
    </div>
  );
}