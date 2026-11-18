import React, { useEffect } from 'react';
import { X, Star, Clock, Flame, Users, ChefHat, Check } from 'lucide-react';

export const RecipeModal = ({ recipe, onClose }) => {
  useEffect(() => {
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!recipe) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto z-10">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-white/80 hover:bg-white text-gray-700 hover:text-gray-900 rounded-full p-2 backdrop-blur-md shadow-md transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image Header */}
        <div className="relative h-64 sm:h-72 w-full bg-gray-100">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          <div className="absolute bottom-5 left-5 right-5 text-white">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-amber-400 text-gray-900 font-bold text-xs px-3 py-1 rounded-full">
                {recipe.cuisine}
              </span>
              <span className="bg-white/20 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-medium">
                {recipe.difficulty}
              </span>
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold ml-auto">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{recipe.rating}</span>
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {recipe.name}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center">
            <div>
              <div className="flex items-center justify-center gap-1 text-gray-400 text-xs mb-1">
                <Clock className="w-3.5 h-3.5" /> Prep
              </div>
              <span className="font-bold text-gray-800 text-sm">{recipe.prepTimeMinutes || 15} mins</span>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 text-gray-400 text-xs mb-1">
                <Clock className="w-3.5 h-3.5" /> Cook
              </div>
              <span className="font-bold text-gray-800 text-sm">{recipe.cookTimeMinutes || 20} mins</span>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 text-gray-400 text-xs mb-1">
                <Users className="w-3.5 h-3.5" /> Servings
              </div>
              <span className="font-bold text-gray-800 text-sm">{recipe.servings || 4}</span>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 text-gray-400 text-xs mb-1">
                <Flame className="w-3.5 h-3.5" /> Calories
              </div>
              <span className="font-bold text-gray-800 text-sm">{recipe.caloriesPerServing || 350} kcal</span>
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span>Ingredients</span>
              <span className="text-xs bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded-full">
                {recipe.ingredients?.length || 0}
              </span>
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
              {recipe.ingredients?.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2.5 p-2 rounded-lg bg-gray-50 border border-gray-100">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Step-by-Step Instructions */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              Instructions
            </h3>
            <ol className="space-y-3">
              {recipe.instructions?.map((step, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-gray-700">
                  <span className="w-6 h-6 rounded-full bg-amber-400 text-gray-900 font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-sm">
                    {idx + 1}
                  </span>
                  <p className="leading-relaxed pt-0.5">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Footer Action */}
          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-semibold text-sm rounded-full transition-colors"
            >
              Close
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
