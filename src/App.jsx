import { useState } from 'react';
import Header from './components/Layout/Header';
import CampaignListPage from './pages/CampaignListPage';
import Modal from './components/Modal/Modal';
import CampaignForm from './components/CampaignForm/CampaignForm';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);

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

  return (
    <div className="app">
      <Header />
      <CampaignListPage
        onEdit={handleEdit}
        onAdd={handleAdd}
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
    </div>
  );
}

export default App;