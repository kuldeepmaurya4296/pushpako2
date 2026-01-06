import { mockInvestors } from '@/lib/mockInvestors';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import InvestorsTable from '../components/InvestorsTable';
import InvestorsStats from '../components/InvestorsStats';
import AddInvestorDialog from '../components/AddInvestorDialog';
import EditInvestorDialog from '../components/EditInvestorDialog';
import ViewInvestorDialog from '../components/ViewInvestorDialog';
import { DeleteDialog } from '@/components/ui/DeleteDialog';

export default function InvestorsTab() {
  const [investors, setInvestors] = useState(mockInvestors);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedInvestor, setSelectedInvestor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    investmentAmount: '',
    type: 'individual',
    riskProfile: 'moderate',
    investmentStage: 'seed',
    status: 'active',
    notes: '',
  });

  const handleAddInvestor = () => {
    const newInvestor = {
      id: Date.now().toString(),
      ...formData,
      investmentAmount: parseFloat(formData.investmentAmount),
      currentValue: parseFloat(formData.investmentAmount) * 1.1, // simple calc
      roi: 10,
      joinDate: new Date().toISOString().split('T')[0],
      profilePicture: '/next.svg', // default
      portfolio: [{ company: 'Pushpak O2', percentage: 100, invested: parseFloat(formData.investmentAmount), current: parseFloat(formData.investmentAmount) * 1.1 }],
      communicationLog: [],
      documents: [],
      lastContact: new Date().toISOString().split('T')[0],
      nextFollowUp: '',
      tags: [],
    };
    setInvestors([...investors, newInvestor]);
    setIsAddDialogOpen(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      investmentAmount: '',
      type: 'individual',
      riskProfile: 'moderate',
      investmentStage: 'seed',
      status: 'active',
      notes: '',
    });
  };

  const handleEditInvestor = () => {
    setInvestors(investors.map(inv => inv.id === selectedInvestor.id ? { ...inv, ...formData, investmentAmount: parseFloat(formData.investmentAmount) } : inv));
    setIsEditDialogOpen(false);
    setSelectedInvestor(null);
  };

  const handleDeleteInvestor = () => {
    setInvestors(investors.filter(inv => inv.id !== selectedInvestor.id));
    setIsDeleteDialogOpen(false);
    setSelectedInvestor(null);
  };

  const openEditDialog = (investor) => {
    setSelectedInvestor(investor);
    setFormData({
      name: investor.name,
      email: investor.email,
      phone: investor.phone,
      investmentAmount: investor.investmentAmount.toString(),
      type: investor.type,
      riskProfile: investor.riskProfile,
      investmentStage: investor.investmentStage,
      status: investor.status,
      notes: investor.notes,
    });
    setIsEditDialogOpen(true);
  };

  const openViewDialog = (investor) => {
    setSelectedInvestor(investor);
    setIsViewDialogOpen(true);
  };

  const openDeleteDialog = (investor) => {
    setSelectedInvestor(investor);
    setIsDeleteDialogOpen(true);
  };

  const closeDialogs = () => {
    setIsAddDialogOpen(false);
    setIsEditDialogOpen(false);
    setIsViewDialogOpen(false);
    setIsDeleteDialogOpen(false);
    setSelectedInvestor(null);
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Investors Management</h2>
        <button onClick={() => setIsAddDialogOpen(true)} className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add New Investor
        </button>
      </div>

      <InvestorsTable
        investors={investors}
        onView={openViewDialog}
        onEdit={openEditDialog}
        onDelete={openDeleteDialog}
      />

      <InvestorsStats investors={investors} />

      <AddInvestorDialog
        isOpen={isAddDialogOpen}
        onClose={closeDialogs}
        onSubmit={handleAddInvestor}
        formData={formData}
        setFormData={setFormData}
      />

      <EditInvestorDialog
        isOpen={isEditDialogOpen}
        onClose={closeDialogs}
        onSubmit={handleEditInvestor}
        formData={formData}
        setFormData={setFormData}
      />

      <ViewInvestorDialog
        isOpen={isViewDialogOpen}
        onClose={closeDialogs}
        investor={selectedInvestor}
      />

      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={closeDialogs}
        onConfirm={handleDeleteInvestor}
        title="Delete Investor"
        itemName={selectedInvestor?.name}
        itemType="investor"
      />
    </div>
  );
}