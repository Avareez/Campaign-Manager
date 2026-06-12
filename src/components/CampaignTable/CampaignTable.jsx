import { Pencil, Trash2 } from 'lucide-react';
import styles from './CampaignTable.module.scss';

function CampaignTable({ campaigns, onEdit, onDelete }) {
    if (campaigns.length === 0) {
        return (
            <div className={styles.empty}>
                <p>No campaigns yet. Create your first one!</p>
            </div>
        );
    }

    return (
        <div className={styles.wrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Keywords</th>
                        <th>Bid</th>
                        <th>Fund</th>
                        <th>Status</th>
                        <th>Town</th>
                        <th>Radius</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {campaigns.map((campaign) => (
                        <tr key={campaign.id}>
                            <td data-label="Name">{campaign.name}</td>
                            <td data-label="Keywords">
                                <div className={styles.keywords}>
                                    {campaign.keywords.map((kw) => (
                                        <span key={kw} className={styles.keyword}>{kw}</span>
                                    ))}
                                </div>
                            </td>
                            <td data-label="Bid">${campaign.bidAmount.toFixed(2)}</td>
                            <td data-label="Fund">${campaign.campaignFund.toFixed(2)}</td>
                            <td data-label="Status">
                                <span className={`${styles.status} ${styles[campaign.status]}`}>
                                    {campaign.status.toUpperCase()}
                                </span>
                            </td>
                            <td data-label="Town">{campaign.town || '—'}</td>
                            <td data-label="Radius">{campaign.radius} km</td>
                            <td data-label="Actions">
                                <div className={styles.actions}>
                                    <button
                                        className={styles.btnEdit}
                                        onClick={() => onEdit(campaign)}
                                        aria-label="Edit campaign"
                                    >
                                        <Pencil size={16} />
                                    </button>
                                    <button
                                        className={styles.btnDelete}
                                        onClick={() => onDelete(campaign)}
                                        aria-label="Delete campaign"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CampaignTable;