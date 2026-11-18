import React, { useState } from 'react';
import { Search, Bookmark, Menu, X, UtensilsCrossed } from 'lucide-react';

export const Navbar = ({ searchQuery, setSearchQuery, savedCount, onOpenSaved }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-8">
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                <UtensilsCrossed className="w-5 h-5 text-gray-900" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-gray-900">
                SmartChef
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
                Home
              </a>
              <a href="#recipes" className="text-gray-900 font-semibold border-b-2 border-amber-400 pb-0.5">
                Recipes
              </a>
              <a href="#ingredients" className="text-gray-500 hover:text-gray-900 transition-colors">
                Ingredients
              </a>
              <a href="#meal-plans" className="text-gray-500 hover:text-gray-900 transition-colors">
                Meal Plans
              </a>
            </nav>
          </div>

          {/* Right Controls: Search, Bookmark, Avatar */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Pill Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search recipe or cuisine..."
                className="w-56 lg:w-72 pl-10 pr-4 py-2 bg-gray-100/80 hover:bg-gray-100 focus:bg-white text-sm rounded-full border border-transparent focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200 transition-all text-gray-800 placeholder-gray-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 bg-gray-200 rounded-full w-4 h-4 flex items-center justify-center"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Bookmark / Saved Trigger */}
            <button
              onClick={onOpenSaved}
              className="relative p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
              title="View Saved Recipes"
            >
              <Bookmark className={`w-5 h-5 ${savedCount > 0 ? 'fill-amber-400 text-amber-500' : ''}`} />
              {savedCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-amber-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-sm">
                  {savedCount}
                </span>
              )}
            </button>

            {/* User Avatar */}
            <div className="w-9 h-9 rounded-full ring-2 ring-amber-300 ring-offset-2 overflow-hidden shadow-sm flex-shrink-0 cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenSaved}
              className="relative p-2 text-gray-600"
            >
              <Bookmark className={`w-5 h-5 ${savedCount > 0 ? 'fill-amber-400 text-amber-500' : ''}`} />
              {savedCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Search & Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-gray-100 py-4 space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search recipe or cuisine..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            <div className="flex flex-col space-y-2 pt-2 text-sm font-medium">
              <a href="#" className="py-1 text-gray-600 hover:text-gray-900">Home</a>
              <a href="#recipes" className="py-1 font-semibold text-gray-900">Recipes</a>
              <a href="#ingredients" className="py-1 text-gray-600 hover:text-gray-900">Ingredients</a>
              <a href="#meal-plans" className="py-1 text-gray-600 hover:text-gray-900">Meal Plans</a>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
