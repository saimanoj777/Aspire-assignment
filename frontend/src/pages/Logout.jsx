// frontend/src/pages/Logout.jsx
import { LogOut, Home } from 'lucide-react';

const Logout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <LogOut className="w-16 h-16 text-slate-400" />
        </div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">You have been logged out</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">Thank you for using College Dashboard. Come back soon!</p>
        <a 
          href="/" 
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg"
        >
          <Home className="w-4 h-4 mr-2" />
          Return Home
        </a>
      </div>
    </div>
  );
};

export default Logout;