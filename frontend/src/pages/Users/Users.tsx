import styles from "./Users.module.css";
import { useState } from "react";

type Review = {
    id: number;
    gameTitle: string;
    rating: number;
    reviewText: string;
    createdAt: string;
};

type FavoriteGame = {
    id: number;
    title: string;
};

type PublicUser = {
    username: string;
    dateJoined: string;
    followers: number;
    favoriteGames: FavoriteGame[];
    recentReviews: Review[];
};

export default function Users() {

    // Dummy user !!CHANGE THIS IN BACKEND
    const [user] = useState<PublicUser>({
        username: "AMOGUSFAN",
        dateJoined: "2026-04-06T22:09:12.797257Z",
        followers: 12,

        favoriteGames: [
            { id: 1, title: "Resident Evil 4" },
            { id: 2, title: "Resident Evil 7" },
            { id: 3, title: "Resident Evil 3" },
            { id: 4, title: "Resident Evil Remake" },
        ],

        recentReviews: [
            {
                id: 1,
                gameTitle: "blah",
                rating: 5,
                reviewText: "blah blah blah.",
                createdAt: "2026-04-05",
            },
            {
                id: 2,
                gameTitle: "blah",
                rating: 3.5,
                reviewText: "blah blah blah",
                createdAt: "2026-04-04",
            },
            {
                id: 3,
                gameTitle: "blah",
                rating: 4.5,
                reviewText: "blah.",
                createdAt: "2026-04-03",
            },
            {
                id: 4,
                gameTitle: "blah",
                rating: 5,
                reviewText: "blahblahblahblahblah.",
                createdAt: "2026-04-02",
            },
            {
                id: 5,
                gameTitle: "Tblah",
                rating: 4,
                reviewText: "blahblahblahblahblahblahblahblahblahblahblahblahblahblahblah",
                createdAt: "2026-04-01",
            },
        ],
    });

    const [isFollowing, setIsFollowing] = useState(false);

    // Format backend ISO datetime into a readable date
    const formattedJoinDate = new Date(user.dateJoined).toLocaleDateString(
        "en-US",
        {
            year: "numeric",
            month: "long",
            day: "numeric",
        }
    );

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
                        <p><strong>Username:</strong> {user.username}</p>
                        <p><strong>Date Joined:</strong> {formattedJoinDate}</p>
                        <p><strong>Followers:</strong> {user.followers}</p>
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
                        {user.favoriteGames.map((game) => (
                            <div key={game.id} className={styles.favoriteItem}>
                                {game.title}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Last 5 Reviews */}
                <div className={styles.panel}>
                    <h3>Last 5 Reviews</h3>

                    <div className={styles.reviewScrollBox}>
                        {user.recentReviews.map((review) => (
                            <div key={review.id} className={styles.reviewItem}>

                                <div className={styles.reviewHeader}>
                                    <span className={styles.reviewGameTitle}>
                                        {review.gameTitle}
                                    </span>

                                    <span className={styles.reviewDate}>
                                        {review.createdAt}
                                    </span>
                                </div>

                                <div className={styles.reviewRating}>
                                    {renderStars(review.rating)}
                                    <span className={styles.reviewNumeric}>
                                        {review.rating.toFixed(1)}/5
                                    </span>
                                </div>

                                <p className={styles.reviewText}>
                                    {review.reviewText}
                                </p>

                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}