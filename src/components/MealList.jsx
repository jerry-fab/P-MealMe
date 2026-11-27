import { useGroceries } from '../hooks/useGroceries';
import { MealCard } from './MealCard';
import { CardSkeleton } from './CardSkeleton';
import { ErrorAlert } from './ErrorAlert';

export const MealList = () => {
  const { products, loading, error, refetch } = useGroceries();

  return (
    <div className="max-w-7xl mx-auto">
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <CardSkeleton key={idx} />
          ))}
        </div>
      )}

      {!loading && error && <ErrorAlert message={error} onRetry={refetch} />}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <MealCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
