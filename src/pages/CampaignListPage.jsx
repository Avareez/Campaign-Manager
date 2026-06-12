import { useState } from 'react';
import { useApp } from '../context/AppContext';
import CampaignTable from '../components/CampaignTable/CampaignTable';
import styles from './CampaignListPage.module.scss';
import { Plus } from 'lucide-react';

function CampaignListPage({ onEdit, onAdd }) {
    const { campaigns } = useApp();

    return (
        <main className={styles.page}>
            <div className={styles.inner}>
                <div className={styles.topBar}>
                    <div>
                        <h1 className={styles.title}>Campaigns</h1>
                        <p className={styles.subtitle}>{campaigns.length} campaign{campaigns.length !== 1 ? 's' : ''} total</p>
                    </div>
                    <button className={styles.btnAdd} onClick={onAdd}>
                        <Plus size={18} />
                        New Campaign
                    </button>
                </div>
                <CampaignTable
                    campaigns={campaigns}
                    onEdit={onEdit}
                    onDelete={() => { }}
                />
            </div>
        </main>
    );
}

export default CampaignListPage;