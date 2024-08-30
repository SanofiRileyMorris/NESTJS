export interface Movie {
  title: string;
  id: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface Movies {
  title: string;
  id: number;
  budget: number;
  poster_path: string;
  homepage: string;
  original_language: string;
  overview: string;
  popularity: number;
  release_date: string;
  revenue: number;
  runtime: number;
  tagline: string;
  vote_average: number;
  vote_count: number;
}
