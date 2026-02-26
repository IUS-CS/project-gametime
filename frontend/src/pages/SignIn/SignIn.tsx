import styles from "./SignIn.module.css";

export default function SignIn() {
    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <h2>Sign In</h2>

                <form className={styles.form}>
                    <input
                        type="text"
                        placeholder="Username"
                        className={styles.input}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className={styles.input}
                    />

                    <button type="submit" className={styles.button}>
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}