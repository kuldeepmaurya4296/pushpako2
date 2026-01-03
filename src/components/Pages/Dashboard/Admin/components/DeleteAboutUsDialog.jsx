import { X, AlertTriangle } from 'lucide-react';

export default function DeleteAboutUsDialog({ isOpen, onClose, onConfirm, sectionTitle }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-red-400">Delete Section</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-8 h-8 text-red-400" />
          <div>
            <p className="text-white">Are you sure you want to delete this section?</p>
            <p className="text-gray-400 text-sm mt-1">"{sectionTitle}"</p>
            <p className="text-gray-400 text-sm">This action cannot be undone.</p>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-600 rounded hover:bg-red-700">Delete</button>
        </div>
      </div>
    </div>
  );
}