


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
