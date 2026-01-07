import React from 'react';
import { X } from 'lucide-react';
import ImageUpload from '@/components/ui/ImageUpload';

export function AddEditTeamDialog({ isOpen, onClose, onSave, member }) {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    position: '',
    phone: '',
    image: '',
    bio: '',
    experience: [],
    linkedin: '',
    twitter: '',
    github: '',
  });

  React.useEffect(() => {
    if (member) {
      setFormData({
        name: member.name || '',
        email: member.email || '',
        position: member.position || '',
        phone: member.phone || '',
        image: member.image || '',
        bio: member.bio || '',
        experience: member.experience || [],
        linkedin: member.linkedin || '',
        twitter: member.twitter || '',
        github: member.github || '',
      });
    } else {
      setFormData({
        name: '',
        email: '',
        position: '',
        phone: '',
        image: '',
        bio: '',
        experience: [],
        linkedin: '',
        twitter: '',
        github: '',
      });
    }
  }, [member, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50 py-10">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-4xl max-h-full overflow-y-auto hide-scrollbar">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">{member ? 'Edit Team Member' : 'Add New Team Member'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full p-2 bg-gray-700 rounded"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full p-2 bg-gray-700 rounded"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Position"
                value={formData.position}
                onChange={(e) => handleChange('position', e.target.value)}
                className="w-full p-2 bg-gray-700 rounded"
                required
              />
              <input
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full p-2 bg-gray-700 rounded"
              />
            </div>
            <ImageUpload
              label="Profile Image"
              value={formData.image}
              onChange={(value) => handleChange('image', value)}
            />
            <textarea
              placeholder="Bio"
              value={formData.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              className="w-full p-2 bg-gray-700 rounded"
              rows="3"
            />
            <div className="grid grid-cols-3 gap-4">
              <input
                type="url"
                placeholder="LinkedIn"
                value={formData.linkedin}
                onChange={(e) => handleChange('linkedin', e.target.value)}
                className="w-full p-2 bg-gray-700 rounded"
              />
              <input
                type="url"
                placeholder="Twitter"
                value={formData.twitter}
                onChange={(e) => handleChange('twitter', e.target.value)}
                className="w-full p-2 bg-gray-700 rounded"
              />
              <input
                type="url"
                placeholder="GitHub"
                value={formData.github}
                onChange={(e) => handleChange('github', e.target.value)}
                className="w-full p-2 bg-gray-700 rounded"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">{member ? 'Update Member' : 'Add Member'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function ViewTeamDialog({ isOpen, onClose, member }) {
  if (!isOpen || !member) return null;

  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50 py-10">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-4xl max-h-full overflow-y-auto hide-scrollbar">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">View Team Member</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <img src={member.image} alt={member.name} className="w-16 h-16 rounded-full object-cover" />
            <div>
              <h4 className="text-xl font-bold text-white">{member.name}</h4>
              <p className="text-gray-400">{member.position}</p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Email</label>
            <p className="mt-1 text-white">{member.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Phone</label>
            <p className="mt-1 text-white">{member.phone}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Bio</label>
            <p className="mt-1 text-white">{member.bio}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Social Links</label>
            <div className="mt-1 space-y-1">
              {member.socialLinks?.linkedin && <p className="text-white">LinkedIn: {member.socialLinks.linkedin}</p>}
              {member.socialLinks?.twitter && <p className="text-white">Twitter: {member.socialLinks.twitter}</p>}
              {member.socialLinks?.github && <p className="text-white">GitHub: {member.socialLinks.github}</p>}
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500">Close</button>
        </div>
      </div>
    </div>
  );
}