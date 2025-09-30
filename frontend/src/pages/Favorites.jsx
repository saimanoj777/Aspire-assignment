// frontend/src/pages/Favorites.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Heart, MapPin, GraduationCap, DollarSign, Trash2, Search } from 'lucide-react';
import API_BASE_URL from '../config';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/favorites`);
      setFavorites(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const removeFavorite = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/favorites/${id}`);
      fetchFavorites();
      toast.success('College removed from favorites!', {
        duration: 3000,
        style: {
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          color: '#ffffff',
          fontWeight: '600',
          border: '1px solid #92400e',
        },
      });
    } catch (err) {
      toast.error('Failed to remove college from favorites. Please try again.', {
        duration: 4000,
        style: {
          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          color: '#ffffff',
          fontWeight: '600',
          border: '1px solid #991b1b',
        },
      });
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">My Favorites</h1>
        <p className="text-slate-600 dark:text-slate-300">Colleges you've saved for future reference</p>
      </div>
      
      {favorites.length === 0 ? (
        <div className="text-center py-16">
          <div className="flex justify-center mb-6">
            <Heart className="w-20 h-20 text-slate-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">No favorites yet</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">Start exploring colleges and add your favorites to see them here</p>
          <Link 
            to="/colleges" 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg"
          >
            <Search className="w-4 h-4 mr-2" />
            Explore Colleges
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((c) => (
            <div key={c.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 hover:shadow-md hover:border-red-300 dark:hover:border-red-600 transition-all duration-200">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">{c.name}</h2>
                <div className="space-y-2">
                  <div className="flex items-center text-slate-600 dark:text-slate-300">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{c.location}</span>
                  </div>
                  <div className="flex items-center text-slate-600 dark:text-slate-300">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    <span>{c.course}</span>
                  </div>
                  <div className="flex items-center text-slate-600 dark:text-slate-300">
                    <DollarSign className="w-4 h-4 mr-2" />
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">₹{c.fee.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => removeFavorite(c.id)} 
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="flex items-center justify-center">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove from Favorites
                </div>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;