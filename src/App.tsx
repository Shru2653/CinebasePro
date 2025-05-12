import React, { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MovieList from './components/MovieList';
import { MovieProvider } from './context/MovieContext';

function App() {
  // Set page title
  useEffect(() => {
    document.title = "CuteMovies - Mini Movie Database";
  }, []);

  return (
    <MovieProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 to-blue-50">
        <Header />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Movie Collection</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse your favorite movies, add them to your collection, and keep track of the ones you love!
            </p>
          </div>
          
          <MovieList />
        </main>
        
        <Footer />
      </div>
    </MovieProvider>
  );
}

export default App;