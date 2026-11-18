import React from 'react';

/**
 * Skeleton placeholder for RecipeCard while fetching data.
 */
export const RecipeSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-[16/10] bg-gray-200" />

      {/* Content Skeleton */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title line */}
          <div className="h-5 bg-gray-200 rounded-md w-3/4 mb-3" />
          
          {/* Subtitle lines */}
          <div className="h-3 bg-gray-200 rounded w-full mb-1.5" />
          <div className="h-3 bg-gray-200 rounded w-4/5 mb-4" />

          {/* Badges */}
          <div className="flex items-center gap-2">
            <div className="h-6 w-16 bg-gray-200 rounded-full" />
            <div className="h-6 w-14 bg-gray-200 rounded-full" />
            <div className="h-6 w-16 bg-gray-200 rounded-full" />
          </div>
        </div>

        {/* Buttons Skeleton */}
        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-50">
          <div className="h-10 bg-gray-200 rounded-full flex-1" />
          <div className="h-10 bg-gray-200 rounded-full flex-1" />
        </div>
      </div>
    </div>
  );
};
