import { useNavigate } from "react-router-dom";
import styles from "./Account.module.css";
import { useEffect, useState } from "react";
import Authentication from "../../auth/authentication";
import type { userInfo } from "../../types/types";

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

export default function Account() {
    const navigate = useNavigate();
    const url = "http://127.0.0.1:8000/gametime/user/account/";

    // Stores user account data returned from backend
    const [data, setData] = useState<userInfo | null>(null);

    // Pull auth token from localStorage for authenticated account requests
    const token = localStorage.getItem("token");

    // CHANGE THIS!!!! Dummy review data for layout/testing until backend
    const [recentReviews] = useState<Review[]>([
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
    ]);

    // CHANGE THIS AS WELL!!!!! Dummy favorite games until backend favorites are implemented
    const [favoriteGames] = useState<FavoriteGame[]>([
        { id: 1, title: "Resident Evil 4" },
        { id: 2, title: "Dead Space" },
        { id: 3, title: "Silent Hill 2" },
        { id: 4, title: "Resident Evil Remake" },
    ]);

    useEffect(() => {
        async function loadAccount() {
            try {
                // Authentication helper makes the authenticated request
                const res = await Authentication(url, token || "");

                // If token is invalid or expired, redirect to sign-in
                if (res?.status === 401) {
                    navigate("/sign-in");
                    return;
                }

                const data = await res.json();
                setData(data);
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
                    <h2>Account</h2>

                    <div className={styles.infoGroup}>
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
                            <strong>Followers:</strong> {data?.followers ?? 0}
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
                </div>

                {/* Favorite games box */}
                <div className={styles.panel}>
                    <h3>Favorite Games</h3>

                    <div className={styles.favoriteGrid}>
                        {favoriteGames.map((game) => (
                            <div key={game.id} className={styles.favoriteItem}>
                                {game.title}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Scrollable recent reviews box */}
                <div className={styles.panel}>
                    <h3>Last 5 Reviews</h3>

                    <div className={styles.reviewScrollBox}>
                        {recentReviews.map((review) => (
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