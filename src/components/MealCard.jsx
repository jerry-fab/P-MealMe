import React from 'react';
import { Star, ShoppingCart, Check, Tag, ShieldCheck } from 'lucide-react';

/**
 * Reusable MealCard / Grocery Product Card component.
 * Displays image, title, category, price, discount, rating, stock status, and action buttons.
 */
export const MealCard = ({ product, onViewDetails, onToggleCart, isInCart }) => {
  const originalPrice = product.discountPercentage
    ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
    : null;

  const isLowStock = product.stock <= 10;

  return (
    <article className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between">
      
      {/* 1. Image Container with Floating Badges */}
      <div className="relative aspect-[4/3] bg-slate-50 overflow-hidden flex items-center justify-center p-4">
        <img
          src={product.thumbnail || product.images?.[0]}
          alt={product.title}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Floating Rating Badge */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm flex items-center gap-1 border border-slate-100">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{product.rating}</span>
        </div>

        {/* Floating Discount Badge */}
        {product.discountPercentage && (
          <div className="absolute top-3 left-3 bg-rose-500 text-white px-2.5 py-0.5 rounded-full text-[11px] font-bold shadow-sm tracking-wide">
            {Math.round(product.discountPercentage)}% OFF
          </div>
        )}
      </div>

      {/* 2. Product Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Stock Badges */}
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-orange-50 text-orange-700 border border-orange-100 uppercase tracking-wider">
              <Tag className="w-2.5 h-2.5" />
              {product.tags?.[0] || product.category}
            </span>

            <span
              className={`px-2 py-0.5 rounded-md text-[11px] font-semibold ${
                isLowStock
                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
              }`}
            >
              {isLowStock ? `Low Stock (${product.stock})` : product.availabilityStatus || 'In Stock'}
            </span>
          </div>

          {/* Title */}
          <h3 
            className="font-bold text-slate-900 text-lg leading-snug line-clamp-1 group-hover:text-orange-600 transition-colors"
            title={product.title}
          >
            {product.title}
          </h3>

          {/* Description */}
          <p className="text-slate-500 text-xs mt-1.5 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Price & Shipping Info */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">
                ${Number(product.price).toFixed(2)}
              </span>
              {originalPrice && (
                <span className="text-xs text-slate-400 line-through">
                  ${originalPrice}
                </span>
              )}
            </div>

            <span className="text-[11px] text-slate-400 font-medium">
              {product.shippingInformation || 'Fast Delivery'}
            </span>
          </div>
        </div>

        {/* 3. Action Buttons */}
        <div className="flex items-center gap-2.5 mt-5">
          <button
            type="button"
            onClick={() => onViewDetails(product)}
            className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs py-2.5 px-3 rounded-xl transition-all shadow-sm active:scale-[0.98] text-center"
          >
            View Details
          </button>

          <button
            type="button"
            onClick={() => onToggleCart(product)}
            className={`flex-1 border text-xs font-semibold py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] ${
              isInCart
                ? 'bg-orange-50 border-orange-300 text-orange-700'
                : 'border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {isInCart ? (
              <>
                <Check className="w-3.5 h-3.5 text-orange-600" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>

      </div>

    </article>
  );
};
