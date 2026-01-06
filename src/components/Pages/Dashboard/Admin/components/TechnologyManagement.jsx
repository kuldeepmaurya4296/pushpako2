import { mockTechnologies } from '@/lib/mockTechnologies';
import { Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { AddEditTechnologyDialog, ViewTechnologyDialog } from './TechnologyOperations';
import { DeleteDialog } from '@/components/ui/DeleteDialog';

export default function TechnologyManagement() {
  const [technologies, setTechnologies] = useState(mockTechnologies);
  const [dialogState, setDialogState] = useState({
    add: false,
    edit: false,
    view: false,
    delete: false,
  });
  const [selectedTechnology, setSelectedTechnology] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    status: 'active',
    version: '',
    downloads: 0,
    featuredImage: '',
  });

  const handleOpenDialog = (type, technology = null) => {
    setSelectedTechnology(technology);
    if (type === 'edit' && technology) {
      setFormData({
        title: technology.title,
        description: technology.description,
        category: technology.category,
        status: technology.status,
        version: technology.version,
        downloads: technology.downloads,
        featuredImage: technology.featuredImage,
      });
    } else if (type === 'add') {
      setFormData({
        title: '',
        description: '',
        category: '',
        status: 'active',
        version: '',
        downloads: 0,
        featuredImage: '',
      });
    }
    setDialogState(prev => ({ ...prev, [type]: true }));
  };

  const handleCloseDialog = () => {
    setDialogState({
      add: false,
      edit: false,
      view: false,
      delete: false,
    });
    setSelectedTechnology(null);
  };

  const handleConfirmDelete = () => {
    setTechnologies(technologies.filter(tech => tech.id !== selectedTechnology.id));
    handleCloseDialog();
  };

  const handleSubmitAdd = () => {
    const newTechnology = {
      ...formData,
      id: Date.now().toString(),
      views: 0,
    };
    setTechnologies([...technologies, newTechnology]);
    setFormData({
      title: '',
      description: '',
      category: '',
      status: 'active',
      version: '',
      downloads: 0,
      featuredImage: '',
    });
    handleCloseDialog();
  };

  const handleSubmitEdit = () => {
    const updatedTechnology = {
      ...selectedTechnology,
      ...formData,
    };
    setTechnologies(technologies.map(tech => tech.id === selectedTechnology.id ? updatedTechnology : tech));
    handleCloseDialog();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Technology Management</h2>
        <button onClick={() => handleOpenDialog('add')} className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add New Technology
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Technology</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Version</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Downloads</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {technologies.map((tech) => (
                <tr key={tech.id} className="hover:bg-gray-750">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img className="h-10 w-10 rounded-lg object-cover" src={tech.featuredImage} alt={tech.title} />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">{tech.title}</div>
                        <div className="text-sm text-gray-400">{tech.description.substring(0, 50)}...</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">{tech.category}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${tech.status === 'active' ? 'bg-green-600 text-white' :
                        tech.status === 'development' ? 'bg-yellow-600 text-white' : 'bg-gray-600 text-white'
                      }`}>
                      {tech.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">{tech.version}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{tech.downloads}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleOpenDialog('view', tech)} className="text-blue-400 hover:text-blue-300 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleOpenDialog('edit', tech)} className="text-yellow-400 hover:text-yellow-300 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleOpenDialog('delete', tech)} className="text-red-400 hover:text-red-300 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Technology Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Total Technologies</h3>
          <p className="text-3xl font-bold text-blue-400">{technologies.length}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Active</h3>
          <p className="text-3xl font-bold text-green-400">{technologies.filter(t => t.status === 'active').length}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Total Downloads</h3>
          <p className="text-3xl font-bold text-yellow-400">{technologies.reduce((sum, t) => sum + t.downloads, 0)}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Total Views</h3>
          <p className="text-3xl font-bold text-purple-400">{technologies.reduce((sum, t) => sum + t.views, 0)}</p>
        </div>
      </div>

      <DeleteDialog
        isOpen={dialogState.delete}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
        title="Delete Technology"
        itemName={selectedTechnology?.title}
        itemType="technology"
      />

      {/* Add / Edit Technology Dialog */}
      <AddEditTechnologyDialog
        isOpen={dialogState.add || dialogState.edit}
        isEdit={dialogState.edit}
        onClose={handleCloseDialog}
        onSubmit={dialogState.add ? handleSubmitAdd : handleSubmitEdit}
        formData={formData}
        setFormData={setFormData}
      />

      {/* View Technology Dialog */}
      <ViewTechnologyDialog
        isOpen={dialogState.view}
        technology={selectedTechnology}
        onClose={handleCloseDialog}
      />

    </div>
  );
}