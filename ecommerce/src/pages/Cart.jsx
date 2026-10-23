import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  selectTotalItems,
  selectTotalPrice,
} from '../store/cartSlice';
import { Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = useSelector(selectTotalItems);
  const totalPrice = useSelector(selectTotalPrice);

  // Shipping is FREE when subtotal is $100 or more, else $5.00[cite: 9]
  const shipping = totalPrice >= 100 || totalPrice === 0 ? 0 : 5.00;
  const finalTotal = totalPrice + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-700 shadow-sm">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold font-['Manrope'] text-stone-900 mb-2">Your cart is empty</h2>
        <p className="text-stone-500 mb-8">
  Looks like you haven't added anything to your Arthaus collection yet.
</p>
        <Link
          to="/"
          className="inline-block bg-amber-700 hover:bg-amber-800 text-white font-medium px-8 py-3 rounded-xl transition-all shadow-sm"
        >
          Browse gallery
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold font-['Manrope'] text-stone-900">
          Your cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
        </h1>
        <button
          onClick={() => dispatch(clearCart())}
          className="text-sm font-medium text-stone-500 hover:text-red-600 transition-colors flex items-center gap-1.5"
        >
          <Trash2 className="w-4 h-4" /> Clear cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 sm:p-6 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col sm:flex-row items-center gap-6"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-cover rounded-xl bg-stone-100 flex-shrink-0"
              />
              <div className="flex-1 text-center sm:text-left">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                  {item.category}
                </span>
                <h3 className="font-['Manrope'] font-bold text-stone-900 text-base mt-1">
                  {item.title}
                </h3>
                <p className="text-stone-500 text-sm mt-1">${item.price.toFixed(2)} each</p>
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center bg-stone-100 border border-stone-200 rounded-xl overflow-hidden p-0.5">
                <button
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                  className="w-9 h-9 flex items-center justify-center text-stone-700 hover:bg-white rounded-lg transition-colors font-bold"
                >
                  -
                </button>
                <span className="w-8 text-center font-semibold text-stone-900 text-sm">
                  {item.quantity}
                </span>
                <button
                  onClick={() => dispatch(increaseQuantity(item.id))}
                  className="w-9 h-9 flex items-center justify-center text-stone-700 hover:bg-white rounded-lg transition-colors font-bold"
                >
                  +
                </button>
              </div>

              {/* Item Line Total */}
              <div className="text-right min-w-[90px]">
                <span className="font-bold font-['Manrope'] text-stone-900 text-lg">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-stone-400 hover:text-red-500 transition-colors p-2"
                title="Remove item"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}

          <div className="pt-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 font-medium text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Continue shopping
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm h-fit">
          <h3 className="text-lg font-bold font-['Manrope'] text-stone-900 mb-6 pb-4 border-b border-stone-100">
            Order summary
          </h3>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between text-stone-600">
              <span>Items ({totalItems})</span>
              <span className="font-semibold text-stone-900">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Shipping</span>
              {shipping === 0 ? (
                <span className="font-semibold text-[#1F6F5A]">FREE</span>
              ) : (
                <span className="font-semibold text-stone-900">${shipping.toFixed(2)}</span>
              )}
            </div>
            {totalPrice < 100 && totalPrice > 0 && (
              <p className="text-xs text-stone-400">
                Add ${(100 - totalPrice).toFixed(2)} more to get free shipping!
              </p>
            )}
            <div className="pt-4 border-t border-stone-100 flex justify-between text-base font-bold text-stone-900">
              <span>Total</span>
              <span className="font-['Manrope'] text-xl">${finalTotal.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={() => alert('Proceeding to secure checkout!')}
            className="w-full mt-6 bg-amber-700 hover:bg-amber-800 text-white font-medium py-3.5 rounded-xl transition-all shadow-sm text-center"
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
}