import { X } from 'lucide-react';

export default function ViewFleetDialog({ isOpen, onClose, aircraft }) {
  if (!isOpen || !aircraft) return null;

  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50 py-10">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-3xl max-h-full overflow-y-auto hide-scrollbar">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">View Aircraft</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Name</label>
            <p className="mt-1 text-white">{aircraft.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Type</label>
            <p className="mt-1 text-white">{aircraft.type}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Model</label>
            <p className="mt-1 text-white">{aircraft.model}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Status</label>
            <p className="mt-1 text-white capitalize">{aircraft.status}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Location</label>
            <p className="mt-1 text-white">{aircraft.location}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Flight Hours</label>
            <p className="mt-1 text-white">{aircraft.flightHours}</p>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500">Close</button>
        </div>
      </div>
    </div>
  );
}