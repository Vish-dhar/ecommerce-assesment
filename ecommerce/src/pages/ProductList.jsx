import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setSelectedCategory, setSortBy } from '../store/productsSlice';
import ProductCard from '../components/ProductCard';

export default function ProductList() {
  const dispatch = useDispatch();
  const { items, status, error, selectedCategory, searchQuery, sortBy } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

 const categories = ['All', 'Abstract', 'Watercolor', 'Modern', 'Landscapes', 'Portraits'];

  // Filter & Sort
  const filteredProducts = items
    .filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'low-high') return a.price - b.price;
      if (sortBy === 'high-low') return b.price - a.price;
      return 0; // Featured
    });

  if (status === 'loading') {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-20 text-center text-[#586170] font-bold text-lg">
        Loading products...
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-20 text-center">
        <div className="bg-red-50 text-red-600 p-6 rounded-2xl max-w-md mx-auto">
          <p className="font-bold">Error loading products: {error}</p>
          <button
            onClick={() => dispatch(fetchProducts())}
            className="mt-4 bg-[#C2410C] text-white px-5 py-2.5 rounded-xl font-bold text-sm"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-[1200px] mx-auto px-4 py-8">
      {/* Title & Sort Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold font-['Manrope'] text-[#1B1F2A]">
            All products
          </h1>
          <p className="text-sm text-[#586170] mt-1">Showing {filteredProducts.length} products</p>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-semibold text-[#586170]">Sort by</label>
          <select
            value={sortBy}
            onChange={(e) => dispatch(setSortBy(e.target.value))}
            className="bg-white border border-[#E4E7EE] text-sm font-semibold rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#C2410C]"
          >
            <option value="featured">Featured</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Category Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => dispatch(setSelectedCategory(cat))}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition capitalize ${
              selectedCategory.toLowerCase() === cat.toLowerCase()
                ? 'bg-[#1B1F2A] text-white'
                : 'bg-white border border-[#E4E7EE] text-[#586170] hover:bg-gray-50'
            }`}
          >
            {cat === "men's clothing" ? "Men's clothing" : cat === "women's clothing" ? "Women's clothing" : cat === "jewelery" ? "Jewelery" : cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#E4E7EE]">
          <p className="text-lg font-bold text-[#1B1F2A]">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}