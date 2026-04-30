import styles from "./backlog.module.css";
import { useEffect, useState } from "react";
import type { BacklogGame } from "../../types/types";
import { getUserBacklog } from "../../api/endpoints";
import { useNavigate, useParams } from "react-router-dom";




export default function Backlog() {

    const { username } = useParams<{ username: string }>();

    const navigate = useNavigate();
    const [backlog, setBacklog] = useState<BacklogGame[]>([]);


    useEffect(() => {
        async function fetchBacklog() {
            const backlogData = await getUserBacklog(username || "");
            setBacklog(backlogData);
            console.log(backlogData);
        }


        fetchBacklog();
    }, []);




    return (
        <div className={styles.page}>
            <div className={styles.panel}>
                <h3>Completed</h3>
                <div className={styles.favoriteGrid}>
                    {backlog && backlog.map((game) => (
                        game.isCompleted && (
                            <div key={game.id} onClick={() => navigate(`/game/${game.id}`)} className={styles.resultItem}>
                                <h4 className={styles.title}>{game.name}</h4>
                                {game.cover && (
                                    <img className={styles.image}
                                        src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`}
                                        alt={`${game.name} cover`}
                                    />
                                )}

                            </div>
                        )
                    ))}
                </div>

                


            </div>
            <div className={styles.panel}>
                <h3>Backlog</h3>
                <div className={styles.favoriteGrid}>
                    {backlog && backlog.map((game) => (
                        !game.isCompleted && (
                            <div key={game.id} onClick={() => navigate(`/game/${game.id}`)} className={styles.resultItem}>
                                <h4 className={styles.title}>{game.name}</h4>
                                {game.cover && (
                                    <img className={styles.image}
                                        src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`}
                                        alt={`${game.name} cover`}
                                    />
                                )}

                            </div>
                        )
                    ))}
                </div>
            </div>
        </div>
    );
}


