
import styles from "./Home.module.css";
import {QuerySearch} from "../../components/SearchBar";

export default function Home() {
    

    return (
        <div className={styles.page}>
            <h1>Welcome to GameTime!</h1>
            <QuerySearch />
        </div>
       
    );
}
