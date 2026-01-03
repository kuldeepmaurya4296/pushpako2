export default function DeleteInvestorDialog({ isOpen, onClose, onConfirm, investor }) {
  if (!isOpen || !investor) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-sm">
        <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
        <p>Are you sure you want to delete {investor.name}?</p>
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-600 rounded hover:bg-red-700">Delete</button>
        </div>
      </div>
    </div>
  );
}