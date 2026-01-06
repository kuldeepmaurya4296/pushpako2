import { Edit, Eye, Trash2, Plus } from 'lucide-react';
import { useState } from 'react';
import { DeleteDialog } from '@/components/ui/DeleteDialog';
import { AddEditFooterCTADialog, AddEditFooterBrandDialog, AddEditFooterSectionDialog, AddEditFooterSocialLinkDialog, AddEditFooterBottomBarDialog } from './FooterOperations';

export default function FooterManagement() {
  // Mock footer data - in real app this would come from API/database
  const [footerData, setFooterData] = useState({
    cta: {
      title: 'Ready to Experience the Future of Flight?',
      subtitle: 'Connect with Pushpak O2 for partnerships, investments, or media inquiries',
      primaryButton: 'Schedule a Call',
      secondaryButton: 'Download Pitch Deck'
    },
    brand: {
      description: 'Pushpako2 Second Floor, 11, Aadi Parishar, Bagsewaniya, Sant Ashram Nagar, Bhel Sangam Colony, Face2, Bhopal Madhya Pradesh',
      email: 'info@pushpak-o2.com',
      phone: '+91-8085613350'
    },
    sections: [
      {
        id: 'product',
        title: 'Product',
        links: [
          { name: 'Technology', href: '/technologies' },
          { name: 'Aircraft', href: '/aircraft' },
          { name: 'Roadmap', href: '/roadmap' }
        ]
      },
      {
        id: 'company',
        title: 'Company',
        links: [
          { name: 'About Us', href: '/about-us' },
          { name: 'Team', href: '/our-team' },
          { name: 'Press', href: '/press' }
        ]
      },
      {
        id: 'resources',
        title: 'Resources',
        links: [
          { name: 'FAQ', href: '/support-faq' },
          { name: 'Support', href: '/support-faq' },
          { name: 'Blog', href: '/blogs' }
        ]
      }
    ],
    socialLinks: [
      { platform: 'twitter', url: 'https://twitter.com', icon: 'Twitter' },
      { platform: 'linkedin', url: 'https://linkedin.com', icon: 'Linkedin' },
      { platform: 'instagram', url: 'https://instagram.com', icon: 'Instagram' }
    ],
    bottomBar: {
      copyright: '© 2025 Pushpak O2. All rights reserved.',
      privacyLink: '/privacy-policy',
      termsLink: '/terms-condition'
    }
  });

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  // Dialog states
  const [isCTADialogOpen, setIsCTADialogOpen] = useState(false);
  const [isBrandDialogOpen, setIsBrandDialogOpen] = useState(false);
  const [isSectionDialogOpen, setIsSectionDialogOpen] = useState(false);
  const [isSocialLinkDialogOpen, setIsSocialLinkDialogOpen] = useState(false);
  const [isBottomBarDialogOpen, setIsBottomBarDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleEditCTA = () => {
    setIsCTADialogOpen(true);
  };

  const handleEditBrand = () => {
    setIsBrandDialogOpen(true);
  };

  const handleEditSection = (section) => {
    setEditingItem(section);
    setIsSectionDialogOpen(true);
  };

  const handleDeleteSection = (section) => {
    setSelectedItem(section);
    setSelectedType('section');
    setIsDeleteDialogOpen(true);
  };

  const handleAddSection = () => {
    setEditingItem(null);
    setIsSectionDialogOpen(true);
  };

  const handleEditSocialLink = (link) => {
    setEditingItem(link);
    setIsSocialLinkDialogOpen(true);
  };

  const handleDeleteSocialLink = (link) => {
    setSelectedItem(link);
    setSelectedType('socialLink');
    setIsDeleteDialogOpen(true);
  };

  const handleAddSocialLink = () => {
    setEditingItem(null);
    setIsSocialLinkDialogOpen(true);
  };

  const handleEditBottomBar = () => {
    setIsBottomBarDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedType === 'section') {
      setFooterData(prev => ({
        ...prev,
        sections: prev.sections.filter(s => s.id !== selectedItem.id)
      }));
    } else if (selectedType === 'socialLink') {
      setFooterData(prev => ({
        ...prev,
        socialLinks: prev.socialLinks.filter(l => l.platform !== selectedItem.platform)
      }));
    }
    setIsDeleteDialogOpen(false);
    setSelectedItem(null);
    setSelectedType(null);
  };

  const handleSaveCTA = (ctaData) => {
    setFooterData(prev => ({
      ...prev,
      cta: ctaData
    }));
  };

  const handleSaveBrand = (brandData) => {
    setFooterData(prev => ({
      ...prev,
      brand: brandData
    }));
  };

  const handleSaveSection = (sectionData) => {
    if (editingItem) {
      // Edit existing section
      setFooterData(prev => ({
        ...prev,
        sections: prev.sections.map(s => s.id === editingItem.id ? { ...sectionData, id: editingItem.id } : s)
      }));
    } else {
      // Add new section
      const newSection = {
        ...sectionData,
        id: Date.now().toString()
      };
      setFooterData(prev => ({
        ...prev,
        sections: [...prev.sections, newSection]
      }));
    }
  };

  const handleSaveSocialLink = (linkData) => {
    if (editingItem) {
      // Edit existing link
      setFooterData(prev => ({
        ...prev,
        socialLinks: prev.socialLinks.map(l => l.platform === editingItem.platform ? linkData : l)
      }));
    } else {
      // Add new link
      setFooterData(prev => ({
        ...prev,
        socialLinks: [...prev.socialLinks, linkData]
      }));
    }
  };

  const handleSaveBottomBar = (bottomBarData) => {
    setFooterData(prev => ({
      ...prev,
      bottomBar: bottomBarData
    }));
  };

  const closeDialogs = () => {
    setIsDeleteDialogOpen(false);
    setSelectedItem(null);
    setSelectedType(null);
    setIsCTADialogOpen(false);
    setIsBrandDialogOpen(false);
    setIsSectionDialogOpen(false);
    setIsSocialLinkDialogOpen(false);
    setIsBottomBarDialogOpen(false);
    setEditingItem(null);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Footer Management</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CTA Section */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Call-to-Action Section</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
              <p className="text-white bg-gray-700 p-3 rounded">{footerData.cta.title}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Subtitle</label>
              <p className="text-white bg-gray-700 p-3 rounded text-sm">{footerData.cta.subtitle}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Primary Button</label>
                <p className="text-white bg-gray-700 p-2 rounded text-sm">{footerData.cta.primaryButton}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Secondary Button</label>
                <p className="text-white bg-gray-700 p-2 rounded text-sm">{footerData.cta.secondaryButton}</p>
              </div>
            </div>
            <button onClick={handleEditCTA} className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition">Edit CTA</button>
          </div>
        </div>

        {/* Brand Section */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Brand Section</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
              <p className="text-white bg-gray-700 p-3 rounded text-sm">{footerData.brand.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <p className="text-white bg-gray-700 p-2 rounded text-sm">{footerData.brand.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                <p className="text-white bg-gray-700 p-2 rounded text-sm">{footerData.brand.phone}</p>
              </div>
            </div>
            <button onClick={handleEditBrand} className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition">Edit Brand</button>
          </div>
        </div>

        {/* Footer Sections */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Footer Sections</h3>
            <button onClick={handleAddSection} className="bg-green-600 px-3 py-1 rounded-lg hover:bg-green-700 transition text-sm flex items-center gap-1">
              <Plus className="w-3 h-3" />
              Add Section
            </button>
          </div>
          <div className="space-y-3">
            {footerData.sections.map((section) => (
              <div key={section.id} className="bg-gray-700 p-3 rounded">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-white font-medium">{section.title}</h4>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleEditSection(section)} className="text-yellow-400 hover:text-yellow-300">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDeleteSection(section)} className="text-red-400 hover:text-red-300">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="text-sm text-gray-300">
                  {section.links.length} links
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Social Links</h3>
            <button onClick={handleAddSocialLink} className="bg-green-600 px-3 py-1 rounded-lg hover:bg-green-700 transition text-sm flex items-center gap-1">
              <Plus className="w-3 h-3" />
              Add Link
            </button>
          </div>
          <div className="space-y-3">
            {footerData.socialLinks.map((link) => (
              <div key={link.platform} className="flex items-center justify-between bg-gray-700 p-3 rounded">
                <div className="flex items-center gap-2">
                  <span className="text-white">{link.icon}</span>
                  <span className="text-white text-sm">{link.platform}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleEditSocialLink(link)} className="text-yellow-400 hover:text-yellow-300">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDeleteSocialLink(link)} className="text-red-400 hover:text-red-300">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-gray-800 p-6 rounded-lg lg:col-span-2">
          <h3 className="text-xl font-semibold mb-4">Bottom Bar</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Copyright Text</label>
              <p className="text-white bg-gray-700 p-3 rounded">{footerData.bottomBar.copyright}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Privacy Policy Link</label>
                <p className="text-white bg-gray-700 p-2 rounded text-sm">{footerData.bottomBar.privacyLink}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Terms Link</label>
                <p className="text-white bg-gray-700 p-2 rounded text-sm">{footerData.bottomBar.termsLink}</p>
              </div>
            </div>
            <button onClick={handleEditBottomBar} className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition">Edit Bottom Bar</button>
          </div>
        </div>
      </div>

      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={closeDialogs}
        onConfirm={handleConfirmDelete}
        title={`Delete ${selectedType === 'section' ? 'Section' : 'Social Link'}`}
        itemName={selectedItem?.title || selectedItem?.platform}
        itemType={selectedType === 'section' ? 'footer section' : 'social link'}
      />

      <AddEditFooterCTADialog
        isOpen={isCTADialogOpen}
        onClose={closeDialogs}
        onSave={handleSaveCTA}
        initialData={footerData.cta}
      />

      <AddEditFooterBrandDialog
        isOpen={isBrandDialogOpen}
        onClose={closeDialogs}
        onSave={handleSaveBrand}
        initialData={footerData.brand}
      />

      <AddEditFooterSectionDialog
        isOpen={isSectionDialogOpen}
        onClose={closeDialogs}
        onSave={handleSaveSection}
        initialData={editingItem}
      />

      <AddEditFooterSocialLinkDialog
        isOpen={isSocialLinkDialogOpen}
        onClose={closeDialogs}
        onSave={handleSaveSocialLink}
        initialData={editingItem}
      />

      <AddEditFooterBottomBarDialog
        isOpen={isBottomBarDialogOpen}
        onClose={closeDialogs}
        onSave={handleSaveBottomBar}
        initialData={footerData.bottomBar}
      />
    </div>
  );
}