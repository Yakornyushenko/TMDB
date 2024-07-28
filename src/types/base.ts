import { CSSProperties } from "react";

export interface BaseComponentProps {
  className?: string;
  style?: CSSProperties;
}
export interface OptionProps {
  value: number | string;
  label: string;
}

export namespace Movies {
  export interface Movie {
    adult?: boolean;
    backdrop_path?: string;
    genre_ids?: number[];
    id?: number;
    original_language?: string;
    original_title?: string;
    overview?: string;
    popularity?: number;
    poster_path?: string;
    release_date?: string;
    title?: string;
    video?: boolean;
    vote_average?: number;
    vote_count?: number;
    personalRating?: number;
  }
  export interface MovieCard extends Movie {
    isMoviePage?: boolean;
    runtime?: number;
    budget?: number;
    revenue?: number;
  }
  export interface Genre {
    id: number;
    name: string;
  }
  export interface PaginationInfo {
    totalResults: number;
    totalPages: number;
    page: number;
  }
}
