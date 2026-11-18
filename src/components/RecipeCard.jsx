import React from 'react';
import { Star, Clock, ChefHat, Bookmark } from 'lucide-react';

/**
 * Reusable RecipeCard component.
 * Displays recipe image, title, cuisine, rating, difficulty, duration, and action buttons.
 */
export const RecipeCard = ({ recipe, onView, onToggleSave, isSaved }) => {
  // Construct dynamic description using recipe ingredients if available
  const summaryText = recipe.ingredients && recipe.ingredients.length > 0
    ? `A delicious ${recipe.cuisine} dish made with ${recipe.ingredients.slice(0, 3).join(', ')}.`
    : `Authentic ${recipe.cuisine} recipe perfect for ${recipe.mealType?.[0] || 'any occasion'}.`;

  const totalTime = (recipe.prepTimeMinutes || 0) + (recipe.cookTimeMinutes || 0);

  // Difficulty badge colors
  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return 'bg-sky-50 text-sky-700 border-sky-100';
      case 'medium':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'hard':
        return 'bg-rose-50 text-rose-700 border-rose-100';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  return (
    <article className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between">
      
      {/* 1. Recipe Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Floating Rating Badge */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{recipe.rating}</span>
          <span className="text-gray-400 font-normal">({recipe.reviewCount})</span>
        </div>

        {/* Floating Meal Type / Cuisine Tag */}
        <div className="absolute top-3 left-3 bg-gray-900/80 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-wide">
          {recipe.cuisine}
        </div>
      </div>

      {/* 2. Recipe Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Recipe Name */}
          <h3 
            className="font-bold text-gray-900 text-lg leading-snug line-clamp-1 group-hover:text-amber-600 transition-colors"
            title={recipe.name}
          >
            {recipe.name}
          </h3>

          {/* Short Description */}
          <p className="text-gray-500 text-xs mt-1.5 line-clamp-2 leading-relaxed">
            {summaryText}
          </p>

          {/* 3. Badges Row (Cuisine / Diet, Difficulty, Time) */}
          <div className="flex flex-wrap items-center gap-2 mt-4">
            {/* Cuisine / Meal Badge */}
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
              {recipe.mealType?.[0] || recipe.cuisine}
            </span>

            {/* Difficulty Badge (Requirement) */}
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(recipe.difficulty)}`}>
              {recipe.difficulty}
            </span>

            {/* Time Badge */}
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-100 flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-600" />
              <span>{totalTime > 0 ? `${totalTime} mins` : '20 mins'}</span>
            </span>
          </div>
        </div>

        {/* 4. Action Buttons */}
        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-50">
          <button
            type="button"
            onClick={() => onView(recipe)}
            className="flex-1 bg-amber-400 hover:bg-amber-500 active:scale-[0.98] text-gray-900 font-semibold text-sm py-2.5 px-4 rounded-full transition-all text-center shadow-sm"
          >
            View Recipe
          </button>
          
          <button
            type="button"
            onClick={() => onToggleSave(recipe)}
            className={`flex-1 border text-sm font-semibold py-2.5 px-4 rounded-full transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] ${
              isSaved
                ? 'bg-amber-50 border-amber-300 text-amber-800'
                : 'border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-500 text-amber-500' : ''}`} />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>
        </div>

      </div>

    </article>
  );
};
