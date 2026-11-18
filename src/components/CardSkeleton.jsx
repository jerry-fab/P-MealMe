import React from 'react';

export const CardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col justify-between animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-[4/3] bg-slate-100 flex items-center justify-center p-6">
        <div className="w-24 h-24 bg-slate-200 rounded-full" />
      </div>

      {/* Content Skeleton */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex gap-2 mb-3">
            <div className="h-4 w-16 bg-slate-200 rounded" />
            <div className="h-4 w-14 bg-slate-200 rounded" />
          </div>

          <div className="h-5 bg-slate-200 rounded w-3/4 mb-2" />
          <div className="h-3 bg-slate-200 rounded w-full mb-1" />
          <div className="h-3 bg-slate-200 rounded w-4/5 mb-4" />

          <div className="flex justify-between items-baseline pt-3 border-t border-slate-100">
            <div className="h-6 w-16 bg-slate-200 rounded" />
            <div className="h-3 w-14 bg-slate-200 rounded" />
          </div>
        </div>

        {/* Buttons Skeleton */}
        <div className="flex gap-2.5 mt-5">
          <div className="h-9 bg-slate-200 rounded-xl flex-1" />
          <div className="h-9 bg-slate-200 rounded-xl flex-1" />
        </div>
      </div>
    </div>
  );
};
