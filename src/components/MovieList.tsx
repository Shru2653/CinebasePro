import React from 'react';
import { useMovies } from '../context/MovieContext';
import MovieCard from './MovieCard';
import { Loader } from 'lucide-react';

const MovieList: React.FC = () => {
  const { movies, favorites, likes, activeTab, isLoading, error } = useMovies();

  // Filter movies based on active tab
  const filteredMovies = activeTab === 'all' 
    ? movies 
    : activeTab === 'favorites' 
      ? movies.filter(movie => favorites.includes(movie.id))
      : movies.filter(movie => likes.includes(movie.id));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="w-8 h-8 text-purple-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-10 h-64">
        <div className="text-6xl mb-4">😢</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Oops! Something went wrong
        </h3>
        <p className="text-gray-500 text-center max-w-md">
          {error.message}
        </p>
      </div>
    );
  }

  if (!isLoading && movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 h-64">
        <div className="text-6xl mb-4">🎬</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Search for your favorite movies!
        </h3>
        <p className="text-gray-500 text-center max-w-md">
          Use the search bar above to discover amazing movies.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {filteredMovies.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-10 h-[60vh]">
          <div className="text-6xl mb-4">😢</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            {activeTab === 'favorites' 
              ? "No favorites yet" 
              : "No liked movies yet"}
          </h3>
          <p className="text-gray-500 text-center max-w-md">
            {activeTab === 'favorites' 
              ? "Add movies to your favorites to see them here!" 
              : "Like some movies to see them here!"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieList;