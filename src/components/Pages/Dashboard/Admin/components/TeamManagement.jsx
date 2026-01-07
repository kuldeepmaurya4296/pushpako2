import { mockTeam } from '@/lib/mockTeam';
import { Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { AddEditTeamDialog, ViewTeamDialog } from './TeamOperations';
import { DeleteDialog } from '@/components/ui/DeleteDialog';

export default function TeamManagement() {
  const [team, setTeam] = useState(mockTeam);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const handleAddMember = () => {
    setIsAddDialogOpen(true);
  };

  const handleEditMember = (member) => {
    setSelectedMember(member);
    setIsEditDialogOpen(true);
  };

  const handleViewMember = (member) => {
    setSelectedMember(member);
    setIsViewDialogOpen(true);
  };

  const handleDeleteMember = (member) => {
    setSelectedMember(member);
    setIsDeleteDialogOpen(true);
  };

  const handleSaveMember = (memberData) => {
    if (selectedMember) {
      // Edit existing member
      const updatedMember = {
        ...selectedMember,
        ...memberData,
        role: memberData.position, // Map position back to role
        id: selectedMember.id,
        department: selectedMember.department, // Keep existing department
        isActive: selectedMember.isActive, // Keep existing status
        order: selectedMember.order, // Keep existing order
      };
      setTeam(team.map(m => m.id === selectedMember.id ? updatedMember : m));
      setSelectedMember(null);
    } else {
      // Add new member
      const newMember = {
        ...memberData,
        role: memberData.position, // Map position to role
        id: Date.now().toString(),
        department: 'Engineering', // Default department
        isActive: true,
        order: team.length + 1,
      };
      setTeam([...team, newMember]);
    }
    setIsAddDialogOpen(false);
    setIsEditDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    setTeam(team.filter(m => m.id !== selectedMember.id));
    setIsDeleteDialogOpen(false);
    setSelectedMember(null);
  };

  const closeDialogs = () => {
    setIsAddDialogOpen(false);
    setIsEditDialogOpen(false);
    setIsViewDialogOpen(false);
    setIsDeleteDialogOpen(false);
    setSelectedMember(null);
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Team Management</h2>
        <button onClick={handleAddMember} className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add New Member
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Member</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {team.map((member) => (
                <tr key={member.id} className="hover:bg-gray-750">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img className="h-10 w-10 rounded-full object-cover" src={member.image} alt={member.name} />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">{member.name}</div>
                        <div className="text-sm text-gray-400">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">{member.role}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{member.department}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{member.location}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      member.isActive ? 'bg-green-600 text-white' : 'bg-gray-600 text-white'
                    }`}>
                      {member.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleViewMember(member)} className="text-blue-400 hover:text-blue-300 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleEditMember(member)} className="text-yellow-400 hover:text-yellow-300 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDeleteMember(member)} className="text-red-400 hover:text-red-300 transition-colors">
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

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Total Members</h3>
          <p className="text-3xl font-bold text-blue-400">{team.length}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Active Members</h3>
          <p className="text-3xl font-bold text-green-400">{team.filter(m => m.isActive).length}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Departments</h3>
          <p className="text-3xl font-bold text-yellow-400">{new Set(team.map(m => m.department)).size}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Locations</h3>
          <p className="text-3xl font-bold text-purple-400">{new Set(team.map(m => m.location)).size}</p>
        </div>
      </div>

      <AddEditTeamDialog
        isOpen={isAddDialogOpen}
        onClose={closeDialogs}
        onSave={handleSaveMember}
        member={null}
      />

      <AddEditTeamDialog
        isOpen={isEditDialogOpen}
        onClose={closeDialogs}
        onSave={handleSaveMember}
        member={selectedMember ? {
          ...selectedMember,
          position: selectedMember.role, // Map role to position
          phone: selectedMember.phone || '',
          experience: selectedMember.experience || [],
        } : null}
      />

      <ViewTeamDialog
        isOpen={isViewDialogOpen}
        onClose={closeDialogs}
        member={selectedMember ? {
          ...selectedMember,
          position: selectedMember.role, // Map role to position
          phone: selectedMember.phone || '',
          experience: selectedMember.experience || [],
          socialLinks: {
            linkedin: selectedMember.linkedin,
            twitter: selectedMember.twitter,
            github: selectedMember.github,
          },
        } : null}
      />

      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={closeDialogs}
        onConfirm={handleConfirmDelete}
        title="Delete Team Member"
        itemName={selectedMember?.name}
        itemType="team member"
      />
    </div>
  );
}