import styles from "./CreateAccount.module.css";

export default function CreateAccount() {
    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <h2>Create Account</h2>

                <form className={styles.form}>
                    <input
                        type="text"
                        placeholder="Username"
                        className={styles.input}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        className={styles.input}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className={styles.input}
                    />

                    <input
                        type="password"
                        placeholder="Repeat Password"
                        className={styles.input}
                    />

                    <button type="submit" className={styles.button}>
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    );
}