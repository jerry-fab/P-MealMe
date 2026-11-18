import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export const CartModal = ({ isOpen, onClose, cartItems, onRemoveItem, onViewDetails }) => {
  if (!isOpen) return null;

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + (parseFloat(item.price) || 0),
    0
  ).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[85vh] flex flex-col z-10 overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base">Your Cart & Saved</h3>
              <p className="text-xs text-slate-400">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} added</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="p-5 overflow-y-auto flex-1 space-y-3">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-bold text-slate-700">Your cart is empty</p>
              <p className="text-xs text-slate-400 mt-1">Browse groceries and click "Add to Cart" on any card.</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100/80 rounded-2xl border border-slate-100 transition-colors"
              >
                <img
                  src={item.thumbnail || item.images?.[0]}
                  alt={item.title}
                  className="w-14 h-14 object-contain rounded-xl bg-white p-1 flex-shrink-0"
                />
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs text-slate-900 truncate">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    ${Number(item.price).toFixed(2)} · ⭐ {item.rating}
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      onViewDetails(item);
                      onClose();
                    }}
                    className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-white text-xs font-semibold"
                    title="View Item"
                  >
                    View
                  </button>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-2 text-rose-500 hover:text-rose-700 rounded-lg hover:bg-white"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Total */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-slate-100 bg-slate-50/70 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Estimated Total:</span>
              <span className="text-xl font-black text-slate-900">${totalAmount}</span>
            </div>

            <button
              onClick={() => {
                alert(`Order simulated for $${totalAmount}! Thank you.`);
                onClose();
              }}
              className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
