import { useState } from "react";
import styles from "./SearchBar.module.css";


type Props = {
  onSearch: (query: string) => void;
};


function QuerySearch({ onSearch }: Props) {
    const [query, setQuery] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();


        if (!query.trim()) return;

        onSearch(query.toLowerCase());


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
        </div>
    );
}
export { QuerySearch };

