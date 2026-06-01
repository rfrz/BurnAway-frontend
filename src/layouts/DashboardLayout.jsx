import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { useLanguage } from '../hooks/useLanguage.js';
import { useTheme } from '../hooks/useTheme.js';

export default function DashboardLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const { t, language, changeLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const navItems = [
    { path: '/dashboard', icon: 'fa-chart-pie', label: t('nav.dashboard') },
    { path: '/predict', icon: 'fa-wand-magic-sparkles', label: t('nav.predict') },
    { path: '/history', icon: 'fa-clipboard-list', label: t('nav.history') }
  ];

  const languages = [
    { value: 'en', label: 'EN' },
    { value: 'id', label: 'ID' }
  ];

  const getThemeIcon = () => {
    if (theme === 'light') return 'fa-sun';
    if (theme === 'dark') return 'fa-moon';
    return 'fa-desktop';
  };

  const getThemeLabel = () => {
    if (theme === 'light') return t('theme.light');
    if (theme === 'dark') return t('theme.dark');
    return t('theme.system');
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
        <div className={`h-20 flex items-center border-b border-slate-200 dark:border-slate-800 shrink-0 ${isCollapsed ? 'justify-center px-4' : 'justify-between px-6'}`}>
          {!isCollapsed && (
            <Link to="/" className="flex items-center gap-3 overflow-hidden">
              <img
                src={`${import.meta.env.BASE_URL}assets/logo-burnaway.png`}
                alt="BurnAway"
                className="w-10 h-10 object-contain shrink-0"
              />
              <div className="text-xl font-bold tracking-tighter text-slate-900 dark:text-white whitespace-nowrap">
                Burn<span className="text-brand">Away</span>
              </div>
            </Link>
          )}
          
          <button 
            className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <i className={`fa-solid ${isCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
          </button>
          
          <button 
            className="lg:hidden w-8 h-8 flex items-center justify-center text-slate-400"
            onClick={() => setIsMobileOpen(false)}
            aria-label={t('common.close_menu')}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Sidebar Menu */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2 custom-scrollbar">
          {navItems.map((item) => {
            const isActive = children ? false : location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                  isActive 
                    ? 'bg-brand text-white shadow-md shadow-brand/20 font-bold' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 font-medium'
                } ${isCollapsed ? 'justify-center' : ''}`}
                title={isCollapsed ? item.label : undefined}
              >
                <i className={`fa-solid ${item.icon} w-5 shrink-0 text-center text-lg ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-brand'}`}></i>
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
              className={`flex items-center justify-center h-10 text-slate-600 dark:text-slate-300 hover:text-brand transition-colors cursor-pointer ${isCollapsed ? 'w-10' : 'flex-1 gap-2'}`}
              title={t('theme.change')}
            >
              <i className={`fa-solid ${getThemeIcon()}`}></i>
              {!isCollapsed && <span className="text-sm font-semibold">{getThemeLabel()}</span>}
            </button>

            <div className={`relative ${isCollapsed ? 'w-10' : 'flex-1'}`}>
              <button
                type="button"
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className={`flex h-10 w-full items-center justify-center text-slate-600 dark:text-slate-300 hover:text-brand transition-colors cursor-pointer ${isCollapsed ? '' : 'gap-2'}`}
                title={t('common.language_title')}
                aria-haspopup="listbox"
                aria-expanded={showLanguageMenu}
              >
                <i className="fa-solid fa-globe"></i>
                {!isCollapsed && <span className="text-sm font-semibold">{language.toUpperCase()}</span>}
                {!isCollapsed && (
                  <i className={`fa-solid fa-chevron-down text-[10px] transition-transform ${showLanguageMenu ? 'rotate-180' : ''}`}></i>
                )}
              </button>

              {showLanguageMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowLanguageMenu(false)}></div>
                  <div className={`absolute bottom-full mb-2 z-50 overflow-hidden rounded-xl bg-white/95 py-1 shadow-xl shadow-slate-900/10 backdrop-blur-md dark:bg-slate-800/95 dark:shadow-black/30 ${isCollapsed ? 'left-0 w-24' : 'left-0 w-full'}`}>
                    {languages.map((item) => (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => {
                          changeLanguage(item.value);
                          setShowLanguageMenu(false);
                        }}
                        className={`w-full px-4 py-2 text-left text-sm font-semibold transition-colors ${
                          language === item.value
                            ? 'bg-brand/10 text-brand'
                            : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700/70'
                        }`}
                        role="option"
                        aria-selected={language === item.value}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

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
                  <div className="text-sm font-bold text-slate-900 dark:text-white truncate">{user?.username || t('common.default_user')}</div>
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
                    {t('nav.profile')}
                  </Link>
                  <button 
                    onClick={() => {
                      setShowUserMenu(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors text-left"
                  >
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    {t('nav.logout')}
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
        <div className="lg:hidden h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 shrink-0 gap-3">
          <button 
            className="w-10 h-10 flex items-center justify-center text-slate-600 dark:text-slate-300 shrink-0"
            onClick={() => setIsMobileOpen(true)}
            aria-label={t('common.open_menu')}
          >
            <i className="fa-solid fa-bars text-xl"></i>
          </button>

          <Link to="/" className="flex items-center gap-2 min-w-0 overflow-hidden">
            <img
              src={`${import.meta.env.BASE_URL}assets/logo-burnaway.png`}
              alt="BurnAway"
              className="w-8 h-8 object-contain shrink-0"
            />
            <div className="text-lg font-bold tracking-tighter text-slate-900 dark:text-white whitespace-nowrap truncate">
              Burn<span className="text-brand">Away</span>
            </div>
          </Link>
        </div>

        {/* Content Area with scroll */}
        <div className="flex-1 overflow-y-auto custom-scrollbar relative">
          {children || <Outlet />}
        </div>
      </main>

    </div>
  );
}
