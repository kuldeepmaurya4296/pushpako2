export default function ReportsTab() {
  const reports = [
    'Q4 2023 Report',
    'Annual 2023 Report',
    'Investor Presentation',
  ];

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Financial Reports</h2>
      <p className="text-gray-300">Access quarterly and annual financial reports.</p>
      <div className="mt-4 space-y-2">
        {reports.map((report, index) => (
          <button key={index} className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition mr-4">
            {report}
          </button>
        ))}
      </div>
    </div>
  );
}