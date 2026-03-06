import { useParams, useSearchParams } from "react-router-dom";
import type { gameObject } from "../../types/types";
import { useEffect, useState } from "react";
import styles from "./gamePage.module.css";
import { fromUnixTime, format } from "date-fns";




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

    const time = game?.first_release_date ? format(fromUnixTime(game.first_release_date), "MMMM d, yyyy") : "N/A";
    const esrb = game?.age_ratings?.find(r => r.organization === 1);
    const esrbMap: Record<number, string> = {
        6: "esrb_m",
        7: "esrb_ao",
        5: "esrb_t",
        3: "esrb_e",
        4: "esrb_e10",
        2: "esrb_ec",
        12: "esrb_rp"
    };


    return (
        <div className={styles.hero}>
            <div className={styles.cover}>
                {game?.cover?.image_id && (
                    <img
                        src={`https://images.igdb.com/igdb/image/upload/t_720p/${game.cover.image_id}.jpg`}
                        alt={game.name}

                    />
                )}
                <div className={styles.records}>
                    <p>Release Date: {time}</p>
                    <p>Rating: {game?.total_rating ? Math.round(game.total_rating) : "N/A"}</p>
                    <p>Developers: {game?.involved_companies?.map(c => c.company.name).join(", ") || "N/A"}</p>
                    <p>ESRB Rating: </p>
                    {esrb && (
                        <img 
                            src={`/esrb/${esrbMap[esrb.rating_category]}.svg`}
                            alt="ESRB rating"
                            style={{ width: "120px" }}
                        />
                    )}
                </div>
            </div>
            <div className={styles.info}>
                <h1>{game?.name}</h1>
                <p className={styles.summary}>{game?.summary}</p>
                <hr></hr>
                <br></br>
                <h2>Reviews: </h2>
            </div>
            
        </div>
    );
}

export default GamePage;