import { useNavigate } from "react-router-dom";
import styles from "./Account.module.css";
import { useEffect, useState } from "react";
import type { userInfo } from "../../types/types";
import type {FavoriteGame, Review} from "../../types/types";
import {getAccountInfo} from "../../api/endpoints";



export default function Account() {
    const navigate = useNavigate();
    
    // Stores user account data returned from backend
    const [data, setData] = useState<userInfo | null>(null);
    // Pull auth token from localStorage for authenticated account requests
    const token = localStorage.getItem("token");
    const [followers, setFollowers] = useState<number>(0);
    const [favorites, setFavorites] = useState<FavoriteGame[]>([]);

    // CHANGE THIS!!!! Dummy review data for layout/testing until backend
    const [recentReviews, setRecentReviews] = useState<Review[]>([]);
       


    useEffect(() => {
        async function loadAccount() {
            try {
                // Authentication helper makes the authenticated request
                const res = await getAccountInfo(token || "");

                // If token is invalid or expired, redirect to sign-in
                if (res?.status === 401) {
                    navigate("/sign-in");
                    return;
                }
                
                setFollowers(res.followers);
                
                setFavorites(res.favorites);

                setRecentReviews(res.reviews);
                

                // If token is invalid or expired, redirect to sign-in
                
                setData(res);
            } catch (err) {
                console.error("Account page error:", err);

                // If anything fails, send user back to sign-in for now
                navigate("/sign-in");
            }
        }

        

        loadAccount();
    }, [navigate, token]);

    // Format backend datetime into a normal readable date
    const formattedJoinDate = data?.date_joined
        ? new Date(data.date_joined).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
        : "N/A";

    // Renders a simple text based star reviews system
    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        return (
            <span className={styles.starDisplay}>
                {"★".repeat(fullStars)}
                {hasHalfStar ? "½" : ""}
                {"☆".repeat(emptyStars)}
            </span>
        );
    };

    return (
        <div className={styles.page}>
            <div className={styles.accountLayout}>
                {/* Main account information box */}
                <div className={styles.card}>
                    

                    <div className={styles.infoGroup}>
                        <h2>Account</h2>
                        <p>
                            <strong>Username:</strong> {data?.username ?? "Loading..."}
                        </p>
                        <p>
                            <strong>Email:</strong> {data?.email ?? "Loading..."}
                        </p>
                        <p>
                            <strong>Date Joined:</strong> {formattedJoinDate}
                        </p>
                        <p>
                            <strong>Followers:</strong> {followers}
                        </p>
                    </div>

                    {/* Clears auth token and sends user back to sign in */}
                    <button
                        onClick={() => {
                            localStorage.clear();
                            navigate("/sign-in");
                        }}
                        className={styles.signOutButton}
                    >
                        Sign Out
                    </button>

                    <button
                        onClick={() => {
                            localStorage.clear();
                            navigate("/sign-in");
                        }}
                        className={styles.signOutButton}
                    >
                        Delete Account
                    </button>
                </div>

                {/* Favorite games box */}
                <div className={styles.panel}>
                    <h3>Favorite Games</h3>

                    <div className={styles.favoriteGrid}>
                        {favorites && favorites.map((game) => (
                            <div key={game.id} onClick={() => navigate(`/game/${game.id}`)} className={styles.resultItem}>
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

                {/* Scrollable recent reviews box */}
                <div className={styles.panel}>
                    <h3>Last 5 Reviews</h3>

                    <div className={styles.reviewScrollBox}>
                        {recentReviews.map((review) => (
                            <div key={review.gameID} className={styles.reviewItem}>
                                <div className={styles.reviewHeader}>
                                    <span className={styles.reviewGameTitle}>
                                        {review.gameName}
                                    </span>
                                    <span className={styles.reviewDate}>
                                        {review.formatedDate}
                                    </span>
                                </div>

                                <div className={styles.reviewRating}>
                                    {renderStars(review.rating)}
                                    <span className={styles.reviewNumeric}>
                                        {review.rating.toFixed(1)}/5
                                    </span>
                                </div>

                                <p className={styles.reviewText}>
                                    {review.review}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}