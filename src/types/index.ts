export interface Movie {
  id: string;
  title: string;
  description: string;
  poster: string;
  rating: number;
  year: string;
  genre: string[];
  director?: string;
  actors?: string;
}

export interface MovieContextType {
  movies: Movie[];
  favorites: string[];
  likes: string[];
  toggleFavorite: (id: string) => void;
  toggleLike: (id: string) => void;
  isFavorite: (id: string) => boolean;
  isLiked: (id: string) => boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchMovies: (query: string) => Promise<void>;
  isLoading: boolean;
  error: Error | null;
}

export interface OMDBResponse {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Plot?: string;
  imdbRating?: string;
  Director?: string;
  Actors?: string;
  Genre?: string;
}

export interface OMDBSearchResponse {
  Search: OMDBResponse[];
  totalResults: string;
  Response: string;
}