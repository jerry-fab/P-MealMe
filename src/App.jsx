import React, { useState, useMemo, useEffect } from 'react';
import { useGroceries } from './hooks/useGroceries';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { DashboardView } from './components/DashboardView';
import { MealCard } from './components/MealCard';
import { CardSkeleton } from './components/CardSkeleton';
import { ErrorAlert } from './components/ErrorAlert';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CreateMealModal } from './components/CreateMealModal';
import { CartModal } from './components/CartModal';
import { SearchX, Filter, ArrowUpDown } from 'lucide-react';

export function App() {
  const { products, loading, error, refetch, addProduct } = useGroceries();

  // Navigation & UI State
  const [activeTab, setActiveTab] = useState('meals'); // default to 'meals' as user requested cards!
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Search, Filter & Sort
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [sortBy, setSortBy] = useState('default');

  // Modals State
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  // Cart / Saved State with LocalStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem('meal_mall_cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('meal_mall_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to sync cart with localStorage', e);
    }
  }, [cartItems]);

  // Toggle Cart Item
  const handleToggleCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  // Derive unique tags from products
  const availableTags = useMemo(() => {
    const tagsSet = new Set(['All']);
    products.forEach((p) => {
      if (p.tags && Array.isArray(p.tags)) {
        p.tags.forEach((t) => tagsSet.add(t));
      }
    });
    return Array.from(tagsSet);
  }, [products]);

  // Filtered & Sorted Products
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

  // Dynamic Topbar Title
  const getHeaderTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Dashboard Overview';
      case 'meals':
        return 'Meal Cards & Groceries';
      case 'saved':
        return 'Cart & Saved Meals';
      default:
        return 'Meal Mall';
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">
      
      {/* 1. Left Sidebar (Matching Meal Mall design) */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartItems.length}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
      />

      {/* 2. Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header Bar */}
        <Topbar
          activeTitle={getHeaderTitle()}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          cartCount={cartItems.length}
          onOpenCart={() => setIsCartModalOpen(true)}
          onOpenCreate={() => setIsCreateModalOpen(true)}
          onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        />

        {/* Scrollable Main Canvas */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          
          {/* TAB 1: Dashboard View */}
          {activeTab === 'dashboard' && (
            <DashboardView
              products={products}
              onNavigateToMeals={() => setActiveTab('meals')}
              onViewDetails={(item) => setSelectedProduct(item)}
              onToggleCart={handleToggleCart}
              cartItems={cartItems}
            />
          )}

          {/* TAB 2: Meal Card Grid View */}
          {activeTab === 'meals' && (
            <div className="space-y-6">
              
              {/* Controls Bar: Tag Pills & Sort */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
                
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

                {/* Sort Dropdown & Product Count */}
                <div className="flex items-center justify-between sm:justify-end gap-3 flex-shrink-0">
                  <span className="text-xs text-slate-400 font-medium">
                    Showing <strong className="text-slate-800">{filteredProducts.length}</strong> items
                  </span>

                  <div className="flex items-center gap-1 bg-slate-100 px-3 py-1.5 rounded-xl text-xs text-slate-700">
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

              {/* Empty Search / Filter State */}
              {!loading && !error && filteredProducts.length === 0 && (
                <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 max-w-md mx-auto">
                  <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-orange-600">
                    <SearchX className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    No grocery items found
                  </h3>
                  <p className="text-xs text-slate-500 mb-6">
                    No items match your filter "{searchQuery || selectedTag}". Try searching for another keyword.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedTag('All');
                      setSortBy('default');
                    }}
                    className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl transition-all shadow-sm"
                  >
                    Reset Filters
                  </button>
                </div>
              )}

              {/* Product Card Grid (Responsive: 1 col mobile, 2 tablet, 3 desktop) */}
              {!loading && !error && filteredProducts.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <MealCard
                      key={product.id}
                      product={product}
                      onViewDetails={(item) => setSelectedProduct(item)}
                      onToggleCart={handleToggleCart}
                      isInCart={cartItems.some((item) => item.id === product.id)}
                    />
                  ))}
                </div>
              )}

            </div>
          )}

          {/* TAB 3: Saved & Cart View */}
          {activeTab === 'saved' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Saved & Cart Items ({cartItems.length})
                    </h3>
                    <p className="text-xs text-slate-500">
                      Manage items bookmarked for meal planning or purchase
                    </p>
                  </div>
                  {cartItems.length > 0 && (
                    <button
                      onClick={() => setCartItems([])}
                      className="text-xs text-rose-500 hover:text-rose-700 font-semibold"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-sm font-bold text-slate-700">No items saved yet</p>
                    <p className="text-xs text-slate-400 mt-1 mb-4">Go to Meal Cards and add items to your cart.</p>
                    <button
                      onClick={() => setActiveTab('meals')}
                      className="px-4 py-2 bg-orange-500 text-white rounded-xl text-xs font-semibold"
                    >
                      Browse Groceries
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {cartItems.map((item) => (
                      <MealCard
                        key={item.id}
                        product={item}
                        onViewDetails={(prod) => setSelectedProduct(prod)}
                        onToggleCart={handleToggleCart}
                        isInCart={true}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

        </main>

      </div>

      {/* 3. Global Modals */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onToggleCart={handleToggleCart}
        isInCart={selectedProduct ? cartItems.some((item) => item.id === selectedProduct.id) : false}
      />

      <CreateMealModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onAddProduct={addProduct}
      />

      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onViewDetails={(item) => setSelectedProduct(item)}
      />

    </div>
  );
}

export default App;
