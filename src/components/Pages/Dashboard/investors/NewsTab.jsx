export default function NewsTab() {
  const news = [
    {
      title: 'New Partnership Announced',
      content: 'Pushpako2 partners with major airline for urban air mobility integration.',
      date: '2024-01-15',
      borderColor: 'border-blue-500',
    },
    {
      title: 'Successful Test Flight',
      content: 'Hydrogen-powered aircraft completes 500km test flight.',
      date: '2024-01-10',
      borderColor: 'border-green-500',
    },
  ];

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">News & Updates</h2>
      <div className="space-y-4">
        {news.map((item, index) => (
          <div key={index} className={`border-l-4 ${item.borderColor} pl-4`}>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-gray-400">{item.content}</p>
            <p className="text-sm text-gray-500">{item.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}