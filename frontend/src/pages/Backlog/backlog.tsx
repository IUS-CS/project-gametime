import styles from "./backlog.module.css";
import { useEffect, useState } from "react";
import type { BacklogGame } from "../../types/types";
import { getBacklog } from "../../api/endpoints";




export default function Backlog() {

    
const [backlog, setBacklog] = useState<BacklogGame[]>([]);
const token = localStorage.getItem("token");

useEffect(() => {
async function fetchBacklog() {
    const backlogData = await getBacklog(token || "");
    console.log("Backlog data:", backlogData);
    setBacklog(backlogData);
}


fetchBacklog(); 
}, []);




    return (
        <div className={styles.page}>
        <div className={styles.panel}>
                    <h3>Backlog</h3>

                    <div className={styles.favoriteGrid}>
                        {backlog && backlog.map((game) => (
                            <div key={game.id} className={styles.resultItem}>
                                <h4 className={styles.title}>{game.name}</h4>
                                {game.cover && (
                                    <img className={styles.image}
                                        src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`}
                                        alt={`${game.name} cover`}
                                    />
                                )}

                            </div>
                        ))}
                    </div>
                </div>
        </div>
    );
}


