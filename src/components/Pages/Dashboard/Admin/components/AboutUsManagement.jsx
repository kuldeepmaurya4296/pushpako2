import { mockAboutUs } from '@/lib/mockAboutUs';
import { Edit } from 'lucide-react';

export default function AboutUsManagement() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">About Us Management</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hero Section */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Hero Section</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
              <p className="text-white bg-gray-700 p-3 rounded">{mockAboutUs.hero.title}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Subtitle</label>
              <p className="text-white bg-gray-700 p-3 rounded">{mockAboutUs.hero.subtitle}</p>
            </div>
            <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition">Edit Hero</button>
          </div>
        </div>

        {/* Vision Section */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Vision Section</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
              <p className="text-white bg-gray-700 p-3 rounded">{mockAboutUs.vision.title}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Content</label>
              <p className="text-white bg-gray-700 p-3 rounded text-sm">{mockAboutUs.vision.content.substring(0, 100)}...</p>
            </div>
            <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition">Edit Vision</button>
          </div>
        </div>

        {/* Values */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Core Values</h3>
          <div className="space-y-3">
            {mockAboutUs.values.map((value, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-700 p-3 rounded">
                <span className="text-white">{value.title}</span>
                <button className="text-yellow-400 hover:text-yellow-300">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Footer Information</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Social Links</label>
              <p className="text-white bg-gray-700 p-2 rounded text-sm">{mockAboutUs.footer.socialLinks.length} links configured</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Company Info</label>
              <p className="text-white bg-gray-700 p-2 rounded text-sm">{mockAboutUs.footer.companyInfo.name}</p>
            </div>
            <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition">Edit Footer</button>
          </div>
        </div>
      </div>
    </div>
  );
}