import { mockAboutUs } from '@/lib/mockAboutUs';
import { Edit, Eye, Trash2, Plus } from 'lucide-react';
import { useState } from 'react';
import { AddEditAboutUsDialog, ViewAboutUsDialog } from './AboutOperations';
import { DeleteDialog } from '@/components/ui/DeleteDialog';

export default function AboutUsManagement() {
  const [aboutUs, setAboutUs] = useState(mockAboutUs);
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

  const handleEditFooter = () => {
    setSelectedSection(aboutUs.footer);
    setSelectedSectionType('footer');
    setFormData({
      section: 'footer',
      title: aboutUs.footer.companyInfo.name,
      subtitle: aboutUs.footer.companyInfo.address,
      content: `Email: ${aboutUs.footer.companyInfo.email}\nPhone: ${aboutUs.footer.companyInfo.phone}`,
      image: '',
      isActive: true,
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveSection = () => {
    if (selectedSectionType === 'hero') {
      setAboutUs(prev => ({
        ...prev,
        hero: {
          ...prev.hero,
          title: formData.title,
          subtitle: formData.subtitle,
          description: formData.content,
          backgroundImage: formData.image,
        }
      }));
    } else if (selectedSectionType === 'vision') {
      setAboutUs(prev => ({
        ...prev,
        vision: {
          ...prev.vision,
          title: formData.title,
          content: formData.content,
          image: formData.image,
        }
      }));
    } else if (selectedSectionType === 'value') {
      if (selectedSection) {
        // Edit existing value
        setAboutUs(prev => ({
          ...prev,
          values: prev.values.map(v => v.id === selectedSection.id ? {
            ...v,
            title: formData.title,
            description: formData.content,
          } : v)
        }));
      } else {
        // Add new value
        const newValue = {
          id: Date.now().toString(),
          title: formData.title,
          description: formData.content,
          icon: 'Star',
        };
        setAboutUs(prev => ({
          ...prev,
          values: [...prev.values, newValue]
        }));
      }
    } else if (selectedSectionType === 'footer') {
      setAboutUs(prev => ({
        ...prev,
        footer: {
          ...prev.footer,
          companyInfo: {
            ...prev.footer.companyInfo,
            name: formData.title,
            address: formData.subtitle,
            email: formData.content.split('\n')[0].replace('Email: ', ''),
            phone: formData.content.split('\n')[1].replace('Phone: ', ''),
          }
        }
      }));
    }
    setIsAddDialogOpen(false);
    setIsEditDialogOpen(false);
    setSelectedSection(null);
    setSelectedSectionType(null);
  };

  const handleConfirmDelete = () => {
    if (selectedSectionType === 'value') {
      setAboutUs(prev => ({
        ...prev,
        values: prev.values.filter(v => v.id !== selectedSection.id)
      }));
    }
    setIsDeleteDialogOpen(false);
    setSelectedSection(null);
    setSelectedSectionType(null);
  };

  const closeDialogs = () => {
    setIsAddDialogOpen(false);
    setIsEditDialogOpen(false);
    setIsViewDialogOpen(false);
    setIsDeleteDialogOpen(false);
    setSelectedSection(null);
    setSelectedSectionType(null);
  };
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
              <p className="text-white bg-gray-700 p-3 rounded">{aboutUs.hero.title}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Subtitle</label>
              <p className="text-white bg-gray-700 p-3 rounded">{aboutUs.hero.subtitle}</p>
            </div>
            <button onClick={handleEditHero} className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition">Edit Hero</button>
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
            <button onClick={handleEditVision} className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition">Edit Vision</button>
          </div>
        </div>

        {/* Values */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Core Values</h3>
            <button onClick={handleAddValue} className="bg-green-600 px-3 py-1 rounded-lg hover:bg-green-700 transition text-sm flex items-center gap-1">
              <Plus className="w-3 h-3" />
              Add Value
            </button>
          </div>
          <div className="space-y-3">
            {aboutUs.values.map((value, index) => (
              <div key={value.id} className="flex items-center justify-between bg-gray-700 p-3 rounded">
                <span className="text-white">{value.title}</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleViewValue(value)} className="text-blue-400 hover:text-blue-300">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleEditValue(value)} className="text-yellow-400 hover:text-yellow-300">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDeleteValue(value)} className="text-red-400 hover:text-red-300">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        {/* <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Footer Information</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Social Links</label>
              <p className="text-white bg-gray-700 p-2 rounded text-sm">{aboutUs.footer.socialLinks.length} links configured</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Company Info</label>
              <p className="text-white bg-gray-700 p-2 rounded text-sm">{aboutUs.footer.companyInfo.name}</p>
            </div>
            <button onClick={handleEditFooter} className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition">Edit Footer</button>
          </div>
        </div> */}
      </div>

      <AddEditAboutUsDialog
        isOpen={isAddDialogOpen}
        onClose={closeDialogs}
        onSubmit={handleSaveSection}
        formData={formData}
        setFormData={setFormData}
        isEdit={false}
      />

      <AddEditAboutUsDialog
        isOpen={isEditDialogOpen}
        onClose={closeDialogs}
        onSubmit={handleSaveSection}
        formData={formData}
        setFormData={setFormData}
        isEdit={true}
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