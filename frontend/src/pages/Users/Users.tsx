import { useParams } from "react-router";
import { getUserAccount } from "../../api/endpoints";
import styles from "./Users.module.css";
import { useState, useEffect } from "react";
import type { FavoriteGame, Review, userInfo } from "../../types/types";



export default function Users() {
    const { username } = useParams<{ username: string }>();
    const token = localStorage.getItem("token");
    const [data, setData] = useState<userInfo | null>(null);
    
    const [followers, setFollowers] = useState<number>(0);
    const [favorites, setFavorites] = useState<FavoriteGame[]>([]);

    const [recentReviews, setRecentReviews] = useState<Review[]>([]);

    
    
    const [isFollowing, setIsFollowing] = useState(false);
    useEffect(() => {
        
        async function renderPage() {
            try {
            const data = await getUserAccount(username || "");
            setData(data);

            setFavorites(data.favorites);
            setRecentReviews(data.reviews);
            setFollowers(data.followers);

            } catch (err) {
                console.error("Error loading user account:", err);
            }
        }
        renderPage();
    }, [isFollowing]);

  

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

                {/* User profile info */}
                <div className={styles.card}>
                    <h2>User Profile</h2>

                    <div className={styles.infoGroup}>
                        <p><strong>Username:</strong> {data?.username}</p>
                        <p><strong>Date Joined:</strong> {data?.date_joined}</p>
                        <p><strong>Followers:</strong> {data?.followers}</p>
                    </div>

                    <button
                        className={styles.followButton}
                        onClick={() => setIsFollowing(!isFollowing)}
                    >
                        {isFollowing ? "Following" : "Follow"}
                    </button>
                </div>

                {/* Favorite Games */}
                <div className={styles.panel}>
                    <h3>Favorite Games</h3>

                    <div className={styles.favoriteGrid}>
                        {favorites && favorites.map((game) => (
                            <div key={game.id} className={styles.favoriteItem}>
                                {game.name}

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

                {/* Last 5 Reviews */}
                <div className={styles.panel}>
                    <h3>Last 5 Reviews</h3>

                    <div className={styles.reviewScrollBox}>
                        {recentReviews && recentReviews.map((review) => (
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