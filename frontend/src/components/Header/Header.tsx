import styles from "./Header.module.css";
import { QuerySearch } from "../SearchBar/SearchBar";

type HeaderProps = {
    onSignIn?: () => void;
    onCreateAccount?: () => void;
    onAccount?: () => void;
};

export default function Header(props: HeaderProps) {
    const { onSignIn, onCreateAccount, onAccount } = props;

    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <div className={styles.brand}>GameTime</div>
            </div>

            <div className={styles.center}>
                <QuerySearch />
            </div>

            <div className={styles.right}>
                <button className={styles.linkButton} onClick={onSignIn}>
                    Sign In
                </button>

                <button className={styles.primaryButton} onClick={onCreateAccount}>
                    Create Account
                </button>

                <button
                    className={styles.iconButton}
                    aria-label="Account"
                    title="Account"
                    onClick={onAccount}
                >
                    <svg viewBox="0 0 24 24" width="22" height="22">
                        <path
                            d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2-8 4.5V20h16v-1.5c0-2.5-3.58-4.5-8-4.5Z"
                            fill="currentColor"
                        />
                    </svg>
                </button>
            </div>
        </header>
    );
}