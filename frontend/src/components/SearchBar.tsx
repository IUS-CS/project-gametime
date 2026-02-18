import { useState } from "react";
//import { useNavigate } from "react-router-dom";
import type { searchResult } from "../types/types";
import styles from "./SearchBar.module.css";

function QuerySearch() {
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState<searchResult[]>([]);

    //const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();


        if (!query.trim()) return;

        // navigate(`/search/${encodeURIComponent(query.toLowerCase())}/`);

        fetch(`http://127.0.0.1:8000/gametime/search/${encodeURIComponent(query.toLowerCase())}/`)
            .then((res) => res.json())
            .then((data) => {
                setSearchResults(data);
                //navigate(`/search/${encodeURIComponent(query.toLowerCase())}/`);
            })
            .catch((err) => console.error("Search error:", err));


    };




    return (

        <div className={styles.searchForm}>
            <form onSubmit={handleSearch} className={styles.form}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search..."
                    className={styles.input}
                />
                <button type="submit" className={styles.button}>
                    Search
                </button>
            </form>

            {searchResults.length > 0 && (
                <div className={styles.results}>
                    {searchResults.map((result) => (
                        <div key={result.id} className={styles.resultItem}>
                            <strong className={styles.resultTitle}>{result.name}</strong>
                            {result.summary && <p className={styles.resultSummary}>{result.summary}</p>}
                        </div>
                    ))}
                </div>
            )}
        </div>

    );
}
export { QuerySearch };

