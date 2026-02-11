import styles from "./Home.module.css";

export default function Home() {
    return (
        <div className={styles.page}>
            <button className={styles.button}>Click me</button>
        </div>
    );
}
