import { Edit, Eye, Trash2, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { AddEditAboutUsDialog, ViewAboutUsDialog } from './AboutOperations';
import { DeleteDialog } from '@/components/ui/DeleteDialog';
import toast from 'react-hot-toast';

export default function AboutUsManagement() {
  const [aboutUs, setAboutUs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedSectionType, setSelectedSectionType] = useState(null);
  const [formData, setFormData] = useState({
    section: '',
    title: '',
    subtitle: '',
    content: '',
    image: '',
    isActive: true,
  });

  // Fetch about us data on component mount
  useEffect(() => {
    fetchAboutUsData();
  }, []);

  const fetchAboutUsData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/about-us');
      if (!response.ok) {
        throw new Error('Failed to fetch about us data');
      }
      const data = await response.json();
      setAboutUs(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching about us data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditHero = () => {
    setSelectedSection(aboutUs.hero);
    setSelectedSectionType('hero');
    setFormData({
      section: 'hero',
      title: aboutUs.hero.title,
      subtitle: aboutUs.hero.subtitle,
      content: aboutUs.hero.description,
      image: aboutUs.hero.backgroundImage,
      isActive: true,
    });
    setIsEditDialogOpen(true);
  };

  const handleEditVision = () => {
    setSelectedSection(aboutUs.vision);
    setSelectedSectionType('vision');
    setFormData({
      section: 'vision',
      title: aboutUs.vision.title,
      subtitle: '',
      content: aboutUs.vision.content,
      image: aboutUs.vision.image,
      isActive: true,
    });
    setIsEditDialogOpen(true);
  };

  const handleAddValue = () => {
    setSelectedSection(null);
    setSelectedSectionType('value');
    setFormData({
      section: 'value',
      title: '',
      subtitle: '',
      content: '',
      image: '',
      isActive: true,
    });
    setIsAddDialogOpen(true);
  };

  const handleEditValue = (value) => {
    setSelectedSection(value);
    setSelectedSectionType('value');
    setFormData({
      section: 'value',
      title: value.title,
      subtitle: '',
      content: value.description,
      image: '',
      isActive: true,
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteValue = (value) => {
    setSelectedSection(value);
    setSelectedSectionType('value');
    setIsDeleteDialogOpen(true);
  };

  const handleViewValue = (value) => {
    setSelectedSection(value);
    setSelectedSectionType('value');
    setIsViewDialogOpen(true);
  };


  const handleSaveSection = async () => {
    try {
      setSaving(true);
      let updateData = {};

      if (selectedSectionType === 'hero') {
        updateData = {
          hero: {
            ...aboutUs.hero,
            title: formData.title,
            subtitle: formData.subtitle,
            description: formData.content,
            backgroundImage: formData.image,
          }
        };
      } else if (selectedSectionType === 'vision') {
        updateData = {
          vision: {
            ...aboutUs.vision,
            title: formData.title,
            content: formData.content,
            image: formData.image,
          }
        };
      } else if (selectedSectionType === 'value') {
        if (selectedSection) {
          // Edit existing value
          updateData = {
            values: aboutUs.values.map(v => v.id === selectedSection.id ? {
              ...v,
              title: formData.title,
              description: formData.content,
            } : v)
          };
        } else {
          // Add new value
          const newValue = {
            id: Date.now().toString(),
            title: formData.title,
            description: formData.content,
            icon: 'Star',
          };
          updateData = {
            values: [...aboutUs.values, newValue]
          };
        }
      }

      const response = await fetch('/api/about-us', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error('Failed to update about us data');
      }

      const updatedData = await response.json();
      setAboutUs(updatedData);

      toast.success(`${selectedSectionType === 'value' ? 'Value' : 'Section'} ${selectedSection ? 'updated' : 'added'} successfully!`);
      setError(null); // Clear any previous errors

      setIsAddDialogOpen(false);
      setIsEditDialogOpen(false);
      setSelectedSection(null);
      setSelectedSectionType(null);
    } catch (err) {
      console.error('Error saving section:', err);
      const errorMessage = 'Failed to save changes. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      setSaving(true);
      if (selectedSectionType === 'value') {
        const updateData = {
          values: aboutUs.values.filter(v => v.id !== selectedSection.id)
        };

        const response = await fetch('/api/about-us', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData),
        });

        if (!response.ok) {
          throw new Error('Failed to delete value');
        }

        const updatedData = await response.json();
        setAboutUs(updatedData);

        toast.success('Value deleted successfully!');
        setError(null); // Clear any previous errors
      }
      setIsDeleteDialogOpen(false);
      setSelectedSection(null);
      setSelectedSectionType(null);
    } catch (err) {
      console.error('Error deleting value:', err);
      const errorMessage = 'Failed to delete item. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const closeDialogs = () => {
    setIsAddDialogOpen(false);
    setIsEditDialogOpen(false);
    setIsViewDialogOpen(false);
    setIsDeleteDialogOpen(false);
    setSelectedSection(null);
    setSelectedSectionType(null);
  };
  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">About Us Management</h2>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-300">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">About Us Management</h2>
        <div className="text-center py-12">
          <p className="text-red-400 mb-4">Error: {error}</p>
          <button
            onClick={fetchAboutUsData}
            className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!aboutUs) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">About Us Management</h2>
        <div className="text-center py-12">
          <p className="text-gray-400 mb-4">No about us data found. Please initialize the data first.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">About Us Management</h2>
      {error && (
        <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4">
          <p className="text-red-400">{error}</p>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hero Section */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Hero Section</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
              <p className="text-white bg-gray-700 p-3 rounded">{aboutUs.hero.title}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Subtitle</label>
              <p className="text-white bg-gray-700 p-3 rounded">{aboutUs.hero.subtitle}</p>
            </div>
            <button
              onClick={handleEditHero}
              disabled={saving}
              className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {saving ? 'Saving...' : 'Edit Hero'}
            </button>
          </div>
        </div>

        {/* Vision Section */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Vision Section</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
              <p className="text-white bg-gray-700 p-3 rounded">{aboutUs.vision.title}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Content</label>
              <p className="text-white bg-gray-700 p-3 rounded text-sm">{aboutUs.vision.content.substring(0, 100)}...</p>
            </div>
            <button
              onClick={handleEditVision}
              disabled={saving}
              className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {saving ? 'Saving...' : 'Edit Vision'}
            </button>
          </div>
        </div>

        {/* Values */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Core Values</h3>
            <button
              onClick={handleAddValue}
              disabled={saving}
              className="bg-green-600 px-3 py-1 rounded-lg hover:bg-green-700 transition text-sm flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <Plus className="w-3 h-3" />
              {saving ? 'Saving...' : 'Add Value'}
            </button>
          </div>
          <div className="space-y-3">
            {aboutUs.values.map((value, index) => (
              <div key={value.id} className="flex items-center justify-between bg-gray-700 p-3 rounded">
                <span className="text-white">{value.title}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleViewValue(value)}
                    disabled={saving}
                    className="text-blue-400 hover:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleEditValue(value)}
                    disabled={saving}
                    className="text-yellow-400 hover:text-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteValue(value)}
                    disabled={saving}
                    className="text-red-400 hover:text-red-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <AddEditAboutUsDialog
        isOpen={isAddDialogOpen}
        onClose={closeDialogs}
        onSubmit={handleSaveSection}
        formData={formData}
        setFormData={setFormData}
        isEdit={false}
        saving={saving}
      />

      <AddEditAboutUsDialog
        isOpen={isEditDialogOpen}
        onClose={closeDialogs}
        onSubmit={handleSaveSection}
        formData={formData}
        setFormData={setFormData}
        isEdit={true}
        saving={saving}
      />

      <ViewAboutUsDialog
        isOpen={isViewDialogOpen}
        onClose={closeDialogs}
        section={selectedSection ? {
          section: selectedSectionType,
          title: selectedSection.title,
          subtitle: selectedSection.subtitle || '',
          content: selectedSection.description || selectedSection.content || '',
          image: selectedSection.image || '',
          isActive: true,
        } : null}
      />

      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={closeDialogs}
        onConfirm={handleConfirmDelete}
        title={`Delete ${selectedSectionType === 'value' ? 'Value' : 'Section'}`}
        itemName={selectedSection?.title}
        itemType={selectedSectionType === 'value' ? 'value' : 'section'}
      />
    </div>
  );
}