import { useNavigate, useParams } from "react-router";
import { getUserAccount } from "../../api/endpoints";
import styles from "./Users.module.css";
import { useState, useEffect } from "react";
import type { FavoriteGame, Review, userInfo } from "../../types/types";



export default function Users() {
    const navigate = useNavigate();

    const { username } = useParams<{ username: string }>();
    
    const [data, setData] = useState<userInfo | null>(null);
    
    
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
            

            } catch (err) {
                console.error("Error loading user account:", err);
            }
        }
        renderPage();
    }, [isFollowing]);



  const formattedJoinDate = data?.date_joined
        ? new Date(data.date_joined).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
        : "N/A";


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
                        <p><strong>Date Joined:</strong> {formattedJoinDate}</p>
                        <p><strong>Followers:</strong> {data?.followers}</p>
                    </div>

                    <button
                        className={styles.followButton}
                        onClick={() => setIsFollowing(!isFollowing)}
                    >
                        {isFollowing ? "Following" : "Follow"}
                    </button>

                    <button
                        className={styles.followButton}
                        onClick={() => navigate(`/backlog/${data?.username}`)}
                    >
                        Go to {data?.username}'s Backlog
                    </button>
                </div>

                {/* Favorite Games */}
                <div className={styles.panel}>
                    <h3>Favorite Games</h3>

                    <div className={styles.favoriteGrid}>
                        {favorites && favorites.map((game) => (
                            <div key={game.id} onClick={() => navigate(`/game/${game.id}`)} className={styles.favoriteItem}>
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