import { useParams } from "react-router-dom";
import type { gameObject } from "../../types/types";
import { useEffect, useState } from "react";
import styles from "./gamePage.module.css";
import { fromUnixTime, format } from "date-fns";
import type { getReview } from "../../types/types";
import { useNavigate } from "react-router-dom";
import Authentication from "../../auth/authentication";






function GamePage() {
    const url = 'http://127.0.0.1:8000/gametime/user/account/';
    const token = localStorage.getItem("token");
    const [game, setGame] = useState<gameObject | null>(null);
    const [reviewText, setReviewText] = useState("");
    const [selectedRating, setSelectedRating] = useState(0);
    const [buttonName, setButtonName] = useState("sign in");
    const navigate = useNavigate();

    // placeholder till proper implementation
    const [reviews, setReviews] = useState<getReview[]>([]);
   



    const { id } = useParams<{ id: string }>();



     const getReviews = () => {
        try{
            fetch(`http://127.0.0.1:8000/gametime/reviews/${id}/`)
            .then((res) => res.json())
            .then((data) => {
                setReviews(data);
            })
        }    
        catch (err) {
            console.error("Error fetching reviews:", err);
        }
    };


    useEffect(() => {
        async function fetchingData() {
            try {

                const res = await Authentication(url, token || "");

                if (res?.status === 401) {
                    setButtonName("sign in");

                }
                else {
                    setButtonName("submit review");

                }

                if (!id) return;

                fetch(`http://127.0.0.1:8000/gametime/game/${id}/`)
                    .then((res) => res.json())
                    .then((data) => {
                        setGame(data[0] ?? null);
                    })
                    .catch((err) => console.error("Game page error:", err));
            }
            catch (err) {
                console.error("Game page authentication error:", err);
                setButtonName("sign in");
            }
        }
        fetchingData();
        getReviews();
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

        if (buttonName === "sign in") {
            navigate("/sign-in");
            return;
        }

        // later connect backend here

        if (reviewText.trim() === "" && selectedRating === 0) {
            console.log("yogi didn't like you")
            return;
        }
        else {


           
            fetch('http://127.0.0.1:8000/gametime/user/create-review/', {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        gameID: id,
                        rating: selectedRating,
                        review: reviewText,
                        username: localStorage.getItem("username") || "Anonymous",
                        date: new Date().toISOString()
                    } 
                ),
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("Network response was not ok: " + res.statusText);
                    }
                    return res.json();
                })
                .then((data) => {
                    console.log("Review submitted successfully:", data);
                    // Optionally, you can update the reviews state here to show the new review immediately
                })
                .catch((err) => {
                    console.error("Error submitting review:", err);
                    alert("There was an error submitting your review. Please try again.");
                });

            setReviewText("");
            setSelectedRating(0);
        }
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
                        className={`${styles.starIcon} ${filled
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
                    className={`${styles.starIcon} ${filled ? styles.fullStar : half ? styles.halfStar : ""
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
                                                {review.formatedDate}
                                            </span>
                                        </div>

                                        <div className={styles.reviewRatingRow}>
                                            {renderDisplayStars(review.rating)}
                                            <span className={styles.reviewNumericRating}>
                                                {review.rating.toFixed(1)}/5
                                            </span>
                                        </div>

                                        <p className={styles.reviewText}>
                                            {review.review}
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
                            {buttonName}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default GamePage;