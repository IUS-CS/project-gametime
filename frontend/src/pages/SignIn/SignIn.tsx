import { useState } from "react";
import styles from "./SignIn.module.css";
import type { userSignIn } from "../../types/types";

export default function SignIn() {

    const token = localStorage.getItem("token");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle sign-in logic here
        const payload: userSignIn = {
            username: username,
            password: password
        };
        fetch('http://127.0.0.1:8000/gametime/sign-in/',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify(payload),
            }
        )
            .then((res) => {
                if (!res.ok) {
                    setMessage("incorrect username or password");
                    console.error("Sign-in failed");
                    throw new Error("Network response was not ok: " + res.statusText);
                }   
                return res.json();
            })
            .then((data) => {
                localStorage.setItem("username", username)
                localStorage.setItem("token", data.token);

                setMessage("Sign-in successful! Welcome back, " + username);  
            })
            .catch((err) => console.error("Sign-in error:", err));

    };

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <h2>Sign In</h2>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        className={styles.input}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className={styles.input}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit" className={styles.button}>
                        Sign In
                    </button>
                </form>
                <p>{message}</p>
            </div>
        </div>
    );
}