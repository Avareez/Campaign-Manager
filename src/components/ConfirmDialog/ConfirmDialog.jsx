import { Trash2 } from 'lucide-react';
import Modal from '../Modal/Modal';
import styles from './ConfirmDialog.module.scss';

function ConfirmDialog({ isOpen, onClose, onConfirm, campaignName }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Delete Campaign">
            <div className={styles.content}>
                <div className={styles.iconWrapper}>
                    <Trash2 size={32} className={styles.icon} />
                </div>
                <p className={styles.message}>
                    Are you sure you want to delete{' '}
                    <strong>"{campaignName}"</strong>?
                </p>
                <p className={styles.hint}>
                    The campaign fund will be returned to your Emerald balance.
                    This action cannot be undone.
                </p>
                <div className={styles.actions}>
                    <button className={styles.btnCancel} onClick={onClose}>
                        Cancel
                    </button>
                    <button className={styles.btnConfirm} onClick={onConfirm}>
                        <Trash2 size={16} />
                        Delete Campaign
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default ConfirmDialog;