import React from 'react';
import { Package, TrendingUp, Star, AlertTriangle, ArrowRight, Sparkles } from 'lucide-react';
import { MealCard } from './MealCard';

export const DashboardView = ({
  products,
  onNavigateToMeals,
  onViewDetails,
  onToggleCart,
  cartItems,
}) => {
  const totalProducts = products.length;
  const inStockCount = products.filter((p) => (p.stock || 0) > 0).length;
  const lowStockCount = products.filter((p) => (p.stock || 0) <= 10).length;
  const avgRating = totalProducts
    ? (products.reduce((acc, p) => acc + (p.rating || 0), 0) / totalProducts).toFixed(1)
    : '4.5';

  // Top 3 rated products
  const topProducts = [...products]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 3);

  const stats = [
    {
      title: 'Total Grocery Items',
      value: totalProducts,
      subtext: 'From DummyJSON API',
      icon: Package,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Average Rating',
      value: `⭐ ${avgRating}`,
      subtext: 'Customer satisfaction',
      icon: Star,
      color: 'bg-amber-50 text-amber-600',
    },
    {
      title: 'In Stock Items',
      value: inStockCount,
      subtext: `${lowStockCount} items low stock`,
      icon: TrendingUp,
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      title: 'Active Alerts',
      value: `${lowStockCount} Low Stock`,
      subtext: 'Needs replenishment',
      icon: AlertTriangle,
      color: 'bg-rose-50 text-rose-600',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Welcome Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-orange-950 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-semibold mb-3 border border-orange-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Meal Mall Executive Dashboard</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
            Welcome to Meal Mall
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            Real-time management system for fresh groceries, meal ingredients, inventory stock, and customer ratings fetched directly from DummyJSON.
          </p>
          <button
            onClick={onNavigateToMeals}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-semibold shadow-md transition-all active:scale-95"
          >
            <span>Explore Meal Cards</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        
        {/* Subtle decorative circles */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">{stat.title}</p>
                <h4 className="text-xl font-bold text-slate-900 mt-0.5">{stat.value}</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">{stat.subtext}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Featured / Top Rated Groceries */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Top Rated Groceries & Ingredients
            </h3>
            <p className="text-xs text-slate-500">
              Highest customer rated items ready for kitchen preparation
            </p>
          </div>
          <button
            onClick={onNavigateToMeals}
            className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1"
          >
            <span>View All ({totalProducts})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topProducts.map((product) => (
            <MealCard
              key={product.id}
              product={product}
              onViewDetails={onViewDetails}
              onToggleCart={onToggleCart}
              isInCart={cartItems.some((item) => item.id === product.id)}
            />
          ))}
        </div>
      </div>

    </div>
  );
};
