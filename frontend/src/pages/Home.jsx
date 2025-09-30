// frontend/src/pages/Home.jsx
import { Link } from 'react-router-dom';
import { School, Star, Heart, Rocket } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Welcome to College Dashboard
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto">
            Discover the perfect college for your future. Explore comprehensive information, read authentic reviews, and manage your favorite institutions with ease.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
            <div className="flex justify-center mb-4">
              <School className="w-12 h-12 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">Explore Colleges</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm">Browse through hundreds of colleges with detailed information</p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
            <div className="flex justify-center mb-4">
              <Star className="w-12 h-12 text-yellow-500" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">Read Reviews</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm">Get insights from real students and alumni experiences</p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
            <div className="flex justify-center mb-4">
              <Heart className="w-12 h-12 text-red-500" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">Save Favorites</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm">Keep track of colleges that interest you the most</p>
          </div>
        </div>
        
        <Link 
          to="/colleges" 
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
        >
          <Rocket className="w-5 h-5 mr-2" />
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Home;