
import { useNavigate } from "react-router";
import type { searchResult } from "../../types/types";
import styles from "./SearchResults.module.css";

type Props = {
    results: searchResult[];
};
function SearchResults({ results }: Props) {
    const navigate = useNavigate();
    if (results.length === 0) {
        return <div className={styles.noResults}>No results found.</div>;
    }
    
    function goToGamePage(result: searchResult) {
        navigate(`/game/${result.id}`);
        

    }
        






    return (
        <div className={styles.results}>
            
            {results.map((result) => (
                <div key={result.id} className={styles.resultItem} onClick={() => goToGamePage(result)}>
                    <strong className={styles.title}>{result.name}</strong>
                    {result.cover?.image_id && (
                        <img
                            className={styles.image}
                            src={`https://images.igdb.com/igdb/image/upload/t_720p/${result.cover.image_id}.jpg`}
                            alt={result.name}
                        />
                    )}
                    {result.summary && (
                        <p className={styles.summary}>{result.summary}</p>
                    )}
                </div>
            ))}
        </div>
    )
}

export { SearchResults };