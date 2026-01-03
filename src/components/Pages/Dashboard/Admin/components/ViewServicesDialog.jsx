import { X } from 'lucide-react';

export default function ViewServicesDialog({ isOpen, onClose, service }) {
  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50 py-10">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-4xl max-h-full overflow-y-auto hide-scrollbar">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">View Service</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Title</label>
            <p className="mt-1 text-white">{service.title}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Slug</label>
            <p className="mt-1 text-white">{service.slug}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Description</label>
            <p className="mt-1 text-white">{service.description}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Category</label>
            <p className="mt-1 text-white">{service.category}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Status</label>
            <p className="mt-1 text-white">{service.status}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Icon</label>
            <p className="mt-1 text-white">{service.icon}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Features</label>
            <ul className="mt-1 text-white list-disc list-inside">
              {service.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Popular</label>
            <p className="mt-1 text-white">{service.isPopular ? 'Yes' : 'No'}</p>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500">Close</button>
        </div>
      </div>
    </div>
  );
}