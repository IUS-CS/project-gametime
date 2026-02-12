import { useState } from "react";
import styles from "./Home.module.css";

export default function Home() {
    const [message, setMessage] = useState("");

const handleClick = async() => {

    try{
       const res = await fetch('http://127.0.0.1:8000/gametime/health')
        const data = await res.json();
        setMessage(data.message);

    } catch (error) {
        console.error("Error Backend is down: ", error);
        setMessage("Backend is down");

    }

}




    return (
        <div className={styles.page}>
            <button onClick={handleClick} className={styles.button}>Click me</button>
            
            {message && <p className={styles.message}>{message}</p>}
            
        </div>
       
    );
}
