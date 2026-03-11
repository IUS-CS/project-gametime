import { useNavigate } from "react-router";
import styles from "./Account.module.css";
import { useEffect, useState } from "react";
import Authentication from "../../auth/authentication";
import type {userInfo}  from "../../types/types";



export default function Account() {
        const navigate = useNavigate();
        const url = 'http://127.0.0.1:8000/gametime/user/account/';
        const [data, setData] = useState<userInfo | null>(null);
        const token = localStorage.getItem("token");
      

        useEffect( () => {
        async function loadAccount() {
        try{
        

            const res = await Authentication(url, token || "");
          
            if(res?.status === 401){
                navigate("/sign-in");
                return;
            }
            const data = await res.json();
            setData(data);
            

        }catch(err){
            console.error("Account page error:", err);
            navigate("/sign-in");
                return;
        }
    }
    loadAccount();
    },[]);




    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <h2>Account</h2>
                <p>{data?.username}</p>
                <p>{data?.email}</p>
                <p>{data?.date_joined}</p>
                <p>Followers: {data?.followers}</p>


                 <button onClick={() => {
                localStorage.clear();
                navigate("/sign-in");
            }} className={styles.signOutButton}>Sign Out</button>
            </div>
           
        </div>
    );
}