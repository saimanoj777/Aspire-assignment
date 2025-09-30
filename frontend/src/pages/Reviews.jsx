// frontend/src/pages/Reviews.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Sparkles } from 'lucide-react';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ college_name: '', rating: '', comment: '' });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get('http://localhost:5000/reviews');
      setReviews(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitReview = async () => {
    try {
      await axios.post('http://localhost:5000/reviews', form);
      fetchReviews();
      setForm({ college_name: '', rating: '', comment: '' });
      toast.success('Review submitted successfully!', {
        duration: 3000,
        style: {
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: '#ffffff',
          fontWeight: '600',
          border: '1px solid #065f46',
        },
      });
    } catch (err) {
      toast.error('Failed to submit review. Please check all fields and try again.', {
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
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">College Reviews</h1>
        <p className="text-slate-600 dark:text-slate-300">Share your experience and help others make informed decisions</p>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-8">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Write a Review</h2>
        <div className="space-y-4">
          <input
            name="college_name"
            placeholder="College Name"
            value={form.college_name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
          
          <div className="flex items-center space-x-4">
            <label className="text-slate-700 dark:text-slate-300 font-medium">Rating:</label>
            <input
              name="rating"
              placeholder="Rating (1-5)"
              value={form.rating}
              onChange={handleChange}
              type="number"
              min="1"
              max="5"
              className="flex-1 px-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
          </div>
          
          <textarea
            name="comment"
            placeholder="Share your detailed review here..."
            value={form.comment}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
          />
          
          <button 
            onClick={submitReview} 
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="flex items-center">
              <Sparkles className="w-4 h-4 mr-2" />
              Submit Review
            </div>
          </button>
        </div>
      </div>
      
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Recent Reviews</h2>
        {reviews.map((r) => (
          <div key={r.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{r.college_name}</h3>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-lg ${
                    i < r.rating ? 'text-yellow-500' : 'text-slate-300 dark:text-slate-600'
                  }`}>
                    {i < r.rating ? '★' : '☆'}
                  </span>
                ))}
                <span className="ml-2 text-sm font-semibold text-slate-600 dark:text-slate-400">
                  {r.rating}/5
                </span>
              </div>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;