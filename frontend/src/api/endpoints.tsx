import type { Review } from "../types/types";

export default async function getGame(id: string) {
    try {
        const res = await fetch(`http://127.0.0.1:8000/gametime/game/${id}/`);
        if (!res.ok) {
            throw new Error("Failed to fetch game");
        }
        const data = await res.json();
        return data;
    }
    catch (err) {
        console.error("Game page error:", err);
        throw err;
    }
}




export const getAccountInfo = async (token: string) => {
    try {
        
        const res = await fetch(`http://127.0.0.1:8000/gametime/user/account/`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`,
            },
        });
        if (!res.ok) {
            return res;
        }
        const data = await res.json();
        const favorites = data.favorites.map((item: { gameID: number }) => item.gameID).join(", ");
        console.log("Favorite game IDs:", favorites);
        if (favorites.length > 0) {
            const gameData = await getGame(favorites);
            data.favorites = gameData;
        }

        type Game = {
            id: number;
            name: string;
        };

        let reviewGameData:Game[] = [];

        const reviews = data.reviews.map((item: { gameID: number }) => item.gameID).join(", ");
        if (reviews.length > 0) {
            reviewGameData = await getGame(reviews);
        }

        const game = new Map(reviewGameData.map((g: { id: number, name: string }) => [g.id, g]));

        data.reviews = data.reviews.map((review: Review) => ({
            ...review,
            gameName: game.get(review.gameID)?.name ?? "Unknown Game",
        }));
        console.log("Account info with reviews:", data);
        return data;

    }
    catch (err) {
        console.error("Error fetching account info:", err);
        throw err;
    }
}

export const getUserAccount = async (username: string) => {
    try {
      
        const res = await fetch(`http://127.0.0.1:8000/gametime/account/${username}/`, {
            method: 'GET',
            
        });
        if (!res.ok) {
            return res;
        }
        const data = await res.json();
        const favorites = data.favorites.map((item: { gameID: number }) => item.gameID).join(", ");
        console.log("Favorite game IDs:", favorites);
        if (favorites.length > 0) {
            const gameData = await getGame(favorites);
            data.favorites = gameData;
        }

        type Game = {
            id: number;
            name: string;
        };

        let reviewGameData:Game[] = [];

        const reviews = data.reviews.map((item: { gameID: number }) => item.gameID).join(", ");
        if (reviews.length > 0) {
            reviewGameData = await getGame(reviews);
        }

        const game = new Map(reviewGameData.map((g: { id: number, name: string }) => [g.id, g]));

        data.reviews = data.reviews.map((review: Review) => ({
            ...review,
            gameName: game.get(review.gameID)?.name ?? "Unknown Game",
        }));
        console.log("Account info with reviews:", data);
        return data;

    }
    catch (err) {
        console.error("Error fetching account info:", err);
        throw err;
    }
}






export const handleSubmitReview = (token: string, id: string, reviewText: string, selectedRating: number) => {

    if (reviewText.trim() === "" && selectedRating === 0) {

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


    }
};





export const handleFollowGame = (id: string, token: string) => {



    try {
        fetch(`http://127.0.0.1:8000/gametime/user/account/followed-games/`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ gameID: id }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network response was not ok: " + res.statusText);
                }
                return res.json();
            })
            .then((data) => {
                console.log("Game followed successfully:", data);

            })
            .catch((err) => {
                console.error("Error following game:", err);
                alert("There was an error following the game. Please try again.");
            });
    }
    catch (err) {
        console.error("Error following game:", err);
    }
}



export const handleUnfollowGame = (id: string, token: string) => {
    try {
        fetch(`http://127.0.0.1:8000/gametime/user/account/followed-games/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ gameID: id }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network response was not ok: " + res.statusText);
                }
                return res.json();
            })
            .then((data) => {
                console.log("Game unfollowed successfully:", data);
            })
            .catch((err) => {
                console.error("Error unfollowing game:", err);
                alert("There was an error unfollowing the game. Please try again.");
            });
    }
    catch (err) {
        console.error("Error unfollowing game:", err);


    }
}








export const handleAddFavoriteGame = (id: string, token: string) => {
    try {
        fetch(`http://127.0.0.1:8000/gametime/user/account/favorites/`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ gameID: id }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network response was not ok: " + res.statusText);
                }
                return res.json();
            })
            .then((data) => {
                console.log("Game favorited successfully:", data);
            })
            .catch((err) => {
                console.error("Error favoriting game:", err);
                alert("There was an error favoriting the game. Please try again.");
            });
    }
    catch (err) {
        console.error("Error favoriting game:", err);
    }
}

export const handleUnfavoriteGame = (id: string, token: string) => {
    try {
        fetch(`http://127.0.0.1:8000/gametime/user/account/favorites/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ gameID: id }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network response was not ok: " + res.statusText);
                }
                return res.json();
            })
            .then((data) => {
                console.log("Game unfavorited successfully:", data);
            })
            .catch((err) => {
                console.error("Error unfavoriting game:", err);
                alert("There was an error unfavoriting the game. Please try again.");
            });
    }
    catch (err) {
        console.error("Error unfavoriting game:", err);
    }
}



export const handleFollowUser = (username: string, token: string) => {
    try {
        fetch(`http://127.0.0.1:8000/gametime/user/account/followed-users/`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network response was not ok: " + res.statusText);
                }
                return res.json();
            })
            .then((data) => {
                console.log("User followed successfully:", data);
            })
            .catch((err) => {
                console.error("Error following user:", err);
                alert("There was an error following the user. Please try again.");
            });
    }
    catch (err) {
        console.error("Error following user:", err);
    }
}

export const handleUnfollowUser = (username: string, token: string) => {
    try {
        fetch(`http://127.0.0.1:8000/gametime/user/account/followed-users/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network response was not ok: " + res.statusText);
                }
                return res.json();
            })
            .then((data) => {
                console.log("User unfollowed successfully:", data);
            })
            .catch((err) => {
                console.error("Error unfollowing user:", err);
                alert("There was an error unfollowing the user. Please try again.");
            });
    }
    catch (err) {
        console.error("Error unfollowing user:", err);
    }
}




export const AddToBacklog = (id: string, token: string) => {
    try {
        fetch(`http://127.0.0.1:8000/gametime/user/account/backlog/`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ gameID: id }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network response was not ok: " + res.statusText);
                }
                return res.json();
            })
            .then((data) => {
                console.log("Game added to backlog successfully:", data);
            })
            .catch((err) => {
                console.error("Error adding game to backlog:", err);
                alert("There was an error adding the game to your backlog. Please try again.");
            });
    }
    catch (err) {
        console.error("Error adding game to backlog:", err);
    }
}

export const getBacklog = async (token: string) => {
    try {
        const res = await fetch(`http://127.0.0.1:8000/gametime/user/account/backlog/`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`,
            },
        });
        if (!res.ok) {
            throw new Error("Failed to fetch backlog games");
        }
        const data = await res.json();
        const Backlog = data.map((item: { gameID: number }) => item.gameID).join(", ");
        if (Backlog.length === 0) {
            return [];
        }
        const backlogData = await getGame(Backlog);
        return backlogData;
    }
    catch (err) {
        console.error("Error fetching backlog games:", err);
        throw err;
    }
};


export const checkButtons = async (id: string, token: string) => {
    try {
        const res = await fetch(`http://127.0.0.1:8000/gametime/user/account/check/buttons/${id}/`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`,
            },
        });
        if (!res.ok) {
            throw new Error("Failed to fetch button states");
        }
        const data = await res.json();
        return data;
    }
    catch (err) {
        console.error("Error fetching backlog games:", err);
        throw err;
    }
};

