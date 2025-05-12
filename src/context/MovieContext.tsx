import React, { createContext, useContext, useState } from 'react';
import { Movie, MovieContextType, OMDBResponse, OMDBSearchResponse } from '../types';
import useLocalStorage from '../hooks/useLocalStorage';

const OMDB_API_KEY = '1afce39d'; // Using the provided API key
const API_URL = 'https://www.omdbapi.com';

// Create Context
const MovieContext = createContext<MovieContextType | undefined>(undefined);

// Helper function to transform OMDB response to our Movie type
const transformOMDBToMovie = (omdbMovie: OMDBResponse): Movie => ({
  id: omdbMovie.imdbID,
  title: omdbMovie.Title,
  description: omdbMovie.Plot || '',
  poster: omdbMovie.Poster === 'N/A' 
    ? 'https://images.pexels.com/photos/274937/pexels-photo-274937.jpeg' 
    : omdbMovie.Poster,
  rating: parseFloat(omdbMovie.imdbRating || '0'),
  year: omdbMovie.Year,
  genre: omdbMovie.Genre ? omdbMovie.Genre.split(', ') : [],
  director: omdbMovie.Director,
  actors: omdbMovie.Actors
});

// Create a provider component
export const MovieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useLocalStorage<string[]>('favorites', []);
  const [likes, setLikes] = useLocalStorage<string[]>('likes', []);
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const searchMovies = async (query: string) => {
    if (!query) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // First, get the search results
      const searchResponse = await fetch(
        `${API_URL}/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query)}&type=movie`
      );
      const searchData: OMDBSearchResponse = await searchResponse.json();
      
      if (searchData.Response === 'False') {
        throw new Error(searchData.Error || 'No movies found');
      }

      // Then, get detailed information for each movie
      const moviePromises = searchData.Search.slice(0, 10).map(async (movie) => {
        const detailResponse = await fetch(
          `${API_URL}/?apikey=${OMDB_API_KEY}&i=${movie.imdbID}&plot=full`
        );
        const detailData: OMDBResponse = await detailResponse.json();
        return transformOMDBToMovie(detailData);
      });

      const detailedMovies = await Promise.all(moviePromises);
      setMovies(detailedMovies);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch movies'));
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prevFavorites => 
      prevFavorites.includes(id)
        ? prevFavorites.filter(movieId => movieId !== id)
        : [...prevFavorites, id]
    );
  };

  const toggleLike = (id: string) => {
    setLikes(prevLikes => 
      prevLikes.includes(id)
        ? prevLikes.filter(movieId => movieId !== id)
        : [...prevLikes, id]
    );
  };

  const isFavorite = (id: string): boolean => {
    return favorites.includes(id);
  };

  const isLiked = (id: string): boolean => {
    return likes.includes(id);
  };

  const value = {
    movies,
    favorites,
    likes,
    toggleFavorite,
    toggleLike,
    isFavorite,
    isLiked,
    activeTab,
    setActiveTab,
    searchMovies,
    isLoading,
    error
  };

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};

// Create a hook to use the context
export const useMovies = (): MovieContextType => {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
};