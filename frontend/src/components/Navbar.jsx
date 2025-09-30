// frontend/src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { GraduationCap, Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    }
    setDarkMode(!darkMode);
  };

  return (
    <nav className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4 flex justify-between items-center shadow-sm backdrop-blur-sm">
      <Link to="/" className="flex items-center text-xl font-bold text-slate-800 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
        <GraduationCap className="w-6 h-6 mr-2" />
        College Dashboard
      </Link>
      <div className="flex space-x-6 items-center">
        <Link to="/" className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">
          Home
        </Link>
        <Link to="/colleges" className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">
          Colleges
        </Link>
        <Link to="/reviews" className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">
          Reviews
        </Link>
        <Link to="/favorites" className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">
          Favorites
        </Link>
        <Link to="/logout" className="text-slate-600 dark:text-slate-300 hover:text-red-500 dark:hover:text-red-400 font-medium transition-colors">
          Logout
        </Link>
        <button onClick={toggleDarkMode} className="bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 p-2 rounded-lg border border-slate-300 dark:border-slate-600 transition-all duration-200">
          <div className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300">
            {darkMode ? (
              <>
                <Sun className="w-4 h-4 mr-1" />
                Light
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 mr-1" />
                Dark
              </>
            )}
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;