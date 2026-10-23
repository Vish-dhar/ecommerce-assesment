import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, increaseQuantity, decreaseQuantity } from '../store/cartSlice';
import { Star } from 'lucide-react';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  
  const cartItem = cartItems.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Image Container with Luxury Zoom Effect */}
      <Link to={`/product/${product.id}`} className="relative bg-stone-100 h-72 overflow-hidden flex items-center justify-center p-4">
        <img 
          src={product.image} 
          alt={product.title} 
          className="max-h-full max-w-full object-cover group-hover:scale-105 transition-transform duration-500 shadow-md"
        />
        <span className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-md text-stone-200 text-xs px-3 py-1 rounded-full uppercase tracking-widest font-medium">
          {product.category}
        </span>
      </Link>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <Link to={`/product/${product.id}`}>
            <h3 className="font-['Manrope'] font-bold text-stone-900 text-base line-clamp-1 hover:text-amber-700 transition-colors">
              {product.title}
            </h3>
          </Link>
          <div className="flex items-center gap-1.5 mt-2 text-sm text-stone-600">
            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span className="font-semibold text-stone-900">{product.rating.rate}</span>
            <span className="text-stone-400">({product.rating.count} reviews)</span>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between pt-4 border-t border-stone-100">
          <span className="text-xl font-bold font-['Manrope'] text-stone-900">
            ${product.price.toFixed(2)}
          </span>

          {/* Stepper or Add to Cart Button */}
          {quantity === 0 ? (
            <button
              onClick={() => dispatch(addToCart(product))}
              className="bg-amber-700 hover:bg-amber-800 text-white font-medium px-5 py-2.5 rounded-xl text-sm transition-all shadow-sm hover:shadow active:scale-95"
            >
              Acquire Art
            </button>
          ) : (
            <div className="flex items-center bg-stone-100 border border-stone-200 rounded-xl overflow-hidden p-0.5">
              <button
                onClick={() => dispatch(decreaseQuantity(product.id))}
                className="w-9 h-9 flex items-center justify-center text-stone-700 hover:bg-white rounded-lg transition-colors font-bold"
              >
                -
              </button>
              <span className="w-8 text-center font-semibold text-stone-900 text-sm">
                {quantity}
              </span>
              <button
                onClick={() => dispatch(increaseQuantity(product.id))}
                className="w-9 h-9 flex items-center justify-center text-stone-700 hover:bg-white rounded-lg transition-colors font-bold"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}