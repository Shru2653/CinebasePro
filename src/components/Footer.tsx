import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white py-4 mt-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm mb-2 md:mb-0">
            © {new Date().getFullYear()} CinebasePro - A Mini Movie Database
          </p>
          <div className="flex items-center text-sm">
            <span>Made with</span>
            <Heart className="h-4 w-4 mx-1 fill-red-200 animate-pulse" />
            <span>in 2025</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;