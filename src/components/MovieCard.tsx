import React, { useState } from 'react';
import { Movie } from '../types';
import { Heart, Star, Bookmark } from 'lucide-react';
import { useMovies } from '../context/MovieContext';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { toggleFavorite, toggleLike, isFavorite, isLiked } = useMovies();
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleFavoriteClick = () => {
    toggleFavorite(movie.id);
    
    // Show feedback message
    setFeedbackMessage(isFavorite(movie.id) 
      ? 'Removed from favorites!' 
      : 'Added to favorites!');
    setShowFeedback(true);
    
    // Hide feedback after 2 seconds
    setTimeout(() => {
      setShowFeedback(false);
    }, 2000);
  };

  const handleLikeClick = () => {
    toggleLike(movie.id);
    
    // Show feedback message
    setFeedbackMessage(isLiked(movie.id) 
      ? 'Unliked!' 
      : 'Liked!');
    setShowFeedback(true);
    
    // Hide feedback after 2 seconds
    setTimeout(() => {
      setShowFeedback(false);
    }, 2000);
  };

  return (
    <div className="relative group bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
      {/* Poster Image */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={movie.poster} 
          alt={`${movie.title} poster`} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Rating */}
        <div className="absolute top-2 left-2 bg-yellow-400/90 text-yellow-900 font-bold rounded-full py-1 px-2 text-sm flex items-center">
          <Star className="w-4 h-4 mr-1 inline-block fill-yellow-900" /> {movie.rating}
        </div>
        
        {/* Year & Genre */}
        <div className="absolute top-2 right-2 bg-pink-400/90 text-pink-900 font-bold rounded-full py-1 px-2 text-xs">
          {movie.year}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-1">{movie.title}</h3>
        <div className="mb-2 flex flex-wrap gap-1">
          {movie.genre.map((g, index) => (
            <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
              {g}
            </span>
          ))}
        </div>
        <p className="text-gray-600 text-sm line-clamp-3 mb-3">{movie.description}</p>
        
        {/* Additional Info */}
        {(movie.director || movie.actors) && (
          <div className="mb-3 text-sm text-gray-600">
            {movie.director && (
              <p className="line-clamp-1">
                <span className="font-semibold">Director:</span> {movie.director}
              </p>
            )}
            {movie.actors && (
              <p className="line-clamp-1">
                <span className="font-semibold">Cast:</span> {movie.actors}
              </p>
            )}
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <button 
            onClick={handleLikeClick}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
              isLiked(movie.id) 
                ? 'bg-red-100 text-red-600' 
                : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500'
            }`}
          >
            <Heart 
              className={`w-4 h-4 ${isLiked(movie.id) ? 'fill-red-500' : ''} ${
                isLiked(movie.id) ? 'animate-pulse' : ''
              }`} 
            />
            {isLiked(movie.id) ? 'Liked' : 'Like'}
          </button>
          
          <button 
            onClick={handleFavoriteClick}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
              isFavorite(movie.id) 
                ? 'bg-purple-100 text-purple-600' 
                : 'bg-gray-100 text-gray-600 hover:bg-purple-50 hover:text-purple-500'
            }`}
          >
            <Bookmark 
              className={`w-4 h-4 ${isFavorite(movie.id) ? 'fill-purple-500' : ''} ${
                isFavorite(movie.id) ? 'animate-bounce' : ''
              }`} 
            />
            {isFavorite(movie.id) ? 'Favorited' : 'Favorite'}
          </button>
        </div>
      </div>
      
      {/* Feedback Message */}
      {showFeedback && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-black/80 text-white py-1 px-3 rounded-full text-sm animate-fadeIn">
          {feedbackMessage}
        </div>
      )}
    </div>
  );
};

export default MovieCard;