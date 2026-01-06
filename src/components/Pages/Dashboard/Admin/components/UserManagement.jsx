import { mockUsers } from '@/lib/mockUsers';
import { Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { AddEditUserDialog, ViewUserDialog } from './UserOperations';
import { DeleteDialog } from '@/components/ui/DeleteDialog';

export default function UserManagement() {
  const [users, setUsers] = useState(mockUsers);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'investor',
    source: '',
    status: 'new',
  });

  const handleAddUser = () => {
    setFormData({
      name: '',
      email: '',
      type: 'investor',
      source: '',
      status: 'new',
    });
    setIsAddDialogOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      type: user.type,
      source: user.source,
      status: user.status,
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsViewDialogOpen(true);
  };

  const handleSubmitAdd = () => {
    const newUser = {
      ...formData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setUsers([...users, newUser]);
    setIsAddDialogOpen(false);
  };

  const handleSubmitEdit = () => {
    const updatedUser = {
      ...selectedUser,
      ...formData,
    };
    setUsers(users.map(user => user.id === selectedUser.id ? updatedUser : user));
    setIsEditDialogOpen(false);
    setSelectedUser(null);
  };

  const handleConfirmDelete = () => {
    setUsers(users.filter(user => user.id !== selectedUser.id));
    setIsDeleteDialogOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">User Management</h2>
        <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2" onClick={handleAddUser}>
          <Plus className="w-4 h-4" />
          Add New User
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Source</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-750">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-white">{user.name}</div>
                      <div className="text-sm text-gray-400">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300 capitalize">{user.type}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{user.source}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.status === 'new' ? 'bg-blue-600 text-white' :
                      user.status === 'contacted' ? 'bg-yellow-600 text-white' :
                      user.status === 'qualified' ? 'bg-green-600 text-white' : 'bg-purple-600 text-white'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-400 hover:text-blue-300 transition-colors" onClick={() => handleViewUser(user)}>
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-yellow-400 hover:text-yellow-300 transition-colors" onClick={() => handleEditUser(user)}>
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-400 hover:text-red-300 transition-colors" onClick={() => handleDeleteUser(user)}>
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

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-blue-400">{users.length}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">New Users</h3>
          <p className="text-3xl font-bold text-green-400">{users.filter(u => u.status === 'new').length}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Qualified Leads</h3>
          <p className="text-3xl font-bold text-yellow-400">{users.filter(u => u.status === 'qualified').length}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Converted</h3>
          <p className="text-3xl font-bold text-purple-400">{users.filter(u => u.status === 'converted').length}</p>
        </div>
      </div>

      <AddEditUserDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSubmit={handleSubmitAdd}
        formData={formData}
        setFormData={setFormData}
        isEdit={false}
      />

      <AddEditUserDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSubmit={handleSubmitEdit}
        formData={formData}
        setFormData={setFormData}
        isEdit={true}
      />

      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete User"
        itemName={selectedUser?.name}
        itemType="user"
      />

      <ViewUserDialog
        isOpen={isViewDialogOpen}
        onClose={() => setIsViewDialogOpen(false)}
        user={selectedUser}
      />
    </div>
  );
}