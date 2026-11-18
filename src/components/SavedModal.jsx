import React from 'react';
import { X, Trash2, ExternalLink, Bookmark } from 'lucide-react';

export const SavedModal = ({ isOpen, onClose, savedRecipes, onRemoveSaved, onViewRecipe }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[85vh] flex flex-col z-10 overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Bookmark className="w-5 h-5 fill-amber-500 text-amber-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Saved Recipes</h2>
              <p className="text-xs text-gray-500">{savedRecipes.length} item{savedRecipes.length !== 1 ? 's' : ''} bookmarked</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-3">
          {savedRecipes.length === 0 ? (
            <div className="text-center py-12">
              <Bookmark className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm font-semibold text-gray-700">No saved recipes yet</p>
              <p className="text-xs text-gray-400 mt-1">Click the "Save" button on any recipe card to keep it here.</p>
            </div>
          ) : (
            savedRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 hover:bg-gray-100/80 border border-gray-100 transition-colors"
              >
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-gray-900 truncate">
                    {recipe.name}
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {recipe.cuisine} · {recipe.difficulty}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      onViewRecipe(recipe);
                      onClose();
                    }}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-white rounded-lg transition-colors"
                    title="View Details"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onRemoveSaved(recipe.id)}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-white rounded-lg transition-colors"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-900 text-white rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
