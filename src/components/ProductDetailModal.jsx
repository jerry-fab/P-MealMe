import React, { useEffect } from 'react';
import { X, Star, ShieldCheck, Truck, RotateCcw, PackageCheck, User } from 'lucide-react';

export const ProductDetailModal = ({ product, onClose, onToggleCart, isInCart }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto z-10">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 rounded-full p-2 shadow-md transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Visual Header */}
        <div className="relative h-64 sm:h-72 w-full bg-slate-50 flex items-center justify-center p-6 border-b border-slate-100">
          <img
            src={product.thumbnail || product.images?.[0]}
            alt={product.title}
            className="h-full max-w-full object-contain drop-shadow-md"
          />

          <div className="absolute top-4 left-4 flex gap-2">
            <span className="bg-orange-500 text-white font-bold text-xs px-3 py-1 rounded-full shadow-sm">
              {product.category}
            </span>
            {product.discountPercentage && (
              <span className="bg-rose-500 text-white font-bold text-xs px-2.5 py-1 rounded-full shadow-sm">
                {Math.round(product.discountPercentage)}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Header Info */}
          <div>
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-extrabold text-slate-900">
                {product.title}
              </h2>
              <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full text-xs font-bold text-amber-800 flex-shrink-0">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
              </div>
            </div>
            
            <p className="text-slate-600 text-sm mt-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Pricing & Stock Banner */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-medium block">Price per unit</span>
              <span className="text-3xl font-black text-slate-900">
                ${Number(product.price).toFixed(2)}
              </span>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 font-medium block">Inventory Status</span>
              <span className="inline-flex items-center gap-1 text-sm font-bold text-emerald-600">
                <PackageCheck className="w-4 h-4" />
                {product.availabilityStatus || 'In Stock'} ({product.stock} units)
              </span>
            </div>
          </div>

          {/* Guarantees & Shipping Specs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2.5">
              <Truck className="w-5 h-5 text-orange-500 flex-shrink-0" />
              <div>
                <span className="font-bold text-slate-800 block">Shipping</span>
                <span className="text-slate-500">{product.shippingInformation || 'Standard'}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              <div>
                <span className="font-bold text-slate-800 block">Warranty</span>
                <span className="text-slate-500">{product.warrantyInformation || 'Quality Assured'}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2.5">
              <RotateCcw className="w-5 h-5 text-blue-500 flex-shrink-0" />
              <div>
                <span className="font-bold text-slate-800 block">Returns</span>
                <span className="text-slate-500">{product.returnPolicy || '30 days policy'}</span>
              </div>
            </div>
          </div>

          {/* Customer Reviews Section */}
          {product.reviews && product.reviews.length > 0 && (
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span>Customer Reviews</span>
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold">
                  {product.reviews.length}
                </span>
              </h3>

              <div className="space-y-2.5">
                {product.reviews.map((rev, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5 font-bold text-slate-800">
                        <User className="w-3 h-3 text-slate-400" />
                        <span>{rev.reviewerName}</span>
                      </div>
                      <div className="flex items-center text-amber-500 font-semibold">
                        {'★'.repeat(rev.rating)}
                        <span className="text-slate-400 ml-1">({rev.rating}/5)</span>
                      </div>
                    </div>
                    <p className="text-slate-600 italic">"{rev.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 text-slate-600 hover:text-slate-900 font-semibold text-xs transition-colors"
            >
              Close
            </button>

            <button
              onClick={() => {
                onToggleCart(product);
              }}
              className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95"
            >
              {isInCart ? 'Remove from Cart' : 'Add to Cart'}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
