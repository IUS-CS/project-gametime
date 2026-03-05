import { useParams, useSearchParams } from "react-router-dom";
import type { gameObject } from "../../types/types";
import { useEffect, useState } from "react";
import styles from "./gamePage.module.css";



function GamePage() {

    const [game, setGame] = useState<gameObject | null>(null);

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (!id) return;

        fetch(`http://127.0.0.1:8000/gametime/game/${id}/`)
            .then((res) => res.json())
            .then((data) => {
                setGame(data[0] ?? null);
            })
            .catch((err) => console.error("Game page error:", err));
    }, [id]);

    return (
        <div className={styles.hero}>
            <div className={styles.cover}>
                {game?.cover?.image_id && (
                    <img
                        src={`https://images.igdb.com/igdb/image/upload/t_720p/${game.cover.image_id}.jpg`}
                        alt={game.name}
                    
                    />
                )}
            </div>
            <div className={styles.info}>
            <h1>{game?.name}</h1>
            <p className={styles.summary}>{game?.summary}</p>
            </div>
            <div>
                <h2>{game?.first_release_date}</h2>
                <h2>Rating: {game?.total_rating ? Math.round(game.total_rating) : "N/A"}</h2>
                <h2>Companies: {game?.involved_companies?.map(c => c.company.name).join(", ") || "N/A"}</h2>
                <h2>Age Rating: {game?.age_ratings?.[0] ? `${game.age_ratings[0].organization} ${game.age_ratings[0].rating_category}` : "N/A"}</h2>

            </div>
        </div>
    );
}

export default GamePage;