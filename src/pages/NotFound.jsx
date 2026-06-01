import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import Navbar from '../components/Navbar';
import DashboardLayout from '../layouts/DashboardLayout';

export default function NotFound() {
  const { isAuthenticated } = useAuth();

  const content = (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[calc(100vh-80px)]">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-[#23b1f5]/20 blur-3xl rounded-full"></div>
        <img 
          src={`${import.meta.env.BASE_URL}assets/logo-burnaway.png`} 
          alt="BurnAway Logo" 
          className="relative w-32 h-32 object-contain drop-shadow-xl animate-pulse" 
        />
      </div>
      <h1 className="text-6xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter">404</h1>
      <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-6">Oops! Page Not Found</h2>
      <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link 
        to={isAuthenticated ? "/dashboard" : "/"} 
        className="bg-[#23b1f5] text-white dark:text-slate-950 px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-lg shadow-[#23b1f5]/30"
      >
        Back to {isAuthenticated ? "Dashboard" : "Home"}
      </Link>
    </div>
  );

  if (isAuthenticated) {
    return (
      <DashboardLayout>
        {content}
      </DashboardLayout>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] transition-colors duration-300 flex flex-col">
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <Navbar />
      </div>
      {content}
    </div>
  );
}
