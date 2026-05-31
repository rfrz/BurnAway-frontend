import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

export default function DashboardLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const { t, language, changeLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: '/dashboard', icon: 'fa-chart-pie', label: t('nav.dashboard') || 'Dasbor' },
    { path: '/predict', icon: 'fa-wand-magic-sparkles', label: t('nav.predict') || 'Prediksi Baru' },
    { path: '/history', icon: 'fa-clipboard-list', label: t('nav.history') || 'Riwayat' }
  ];

  const getThemeIcon = () => {
    if (theme === 'light') return 'fa-sun';
    if (theme === 'dark') return 'fa-moon';
    return 'fa-desktop';
  };

  const getThemeLabel = () => {
    if (theme === 'light') return 'Terang';
    if (theme === 'dark') return 'Gelap';
    return 'Sistem';
  };

  const initial = user?.username ? user.username.charAt(0).toUpperCase() : 'U';

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      
      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 z-50 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 flex flex-col
          ${isCollapsed ? 'w-20' : 'w-72'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Sidebar Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <Link to="/dashboard" className={`flex items-center gap-3 overflow-hidden ${isCollapsed ? 'justify-center w-full' : ''}`}>
            <div className="w-10 h-10 shrink-0 bg-brand rounded-lg flex items-center justify-center text-white font-bold">
              <i className="fa-solid fa-fire-flame-curved"></i>
            </div>
            {!isCollapsed && (
              <div className="text-xl font-bold tracking-tighter text-slate-900 dark:text-white whitespace-nowrap">
                Burn<span className="text-brand">Away</span>
              </div>
            )}
          </Link>
          
          <button 
            className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <i className={`fa-solid ${isCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
          </button>
          
          <button 
            className="lg:hidden w-8 h-8 flex items-center justify-center text-slate-400"
            onClick={() => setIsMobileOpen(false)}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Sidebar Menu */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2 custom-scrollbar">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                  isActive 
                    ? 'bg-brand text-white shadow-md shadow-brand/20 font-bold' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 font-medium'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <i className={`fa-solid ${item.icon} text-lg ${isCollapsed ? 'mx-auto' : ''} ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-brand'}`}></i>
                {!isCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer (Settings & User) */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2 shrink-0">
          
          {/* Settings Row */}
          <div className={`flex ${isCollapsed ? 'flex-col items-center gap-2' : 'gap-2'}`}>
            
            <button 
              onClick={toggleTheme}
              className={`flex items-center justify-center h-10 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300 hover:text-brand transition-colors cursor-pointer ${isCollapsed ? 'w-10' : 'flex-1 gap-2'}`}
              title="Ganti Tema"
            >
              <i className={`fa-solid ${getThemeIcon()}`}></i>
              {!isCollapsed && <span className="text-sm font-semibold">{getThemeLabel()}</span>}
            </button>

            <select 
              value={language} 
              onChange={(e) => changeLanguage(e.target.value)}
              className={`h-10 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300 font-semibold cursor-pointer outline-none text-center ${isCollapsed ? 'w-10 text-xs px-1' : 'flex-1 px-2 text-sm'}`}
              title="Ganti Bahasa"
            >
              <option value="en">EN</option>
              <option value="id">ID</option>
            </select>

          </div>

          {/* User Menu */}
          <div className="relative pt-2">
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className={`w-full flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${isCollapsed ? 'justify-center' : ''}`}
            >
              <div className="w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center font-bold shrink-0 shadow-inner">
                {initial}
              </div>
              {!isCollapsed && (
                <div className="flex-1 text-left overflow-hidden">
                  <div className="text-sm font-bold text-slate-900 dark:text-white truncate">{user?.username || 'User'}</div>
                  <div className="text-xs text-slate-500 truncate">{user?.email || ''}</div>
                </div>
              )}
            </button>

            {/* Dropdown User Menu */}
            {showUserMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)}></div>
                <div className={`absolute bottom-full mb-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg z-50 py-2 overflow-hidden ${isCollapsed ? 'left-0 w-48' : 'left-0 w-full'}`}>
                  <Link 
                    to="/profile" 
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <i className="fa-solid fa-user text-slate-400"></i>
                    {t('nav.profile') || 'Profil'}
                  </Link>
                  <button 
                    onClick={() => {
                      setShowUserMenu(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors text-left"
                  >
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    {t('nav.logout') || 'Keluar'}
                  </button>
                </div>
              </>
            )}
          </div>

        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Mobile Topbar */}
        <div className="lg:hidden h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 shrink-0 justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center text-white font-bold text-sm">
              <i className="fa-solid fa-fire-flame-curved"></i>
            </div>
            <div className="text-lg font-bold tracking-tighter text-slate-900 dark:text-white">
              Burn<span className="text-brand">Away</span>
            </div>
          </div>
          <button 
            className="w-10 h-10 flex items-center justify-center text-slate-600 dark:text-slate-300"
            onClick={() => setIsMobileOpen(true)}
          >
            <i className="fa-solid fa-bars text-xl"></i>
          </button>
        </div>

        {/* Content Area with scroll */}
        <div className="flex-1 overflow-y-auto custom-scrollbar relative">
          <Outlet />
        </div>
      </main>

    </div>
  );
}
