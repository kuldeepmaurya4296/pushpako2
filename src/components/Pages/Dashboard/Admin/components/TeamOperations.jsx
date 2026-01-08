import React from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import ImageUpload from '@/components/ui/ImageUpload';

const DEPARTMENTS = ['Executive', 'Technology', 'Engineering', 'Operations', 'Safety', 'Marketing', 'Sales'];

export function AddEditTeamDialog({ isOpen, onClose, onSave, member, saving }) {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    position: '',
    phone: '',
    image: '',
    bio: '',
    fullBio: '',
    department: 'Executive',
    responsibilities: [],
    linkedin: '',
    twitter: '',
    github: '',
    location: '',
    joinDate: '',
  });
  const [newResponsibility, setNewResponsibility] = React.useState('');

  React.useEffect(() => {
    if (member) {
      setFormData({
        name: member.name || '',
        email: member.email || '',
        position: member.position || member.role || '',
        phone: member.phone || '',
        image: member.image || '',
        bio: member.bio || '',
        fullBio: member.fullBio || member.bio || '',
        department: member.department || 'Executive',
        responsibilities: member.responsibilities || [],
        linkedin: member.linkedin || '',
        twitter: member.twitter || '',
        github: member.github || '',
        location: member.location || '',
        joinDate: member.joinDate || '',
      });
    } else {
      setFormData({
        name: '',
        email: '',
        position: '',
        phone: '',
        image: '',
        bio: '',
        fullBio: '',
        department: 'Executive',
        responsibilities: [],
        linkedin: '',
        twitter: '',
        github: '',
        location: '',
        joinDate: new Date().toISOString().split('T')[0],
      });
    }
  }, [member, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addResponsibility = () => {
    if (newResponsibility.trim()) {
      setFormData(prev => ({
        ...prev,
        responsibilities: [...prev.responsibilities, newResponsibility.trim()]
      }));
      setNewResponsibility('');
    }
  };

  const removeResponsibility = (index) => {
    setFormData(prev => ({
      ...prev,
      responsibilities: prev.responsibilities.filter((_, i) => i !== index)
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
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name *"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full p-2 bg-gray-700 rounded"
                required
              />
              <input
                type="email"
                placeholder="Email *"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full p-2 bg-gray-700 rounded"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Position/Role *"
                value={formData.position}
                onChange={(e) => handleChange('position', e.target.value)}
                className="w-full p-2 bg-gray-700 rounded"
                required
              />
              <select
                value={formData.department}
                onChange={(e) => handleChange('department', e.target.value)}
                className="w-full p-2 bg-gray-700 rounded"
                required
              >
                {DEPARTMENTS.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full p-2 bg-gray-700 rounded"
              />
              <input
                type="text"
                placeholder="Location"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                className="w-full p-2 bg-gray-700 rounded"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                placeholder="Join Date"
                value={formData.joinDate}
                onChange={(e) => handleChange('joinDate', e.target.value)}
                className="w-full p-2 bg-gray-700 rounded"
              />
              <div></div>
            </div>

            {/* Profile Image */}
            <ImageUpload
              label="Profile Image"
              value={formData.image}
              onChange={(value) => handleChange('image', value)}
            />

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Short Bio *</label>
              <textarea
                placeholder="Brief description (shown in cards)"
                value={formData.bio}
                onChange={(e) => handleChange('bio', e.target.value)}
                className="w-full p-2 bg-gray-700 rounded"
                rows="3"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Bio</label>
              <textarea
                placeholder="Detailed biography (shown when expanded)"
                value={formData.fullBio}
                onChange={(e) => handleChange('fullBio', e.target.value)}
                className="w-full p-2 bg-gray-700 rounded"
                rows="5"
              />
            </div>

            {/* Responsibilities */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Key Responsibilities</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Add a responsibility"
                  value={newResponsibility}
                  onChange={(e) => setNewResponsibility(e.target.value)}
                  className="flex-1 p-2 bg-gray-700 rounded"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addResponsibility())}
                />
                <button
                  type="button"
                  onClick={addResponsibility}
                  className="px-3 py-2 bg-green-600 rounded hover:bg-green-700"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2">
                {formData.responsibilities.map((resp, index) => (
                  <div key={index} className="flex items-center gap-2 bg-gray-700 p-2 rounded">
                    <span className="flex-1 text-sm">{resp}</span>
                    <button
                      type="button"
                      onClick={() => removeResponsibility(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Social Links</label>
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="url"
                  placeholder="LinkedIn URL"
                  value={formData.linkedin}
                  onChange={(e) => handleChange('linkedin', e.target.value)}
                  className="w-full p-2 bg-gray-700 rounded"
                />
                <input
                  type="url"
                  placeholder="Twitter URL"
                  value={formData.twitter}
                  onChange={(e) => handleChange('twitter', e.target.value)}
                  className="w-full p-2 bg-gray-700 rounded"
                />
                <input
                  type="url"
                  placeholder="GitHub URL"
                  value={formData.github}
                  onChange={(e) => handleChange('github', e.target.value)}
                  className="w-full p-2 bg-gray-700 rounded"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
              disabled={saving}
            >
              {saving ? 'Saving...' : (member ? 'Update Member' : 'Add Member')}
            </button>
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
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-6">
            <img
              src={member.image || '/placeholder-avatar.jpg'}
              alt={member.name}
              className="w-24 h-24 rounded-full object-cover bg-gray-600"
              onError={(e) => { e.target.src = '/placeholder-avatar.jpg'; }}
            />
            <div>
              <h4 className="text-2xl font-bold text-white">{member.name}</h4>
              <p className="text-blue-400 text-lg">{member.position || member.role}</p>
              {member.department && (
                <span className="inline-block mt-1 px-2 py-1 text-xs bg-gray-700 rounded-full text-gray-300">
                  {member.department}
                </span>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400">Email</label>
              <p className="mt-1 text-white">{member.email}</p>
            </div>
            {member.phone && (
              <div>
                <label className="block text-sm font-medium text-gray-400">Phone</label>
                <p className="mt-1 text-white">{member.phone}</p>
              </div>
            )}
            {member.location && (
              <div>
                <label className="block text-sm font-medium text-gray-400">Location</label>
                <p className="mt-1 text-white">{member.location}</p>
              </div>
            )}
            {member.joinDate && (
              <div>
                <label className="block text-sm font-medium text-gray-400">Join Date</label>
                <p className="mt-1 text-white">{member.joinDate}</p>
              </div>
            )}
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Biography</label>
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-white whitespace-pre-line">{member.fullBio || member.bio}</p>
            </div>
          </div>

          {/* Responsibilities */}
          {member.responsibilities && member.responsibilities.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Key Responsibilities</label>
              <ul className="bg-gray-700 p-4 rounded-lg space-y-2">
                {member.responsibilities.map((resp, index) => (
                  <li key={index} className="flex items-start gap-2 text-white">
                    <span className="text-blue-400">•</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Social Links */}
          {(member.socialLinks?.linkedin || member.socialLinks?.twitter || member.socialLinks?.github ||
            member.linkedin || member.twitter || member.github) && (
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Social Links</label>
                <div className="flex gap-4">
                  {(member.socialLinks?.linkedin || member.linkedin) && (
                    <a
                      href={member.socialLinks?.linkedin || member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      LinkedIn
                    </a>
                  )}
                  {(member.socialLinks?.twitter || member.twitter) && (
                    <a
                      href={member.socialLinks?.twitter || member.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      Twitter
                    </a>
                  )}
                  {(member.socialLinks?.github || member.github) && (
                    <a
                      href={member.socialLinks?.github || member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            )}
        </div>
        <div className="flex justify-end mt-6">
          <button onClick={onClose} className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500">Close</button>
        </div>
      </div>
    </div>
  );
}
