import React, { useState, useMemo } from 'react';
import { useGroceries } from './hooks/useGroceries';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { MealCard } from './components/MealCard';
import { CardSkeleton } from './components/CardSkeleton';
import { ErrorAlert } from './components/ErrorAlert';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SearchX, ArrowUpDown } from 'lucide-react';

export function App() {
  const { products, loading, error, refetch } = useGroceries();

  // Navigation & UI State
  const [activeTab, setActiveTab] = useState('meals');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Search, Filter & Sort State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [sortBy, setSortBy] = useState('default');

  // Detail Modal State
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Derive available category tags from API products
  const availableTags = useMemo(() => {
    const tagsSet = new Set(['All']);
    products.forEach((p) => {
      if (p.tags && Array.isArray(p.tags)) {
        p.tags.forEach((t) => tagsSet.add(t));
      }
    });
    return Array.from(tagsSet);
  }, [products]);

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch =
        product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTag =
        selectedTag === 'All' ||
        product.tags?.includes(selectedTag) ||
        product.category?.toLowerCase() === selectedTag.toLowerCase();

      return matchesSearch && matchesTag;
    });

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, searchQuery, selectedTag, sortBy]);

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">
      
      {/* 1. Left Sidebar (Matching Meal Mall design with Dashboard, Meal Card, Meal Create buttons) */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
      />

      {/* 2. Main Content Canvas */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Topbar Header */}
        <Topbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        />

        {/* Scrollable Meal Cards Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          
          <div className="space-y-6 max-w-7xl mx-auto">
            
            {/* Filter & Sorting Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              
              {/* Category / Tag Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap capitalize transition-all ${
                      selectedTag === tag
                        ? 'bg-orange-500 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Sorting & Product Count */}
              <div className="flex items-center justify-between sm:justify-end gap-3 flex-shrink-0">
                <span className="text-xs text-slate-400 font-medium">
                  Showing <strong className="text-slate-800">{filteredProducts.length}</strong> items
                </span>

                <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl text-xs text-slate-700">
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent font-semibold outline-none cursor-pointer"
                  >
                    <option value="default">Default Sort</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Loading State */}
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <CardSkeleton key={idx} />
                ))}
              </div>
            )}

            {/* Error State */}
            {!loading && error && (
              <ErrorAlert message={error} onRetry={refetch} />
            )}

            {/* Empty Filter State */}
            {!loading && !error && filteredProducts.length === 0 && (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 max-w-md mx-auto">
                <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-orange-600">
                  <SearchX className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  No matching meals found
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  No grocery items match your search "{searchQuery || selectedTag}".
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedTag('All');
                    setSortBy('default');
                  }}
                  className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
                >
                  Reset Filters
                </button>
              </div>
            )}

            {/* Meal Cards Grid (.map() iteration with unique key) */}
            {!loading && !error && filteredProducts.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <MealCard
                    key={product.id}
                    product={product}
                    onViewDetails={(item) => setSelectedProduct(item)}
                  />
                ))}
              </div>
            )}

          </div>

        </main>

      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

    </div>
  );
}

export default App;
