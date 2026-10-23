import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingBag, Search } from 'lucide-react';
import { selectTotalItems } from '../store/cartSlice';
import { setSearchQuery } from '../store/productsSlice';

export default function Navbar() {
  const dispatch = useDispatch();
  const totalItems = useSelector(selectTotalItems);
  const searchQuery = useSelector((state) => state.products.searchQuery);

  return (
    <header className="sticky top-0 z-50 bg-[#1B1F2A] text-white shadow-md">
      <div className="max-w-[1200px] mx-auto px-4 h-20 flex items-center justify-between gap-4">
        {/* Replace "ShopKart" with your chosen name */}
<Link to="/" className="text-2xl font-extrabold font-['Manrope'] text-white tracking-tight">
  Arthaus<span className="text-amber-500">.</span>
</Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-md relative hidden md:block">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products"
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="w-full bg-[#2A303F] text-sm text-white placeholder-gray-400 pl-10 pr-4 py-2.5 rounded-full outline-none focus:ring-2 focus:ring-[#C2410C] transition"
          />
        </div>

        {/* Links & Cart Badge */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-[#C2410C] transition hidden sm:inline">
            Products
          </Link>
          <Link
            to="/cart"
            className="flex items-center gap-2 hover:opacity-90 transition text-sm font-semibold"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Cart {totalItems}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}