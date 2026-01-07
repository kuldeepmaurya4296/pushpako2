import { X } from 'lucide-react';
import ImageUpload from '@/components/ui/ImageUpload';

export function AddEditAboutUsDialog({ isOpen, onClose, onSubmit, formData, setFormData, isEdit, saving = false }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50 py-10">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-3xl max-h-full overflow-y-auto hide-scrollbar">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">{isEdit ? 'Edit About Us Section' : 'Add New About Us Section'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Section"
              value={formData.section}
              onChange={(e) => setFormData({ ...formData, section: e.target.value })}
              className="w-full p-2 bg-gray-700 rounded disabled:opacity-50"
              required
              disabled={saving}
            />
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2 bg-gray-700 rounded disabled:opacity-50"
              required
              disabled={saving}
            />
            <input
              type="text"
              placeholder="Subtitle"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full p-2 bg-gray-700 rounded disabled:opacity-50"
              disabled={saving}
            />
            <textarea
              placeholder="Content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full p-2 bg-gray-700 rounded disabled:opacity-50"
              rows="5"
              required
              disabled={saving}
            />
            <ImageUpload
              label="Image"
              value={formData.image}
              onChange={(value) => setFormData({ ...formData, image: value })}
              disabled={saving}
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                disabled={saving}
              />
              Active
            </label>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {saving ? 'Saving...' : (isEdit ? 'Update Section' : 'Add Section')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function ViewAboutUsDialog({ isOpen, onClose, section }) {
  if (!isOpen || !section) return null;

  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50 py-10">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-3xl max-h-full overflow-y-auto hide-scrollbar">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">View About Us Section</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Section</label>
            <p className="mt-1 text-white">{section.section}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Title</label>
            <p className="mt-1 text-white">{section.title}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Subtitle</label>
            <p className="mt-1 text-white">{section.subtitle}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Content</label>
            <p className="mt-1 text-white">{section.content}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Image</label>
            <p className="mt-1 text-white">{section.image}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Status</label>
            <p className="mt-1 text-white">{section.isActive ? 'Active' : 'Inactive'}</p>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500">Close</button>
        </div>
      </div>
    </div>
  );
}