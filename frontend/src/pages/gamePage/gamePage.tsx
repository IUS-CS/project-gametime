import { useParams } from "react-router-dom";
import type { gameObject } from "../../types/types";
import { useEffect, useState } from "react";
import styles from "./gamePage.module.css";
import { fromUnixTime, format } from "date-fns";

type Review = {
    id: number;
    username: string;
    rating: number;
    reviewText: string;
    createdAt: string;
};



function GamePage() {
    const [game, setGame] = useState<gameObject | null>(null);
    const [reviewText, setReviewText] = useState("");
    const [selectedRating, setSelectedRating] = useState(0);

    // placeholder till proper implementation
    const [reviews] = useState<Review[]>([
        {
            id: 1,
            username: "SampleUser",
            rating: 4.5,
            reviewText: "THIS IS A TEST, WILL NEED PROPER BACKEND IMPLMENTATION LATER.",
            createdAt: "2026-03-30",
        },
        {
            id: 2,
            username: "Amongus fan",
            rating: 0.0,
            reviewText: "NOt Amongus, i hate it.",
            createdAt: "2026-03-29",
        },
    ]);




    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (!id) return;

        fetch(`http://127.0.0.1:8000/gametime/game/${id}/`)
            .then((res) => res.json())
            .then((data) => {
                setGame(data[0] ?? null);
            })
            .catch((err) => console.error("Game page error:", err));
    }, [id]);




    const time = game?.first_release_date
        ? format(fromUnixTime(game.first_release_date), "MMMM d, yyyy")
        : "N/A";

    const esrb = game?.age_ratings?.find((r) => r.organization === 1);

    const esrbMap: Record<number, string> = {
        6: "esrb_m",
        7: "esrb_ao",
        5: "esrb_t",
        3: "esrb_e",
        4: "esrb_e10",
        2: "esrb_ec",
        12: "esrb_rp",
    };



    const handleSubmitReview = (e: React.FormEvent) => {
        e.preventDefault();

        console.log("Review submitted:", {
            reviewText,
            selectedRating,
            gameId: id,
        });

        // later connect backend here

        setReviewText("");
        setSelectedRating(0);
    };




    const renderSelectorStars = () => {
        const stars = [];

        for (let i = 1; i <= 5; i++) {
            const filled = selectedRating >= i;
            const half = selectedRating >= i - 0.5 && selectedRating < i;

            stars.push(
                <div
                    key={i}
                    className={styles.star}
                    onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const clickX = e.clientX - rect.left;

                        if (clickX < rect.width / 2) {
                            setSelectedRating(i - 0.5);
                        } else {
                            setSelectedRating(i);
                        }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Set rating to ${i} stars`}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            setSelectedRating(i);
                        }
                    }}
                >
                    <span
                        className={`${styles.starIcon} ${
                            filled
                                ? styles.fullStar
                                : half
                                    ? styles.halfStar
                                    : ""
                        }`}
                    >
                        ★
                    </span>
                </div>
            );
        }

        return stars;
    };





    const renderDisplayStars = (rating: number) => {
        const stars = [];

        for (let i = 1; i <= 5; i++) {
            const filled = rating >= i;
            const half = rating >= i - 0.5 && rating < i;

            stars.push(
                <span
                    key={i}
                    className={`${styles.starIcon} ${
                        filled ? styles.fullStar : half ? styles.halfStar : ""
                    }`}
                >
                    ★
                </span>
            );
        }

        return <div className={styles.displayStarRow}>{stars}</div>;
    };




    return (
        <div className={styles.page}>
            <div className={styles.hero}>
                <div className={styles.cover}>
                    {game?.cover?.image_id && (
                        <img
                            src={`https://images.igdb.com/igdb/image/upload/t_720p/${game.cover.image_id}.jpg`}
                            alt={game.name}
                        />
                    )}

                    <div className={styles.records}>
                        <p>Release Date: {time}</p>
                        <p>
                            Rating:{" "}
                            {game?.total_rating ? Math.round(game.total_rating) : "N/A"}
                        </p>
                        <p>
                            Developers:{" "}
                            {game?.involved_companies
                                ?.map((c) => c.company.name)
                                .join(", ") || "N/A"}
                        </p>
                        <p>ESRB Rating:</p>
                        {esrb && (
                            <img
                                src={`/esrb/${esrbMap[esrb.rating_category]}.svg`}
                                alt="ESRB rating"
                                style={{ width: "120px" }}
                            />
                        )}
                    </div>
                </div>

                <div className={styles.info}>
                    <h1>{game?.name}</h1>
                    <p className={styles.summary}>{game?.summary}</p>
                    <hr />

                    <div className={styles.reviewsMiniBox}>
                        <h3>User Reviews</h3>

                        {reviews.length === 0 ? (
                            <p className={styles.noReviews}>No reviews yet.</p>
                        ) : (
                            <div className={styles.reviewScrollArea}>
                                {reviews.map((review) => (
                                    <div key={review.id} className={styles.reviewItem}>
                                        <div className={styles.reviewHeader}>
                                            <span className={styles.reviewUsername}>
                                                {review.username}
                                            </span>
                                            <span className={styles.reviewDate}>
                                                {review.createdAt}
                                            </span>
                                        </div>

                                        <div className={styles.reviewRatingRow}>
                                            {renderDisplayStars(review.rating)}
                                            <span className={styles.reviewNumericRating}>
                                                {review.rating.toFixed(1)}/5
                                            </span>
                                        </div>

                                        <p className={styles.reviewText}>
                                            {review.reviewText}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.reviewCard}>
                    <h2>Write a Review</h2>

                    <form onSubmit={handleSubmitReview} className={styles.reviewForm}>
                        <label className={styles.label}>Your Rating</label>

                        <div className={styles.starRow}>
                            {renderSelectorStars()}
                        </div>

                        <p className={styles.ratingText}>
                            Selected Rating: {selectedRating.toFixed(1)}
                        </p>

                        <label htmlFor="reviewText" className={styles.label}>
                            Your Review
                        </label>

                        <textarea
                            id="reviewText"
                            className={styles.textarea}
                            placeholder="Write your review here..."
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                        />

                        <button type="submit" className={styles.submitButton}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default GamePage;