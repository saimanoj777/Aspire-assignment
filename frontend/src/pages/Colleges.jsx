// frontend/src/pages/Colleges.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { MapPin, GraduationCap, DollarSign, Heart, Search } from 'lucide-react';

const Colleges = () => {
  const [colleges, setColleges] = useState([]);
  const [locations, setLocations] = useState([]);
  const [courses, setCourses] = useState([]);
  const [filters, setFilters] = useState({ location: '', course: '', minFee: '', maxFee: '', search: '', sort: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/colleges').then((res) => {
      const locs = [...new Set(res.data.map((c) => c.location))];
      const cours = [...new Set(res.data.map((c) => c.course))];
      setLocations(locs);
      setCourses(cours);
    });
  }, []);

  const fetchColleges = async () => {
    try {
      const params = new URLSearchParams(filters).toString();
      const res = await axios.get(`http://localhost:5000/colleges?${params}`);
      setColleges(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchColleges();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const addToFavorites = async (id) => {
    try {
      await axios.post('http://localhost:5000/favorites', { college_id: id });
      toast.success('College added to favorites!', {
        duration: 3000,
        style: {
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: '#ffffff',
          fontWeight: '600',
          border: '1px solid #065f46',
        },
      });
    } catch (err) {
      toast.error('Failed to add college to favorites. Please try again.', {
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
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Explore Colleges</h1>
        <p className="text-slate-600 dark:text-slate-300">Find the perfect college that matches your preferences</p>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-8">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Filter Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <select 
            name="location" 
            onChange={handleFilterChange} 
            value={filters.location} 
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          >
            <option value="">All Locations</option>
            {locations.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
          
          <select 
            name="course" 
            onChange={handleFilterChange} 
            value={filters.course} 
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          >
            <option value="">All Courses</option>
            {courses.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          
          <input
            name="minFee"
            placeholder="Min Fee"
            onChange={handleFilterChange}
            value={filters.minFee}
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            type="number"
          />
          
          <input
            name="maxFee"
            placeholder="Max Fee"
            onChange={handleFilterChange}
            value={filters.maxFee}
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            type="number"
          />
          
          <input
            name="search"
            placeholder="Search by Name"
            onChange={handleFilterChange}
            value={filters.search}
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
          
          <select 
            name="sort" 
            onChange={handleFilterChange} 
            value={filters.sort} 
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          >
            <option value="">Sort by Fee</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
      </div>
      
      {colleges.length === 0 ? (
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <Search className="w-16 h-16 text-slate-400" />
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-400">No colleges match your search criteria</p>
          <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">Try adjusting your filters to see more results</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {colleges.map((c) => (
            <div key={c.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-200">
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
                onClick={() => addToFavorites(c.id)} 
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="flex items-center justify-center">
                  <Heart className="w-4 h-4 mr-2" />
                  Add to Favorites
                </div>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Colleges;