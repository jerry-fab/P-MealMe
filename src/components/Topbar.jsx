import React from 'react';
import { Search, Menu, ShoppingBag, Plus } from 'lucide-react';

export const Topbar = ({
  activeTitle,
  searchQuery,
  setSearchQuery,
  cartCount,
  onOpenCart,
  onOpenCreate,
  onToggleMobileSidebar,
}) => {
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

        <h1 className="text-xl font-bold text-slate-800 capitalize tracking-tight">
          {activeTitle || 'Dashboard'}
        </h1>
      </div>

      {/* Right Controls: Search, Quick Add, Cart, Avatar */}
      <div className="flex items-center gap-3 sm:gap-5">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search groceries..."
            className="w-40 sm:w-64 pl-10 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 bg-slate-200 rounded-full w-4 h-4 flex items-center justify-center"
            >
              ✕
            </button>
          )}
        </div>

        {/* Quick Add Button */}
        <button
          onClick={onOpenCreate}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Item</span>
        </button>

        {/* Cart / Saved Counter */}
        <button
          onClick={onOpenCart}
          className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          title="View Cart / Saved"
        >
          <ShoppingBag className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-sm">
              {cartCount}
            </span>
          )}
        </button>

        {/* User Profile Avatar */}
        <div className="w-9 h-9 rounded-full ring-2 ring-orange-200 overflow-hidden shadow-sm flex-shrink-0 cursor-pointer">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
            alt="Profile Avatar"
            className="w-full h-full object-cover"
          />
        </div>

      </div>

    </header>
  );
};
