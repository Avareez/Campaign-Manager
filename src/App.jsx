import { useState } from 'react';
import Header from './components/Layout/Header';
import CampaignListPage from './pages/CampaignListPage';

function App() {
  const [editingCampaign, setEditingCampaign] = useState(null);

  const handleEdit = (campaign) => {
    setEditingCampaign(campaign);
    console.log('Edit:', campaign);
  };

  const handleAdd = () => {
    setEditingCampaign(null);
    console.log('Add new campaign');
  };

  return (
    <div className="app">
      <Header />
      <CampaignListPage
        onEdit={handleEdit}
        onAdd={handleAdd}
      />
    </div>
  );
}

export default App;