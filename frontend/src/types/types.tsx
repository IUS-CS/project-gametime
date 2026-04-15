


export type searchResult = {
    id: number;
    name: string;
    cover?: {
        image_id: string;
    };
    summary?: string;

};

export type gameObject = {
    id: number;
    age_ratings?: AgeRating[];
    cover?: {
        image_id: string;
    };
    first_release_date?: number;
    involved_companies?: InvolvedCompany[];
    name: string;
    summary?: string;
    total_rating?: number;
}

type InvolvedCompany = {
  id: number;
  company: {
    id: number;
    name: string;
  }
}

type AgeRating = {
  id: number;
  organization: number;     
  rating_category: number;  
}


export type userSignIn = {
  username: string;
  password: string;
}

export type userInfo = {
  username: string;
  email: string;
  date_joined: string;
  followers: number;
}





export type getReview = {
    id: number;
    username: string;
    rating: number;
    review: string;
    formatedDate: string;
};

export type Review = {
    id: number;
    gameTitle: string;
    rating: number;
    reviewText: string;
    createdAt: string;
};

export type postReview = {
    gameId: number;
    rating: number;
    reviewText: string;
}
export type FavoriteGame = {
    id: number;
    name: string;
    cover?: {
        image_id: string;
    };
};

