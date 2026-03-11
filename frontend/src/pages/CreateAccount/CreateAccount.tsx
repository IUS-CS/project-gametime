import { useState } from "react";
import styles from "./CreateAccount.module.css";

export default function CreateAccount() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== repeatPassword) {
            setMessage("Passwords do not match");
            return;
        }

        fetch('http://127.0.0.1:8000/gametime/create-account/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Network response was not ok: " + res.statusText);
            }
            return res.json();
        })
        .then((data) => {
            setMessage("Account created successfully!");
            localStorage.setItem("username", username);
            localStorage.setItem("token", data.token);
        })
        .catch((err) => {
            setMessage("Error creating account.");
            console.error("Error creating account:", err);
        });
    };

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <h2>Create Account</h2>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        className={styles.input}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        className={styles.input}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className={styles.input}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Repeat Password"
                        className={styles.input}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                    />

                    <button type="submit" className={styles.button}>
                        Create Account
                    </button>
                </form>
                <p>{message}</p>
            </div>
        </div>
    );
}