import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Star, Plus, Minus } from 'lucide-react';
import { addToCart } from '../store/cartSlice';

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedQty, setSelectedQty] = useState(1);

  const { items } = useSelector((state) => state.products);
  const product = items.find((item) => item.id === parseInt(id));

  if (!product) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Link to="/" className="mt-4 inline-block bg-[#C2410C] text-white px-6 py-2 rounded-xl font-bold">
          Back to Products
        </Link>
      </div>
    );
  }

  // Related products suggestion
  const relatedProducts = items
    .filter((i) => i.category === product.category && i.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity: selectedQty }));
    navigate('/cart');
  };

  const formattedCategory = product.category ? product.category.toUpperCase() : '';

  return (
    <main className="max-w-[1200px] mx-auto px-4 py-8">
      {/* Breadcrumb */}
     <nav className="text-sm text-stone-500 mb-6">
  <Link to="/" className="hover:text-amber-700">Arthaus</Link> / 
  <span className="ml-2">{product.category}</span> / 
  <span className="ml-2 text-stone-900 font-medium">{product.title}</span>
</nav>

      {/* PDP Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white border border-[#E4E7EE] rounded-2xl p-6 md:p-10 shadow-sm">
        {/* Image Gallery Box */}
        <div className="bg-[#F6F7F9] rounded-xl p-8 flex items-center justify-center min-h-[350px]">
          <img src={product.image} alt={product.title} className="max-h-96 max-w-full object-contain" />
        </div>

        {/* Product Details & Actions */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-[#586170] uppercase tracking-wider">
              {formattedCategory}
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold font-['Manrope'] text-[#1B1F2A] mt-1">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-3 text-sm">
              <span className="font-bold text-[#1B1F2A]">★ {product.rating?.rate || '4.5'}</span>
              <span className="text-[#586170]">({product.rating?.count || 120} reviews)</span>
            </div>

            {/* Price */}
            <div className="mt-4 text-3xl font-extrabold font-['Manrope'] text-[#1B1F2A]">
              ${product.price.toFixed(2)}
            </div>

            {/* Description */}
            <p className="mt-6 text-sm text-[#586170] leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Stepper & Add to Cart */}
          <div className="mt-8 pt-6 border-t border-[#E4E7EE]">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-bold text-[#1B1F2A]">Quantity</span>
              <div className="flex items-center border border-[#E4E7EE] rounded-xl bg-[#F6F7F9] p-1 h-[52px]">
                <button
                  onClick={() => setSelectedQty(Math.max(1, selectedQty - 1))}
                  className="w-10 h-full flex items-center justify-center bg-white rounded-lg text-gray-700 shadow-sm font-bold"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-sm font-extrabold text-[#1B1F2A]">
                  {selectedQty}
                </span>
                <button
                  onClick={() => setSelectedQty(selectedQty + 1)}
                  className="w-10 h-full flex items-center justify-center bg-white rounded-lg text-gray-700 shadow-sm font-bold"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-[#C2410C] hover:bg-[#a33509] text-white font-bold h-[52px] rounded-xl text-base transition flex items-center justify-center shadow-lg shadow-[#C2410C]/20"
            >
              Add to cart
            </button>

            <div className="mt-6 space-y-1 text-xs text-[#1F6F5A] font-semibold">
              <p>Free shipping on orders of $100 or more</p>
              <p>30-day easy returns</p>
            </div>
          </div>
        </div>
      </div>

      {/* You May Also Like */}
      {relatedProducts.length > 0 && (
        <section className="mt-14">
          <h3 className="text-xl font-extrabold font-['Manrope'] text-[#1B1F2A] mb-6">
            You may also like
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <Link
                key={rel.id}
                to={`/product/${rel.id}`}
                className="bg-white border border-[#E4E7EE] rounded-2xl p-4 hover:shadow-md transition flex items-center gap-4"
              >
                <div className="w-20 h-20 bg-[#F6F7F9] rounded-xl p-2 flex items-center justify-center flex-shrink-0">
                  <img src={rel.image} alt={rel.title} className="max-h-full max-w-full object-contain" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#1B1F2A] line-clamp-2">{rel.title}</h4>
                  <div className="font-extrabold text-[#1B1F2A] mt-1 text-sm">${rel.price.toFixed(2)}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}