import React, { useState, useMemo, useEffect } from 'react';
import { useRecipes } from './hooks/useRecipes';
import { Navbar } from './components/Navbar';
import { RecipeCard } from './components/RecipeCard';
import { RecipeSkeleton } from './components/RecipeSkeleton';
import { ErrorAlert } from './components/ErrorAlert';
import { RecipeModal } from './components/RecipeModal';
import { SavedModal } from './components/SavedModal';
import { SearchX, SlidersHorizontal, Sparkles } from 'lucide-react';

export function App() {
  const { recipes, loading, error, refetch } = useRecipes();
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  // Modal & Saved State
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [savedRecipes, setSavedRecipes] = useState(() => {
    try {
      const stored = localStorage.getItem('smartchef_saved_recipes');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Sync saved recipes with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('smartchef_saved_recipes', JSON.stringify(savedRecipes));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [savedRecipes]);

  // Handle Save / Unsave Toggle
  const handleToggleSave = (recipe) => {
    setSavedRecipes((prev) => {
      const exists = prev.some((item) => item.id === recipe.id);
      if (exists) {
        return prev.filter((item) => item.id !== recipe.id);
      } else {
        return [...prev, recipe];
      }
    });
  };

  const handleRemoveSaved = (recipeId) => {
    setSavedRecipes((prev) => prev.filter((item) => item.id !== recipeId));
  };

  // Extract unique cuisines for the filter pills
  const availableCuisines = useMemo(() => {
    if (!recipes.length) return ['All'];
    const cuisines = new Set(recipes.map((r) => r.cuisine).filter(Boolean));
    return ['All', ...Array.from(cuisines).slice(0, 8)];
  }, [recipes]);

  // Filter recipes based on search, cuisine, and difficulty
  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesSearch =
        recipe.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.cuisine?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCuisine =
        selectedCuisine === 'All' || recipe.cuisine === selectedCuisine;

      const matchesDifficulty =
        selectedDifficulty === 'All' ||
        recipe.difficulty?.toLowerCase() === selectedDifficulty.toLowerCase();

      return matchesSearch && matchesCuisine && matchesDifficulty;
    });
  }, [recipes, searchQuery, selectedCuisine, selectedDifficulty]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      
      {/* 1. Navigation Bar */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        savedCount={savedRecipes.length}
        onOpenSaved={() => setIsSavedModalOpen(true)}
      />

      {/* 2. Main Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        
        {/* Section Heading matching the mockup */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Curated Recipes</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Recipe Results
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Explore freshly prepared dishes, ingredients, and cooking steps.
            </p>
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {availableCuisines.map((cuisine) => (
              <button
                key={cuisine}
                onClick={() => setSelectedCuisine(cuisine)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCuisine === cuisine
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cuisine}
              </button>
            ))}
          </div>
        </div>

        {/* 3. States: Loading / Error / Empty / Grid */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, idx) => (
              <RecipeSkeleton key={idx} />
            ))}
          </div>
        )}

        {!loading && error && (
          <ErrorAlert message={error} onRetry={refetch} />
        )}

        {!loading && !error && filteredRecipes.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 p-8 max-w-lg mx-auto">
            <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-amber-600">
              <SearchX className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              No matching recipes found
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              We couldn't find any recipes matching "{searchQuery}". Try searching for another cuisine or dish name.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCuisine('All');
                setSelectedDifficulty('All');
              }}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold text-sm rounded-full transition-colors shadow-sm"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* 4. Recipe Grid (Responsive: 1 col on mobile, 2 on tablet, 3 on desktop) */}
        {!loading && !error && filteredRecipes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onView={(item) => setSelectedRecipe(item)}
                onToggleSave={handleToggleSave}
                isSaved={savedRecipes.some((item) => item.id === recipe.id)}
              />
            ))}
          </div>
        )}

      </main>

      {/* 5. Modals */}
      <RecipeModal
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />

      <SavedModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedRecipes={savedRecipes}
        onRemoveSaved={handleRemoveSaved}
        onViewRecipe={(item) => setSelectedRecipe(item)}
      />

      {/* 6. Footer */}
      <footer className="mt-16 border-t border-gray-200/80 bg-white py-8 text-center text-xs text-gray-400">
        <p className="font-medium text-gray-500">
          SmartChef Recipe Application · Built with React.js, Axios & Tailwind CSS
        </p>
        <p className="mt-1">Powered by DummyJSON Recipes Public API</p>
      </footer>

    </div>
  );
}

export default App;
