import { X } from 'lucide-react';

export default function ViewUserDialog({ isOpen, onClose, user }) {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50 py-10">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-3xl max-h-full overflow-y-auto hide-scrollbar">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">View User</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Name</label>
            <p className="mt-1 text-white">{user.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Email</label>
            <p className="mt-1 text-white">{user.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Type</label>
            <p className="mt-1 text-white capitalize">{user.type}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Source</label>
            <p className="mt-1 text-white">{user.source}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Status</label>
            <p className="mt-1 text-white capitalize">{user.status}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Created At</label>
            <p className="mt-1 text-white">{new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500">Close</button>
        </div>
      </div>
    </div>
  );
}