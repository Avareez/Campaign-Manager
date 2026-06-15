import { useState } from 'react';
import { useApp } from './context/AppContext';
import Header from './components/Layout/Header';
import CampaignListPage from './pages/CampaignListPage';
import Modal from './components/Modal/Modal';
import CampaignForm from './components/CampaignForm/CampaignForm';
import ConfirmDialog from './components/ConfirmDialog/ConfirmDialog';

function App() {
  const { deleteCampaign } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [deletingCampaign, setDeletingCampaign] = useState(null);

  const handleAdd = () => {
    setEditingCampaign(null);
    setIsModalOpen(true);
  };

  const handleEdit = (campaign) => {
    setEditingCampaign(campaign);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingCampaign(null);
  };

  const handleDeleteRequest = (campaign) => {
    setDeletingCampaign(campaign);
  };

  const handleDeleteClose = () => {
    setDeletingCampaign(null);
  };

  return (
    <div className="app">
      <Header />
      <CampaignListPage
        onEdit={handleEdit}
        onAdd={handleAdd}
        onDelete={handleDeleteRequest}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        title={editingCampaign ? 'Edit Campaign' : 'New Campaign'}
      >
        <CampaignForm
          campaign={editingCampaign}
          onClose={handleClose}
        />
      </Modal>
      <ConfirmDialog
        isOpen={Boolean(deletingCampaign)}
        onClose={handleDeleteClose}
        onConfirm={() => {
          deleteCampaign(deletingCampaign.id);
          handleDeleteClose();
        }}
        campaignName={deletingCampaign?.name}
      />
    </div>
  );
}

export default App;