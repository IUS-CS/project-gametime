import { useParams, useSearchParams } from "react-router-dom";
import type { searchResult } from "../../types/types";
import { useEffect, useState } from "react";
import styles from "./gamePage.module.css";



function GamePage() {

    const [results, setResults] = useState<searchResult | null>(null);

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (!id) return;

        fetch(`http://127.0.0.1:8000/gametime/game/${id}/`)
            .then((res) => res.json())
            .then((data) => {
                setResults(data[0] ?? null);
            })
            .catch((err) => console.error("Game page error:", err));
    }, [id]);

    return (
        <div className={styles.hero}>
            <div className={styles.cover}>
                {results?.cover?.image_id && (
                    <img
                        src={`https://images.igdb.com/igdb/image/upload/t_720p/${results.cover.image_id}.jpg`}
                        alt={results.name}
                    
                    />
                )}
            </div>
            <div className={styles.info}>
            <h1>{results?.name}</h1>
            <p className={styles.summary}>{results?.summary}</p>
            </div>
        </div>
    );
}

export default GamePage;