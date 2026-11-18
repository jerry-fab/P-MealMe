import React from 'react';
import { LayoutDashboard, Utensils, CirclePlus, X, Store } from 'lucide-react';

export const Sidebar = ({ mobileOpen, setMobileOpen }) => {
  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 min-h-screen bg-slate-900 text-white flex flex-col transition-transform duration-300 lg:static lg:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center shadow-md shadow-orange-500/20">
              <Store className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white leading-none">
                Meal Mall
              </h1>
              <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">
                Groceries & Meals
              </span>
            </div>
          </div>

          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-3">
            Main Menu
          </p>

          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-all">
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold bg-orange-500 text-white shadow-md hover:bg-orange-600 transition-all">
              <Utensils className="w-5 h-5" />
              <span>Meal Card</span>
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-all">
              <CirclePlus className="w-5 h-5" />
              <span>Meal Create</span>
            </button>
          </div>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <p className="text-xs text-slate-400 text-center font-medium">
            © 2026 Meal Mall
          </p>
        </div>
      </aside>
    </>
  );
};
