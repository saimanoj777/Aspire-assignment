// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Colleges from './pages/Colleges';
import Reviews from './pages/Reviews';
import Favorites from './pages/Favorites';
import Logout from './pages/Logout';

function App() {
  return (
    <Router>
      <Navbar />
      <main className="bg-slate-50 dark:bg-slate-900 min-h-screen text-slate-900 dark:text-slate-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/colleges" element={<Colleges />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </main>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 4000,
          style: {
            background: '#1e293b',
            color: '#f1f5f9',
            fontSize: '14px',
            fontWeight: '500',
            padding: '16px 20px',
            borderRadius: '12px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            border: '1px solid #334155',
          },
          // Default options for specific types
          success: {
            duration: 3000,
            style: {
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#ffffff',
              border: '1px solid #065f46',
            },
            iconTheme: {
              primary: '#ffffff',
              secondary: '#10b981',
            },
          },
          error: {
            duration: 4000,
            style: {
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              color: '#ffffff',
              border: '1px solid #991b1b',
            },
            iconTheme: {
              primary: '#ffffff',
              secondary: '#ef4444',
            },
          },
          loading: {
            style: {
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              color: '#ffffff',
              border: '1px solid #1d4ed8',
            },
          },
        }}
      />
    </Router>
  );
}

export default App;