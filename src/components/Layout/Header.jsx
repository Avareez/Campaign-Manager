import { useApp } from '../../context/AppContext';
import { ChartNoAxesCombined, Wallet } from 'lucide-react';
import styles from './Header.module.scss';

function Header() {
    const { balance } = useApp();

    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                <div className={styles.brand}>
                    <ChartNoAxesCombined className={styles.brandIcon} size={30} />
                    <span className={styles.brandName}>Campaign Manager</span>
                </div>
                <div className={styles.balance}>
                    <Wallet className={styles.balanceIcon} size={30} />
                    <div className={styles.balanceInfo}>
                        <span className={styles.balanceLabel}>Emerald Balance</span>
                        <span className={styles.balanceAmount}>
                            ${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;