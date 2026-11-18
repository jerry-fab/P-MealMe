import React from 'react';
import { Search, Menu } from 'lucide-react';

export const Topbar = ({ onToggleMobileSidebar }) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 shadow-sm px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
      
      {/* Left: Mobile hamburger + Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
          title="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <h1 className="text-xl font-bold text-slate-800 tracking-tight">
          Meal Card
        </h1>
      </div>

      {/* Right Controls: Search bar, Search button & Profile Avatar */}
      <div className="flex items-center gap-3 sm:gap-6">
        
        {/* Search input with button */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Meals..."
              className="w-36 sm:w-64 pl-10 pr-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all"
            />
          </div>
          <button
            type="button"
            className="px-3.5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
          >
            Search
          </button>
        </div>

        {/* User Profile Avatar */}
        <div className="w-10 h-10 rounded-full ring-2 ring-slate-100 overflow-hidden shadow-sm flex-shrink-0 cursor-pointer bg-white p-0.5">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
            alt="Profile Avatar"
            className="w-full h-full object-cover rounded-full"
          />
        </div>

      </div>

    </header>
  );
};
