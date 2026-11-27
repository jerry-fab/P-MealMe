import { useLocation } from 'react-router-dom';
import { Search, Menu } from 'lucide-react';

export const Topbar = ({ onToggleMobileSidebar }) => {
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case '/dashboard':
        return 'Dashboard';
      case '/create-meal':
        return 'Create Meal';
      case '/meal-list':
      default:
        return 'Meal Card';
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button onClick={onToggleMobileSidebar} className="lg:hidden p-2 text-slate-600">
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold text-slate-800">{getTitle()}</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search..."
              className="w-36 sm:w-60 pl-9 pr-3 py-1.5 bg-slate-100 rounded-lg text-sm outline-none"
            />
          </div>
          <button className="px-3 py-1.5 bg-orange-500 text-white rounded-lg text-xs font-semibold">
            Search
          </button>
        </div>

        <img
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
          alt="Avatar"
          className="w-9 h-9 rounded-full object-cover"
        />
      </div>
    </header>
  );
};
