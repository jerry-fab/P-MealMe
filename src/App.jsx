import React, { useState } from 'react';
import { useGroceries } from './hooks/useGroceries';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { MealCard } from './components/MealCard';
import { CardSkeleton } from './components/CardSkeleton';
import { ErrorAlert } from './components/ErrorAlert';

export function App() {
  const { products, loading, error, refetch } = useGroceries();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <CardSkeleton key={idx} />
                ))}
              </div>
            )}

            {!loading && error && (
              <ErrorAlert message={error} onRetry={refetch} />
            )}

            {!loading && !error && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <MealCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
