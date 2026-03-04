import styles from "./Account.module.css";

export default function Account() {
    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <h2>Account</h2>

                <form className={styles.form}>
                    <label className={styles.label}>Username</label>

                    <input
                        type="text"
                        placeholder="Username"
                        className={styles.input}
                    />

                </form>
            </div>
        </div>
    );
}