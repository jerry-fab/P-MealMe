import React from 'react';
import { Star, Tag, Eye, Bookmark } from 'lucide-react';

export const MealCard = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all p-4 flex flex-col justify-between">
      {/* 1. Image & Rating */}
      <div className="relative aspect-[4/3] bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center p-2 mb-3">
        <img
          src={product.thumbnail || product.images?.[0]}
          alt={product.title}
          className="w-full h-full object-contain"
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-0.5 rounded-full text-xs font-bold text-slate-800 shadow flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{product.rating}</span>
        </div>
      </div>

      {/* 2. Details */}
      <div className="flex-1">
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-orange-50 text-orange-700 uppercase">
          <Tag className="w-2.5 h-2.5" />
          {product.category}
        </span>

        <h3 className="font-bold text-slate-900 text-base mt-1 truncate" title={product.title}>
          {product.title}
        </h3>

        <p className="text-slate-500 text-xs mt-1 line-clamp-2">
          {product.description}
        </p>

        <div className="text-xl font-bold text-slate-900 mt-3">
          ${product.price}
        </div>
      </div>

      {/* 3. Action Buttons */}
      <div className="flex gap-2 mt-4 pt-3 border-t border-slate-100">
        <button className="flex-1 bg-slate-900 text-white font-medium text-xs py-2 rounded-lg flex items-center justify-center gap-1 hover:bg-slate-800">
          <Eye className="w-3.5 h-3.5" />
          <span>View Details</span>
        </button>
        <button className="flex-1 border border-slate-200 text-slate-700 text-xs py-2 rounded-lg flex items-center justify-center gap-1 hover:bg-slate-50">
          <Bookmark className="w-3.5 h-3.5" />
          <span>Save</span>
        </button>
      </div>
    </div>
  );
};
