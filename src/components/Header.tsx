import React, { useState } from 'react';
import { Film, Search } from 'lucide-react';
import { useMovies } from '../context/MovieContext';

const Header: React.FC = () => {
  const { setActiveTab, activeTab, favorites, likes, searchMovies, isLoading } = useMovies();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchMovies(searchQuery);
  };

  return (
    <header className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center">
            <Film className="h-8 w-8 mr-2" />
            <h1 className="text-2xl font-bold">CinebasePro</h1>
          </div>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-300"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-500 transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>
          
          {/* Navigation */}
          <nav className="flex space-x-1">
            <TabButton 
              label="All Movies" 
              active={activeTab === 'all'}
              onClick={() => setActiveTab('all')}
            />
            <TabButton 
              label={`Favorites (${favorites.length})`} 
              active={activeTab === 'favorites'}
              onClick={() => setActiveTab('favorites')}
            />
            <TabButton 
              label={`Liked (${likes.length})`} 
              active={activeTab === 'liked'}
              onClick={() => setActiveTab('liked')}
            />
          </nav>
        </div>
      </div>
    </header>
  );
};

interface TabButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
        active 
          ? 'bg-white text-purple-600 shadow-md' 
          : 'bg-transparent text-white hover:bg-white/20'
      }`}
    >
      {label}
    </button>
  );
};

export default Header;