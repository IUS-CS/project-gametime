import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { searchResult } from "../../types/types";
import {SearchResults} from "../../components/SearchResults/SearchResults";



function SearchPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";
    const [results, setResults] = useState<searchResult[]>([]);

    useEffect(() => {
    if (!query) return;

    fetch(`http://127.0.0.1:8000/gametime/search/${encodeURIComponent(query.toLowerCase())}/`)
            .then((res) => res.json())
            .then((data) => {
                setResults(data);
               
            })
            .catch((err) => console.error("Search error:", err));
    }, [query]);


     return <SearchResults results={results} />;
}
export default SearchPage;
