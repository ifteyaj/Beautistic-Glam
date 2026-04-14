
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CATEGORIES, PRODUCTS, TAGS } from '../constants';
import { Product, SortOption } from '../types';
import ProductCard from '../components/Product/ProductCard';
import { aiSearch } from '../services/geminiService';

const Shop: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [activeCategory, setActiveCategory] = useState<string | null>(searchParams.get('category'));
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const query = searchParams.get('q');

  useEffect(() => {
    const applyFilters = async () => {
      setLoading(true);
      let results = [...PRODUCTS];

      if (query) {
        results = await aiSearch(query);
      }

      if (activeCategory) {
        results = results.filter(p => p.category === activeCategory);
      }

      if (activeTags.length > 0) {
        results = results.filter(p => p.tags.some(tag => activeTags.includes(tag)));
      }

      results = results.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

      // Sort
      switch (sortBy) {
        case 'price-low': results.sort((a, b) => a.price - b.price); break;
        case 'price-high': results.sort((a, b) => b.price - a.price); break;
        case 'rating': results.sort((a, b) => b.rating - a.rating); break;
        case 'newest': results.sort((a, b) => (a.isNew ? -1 : 1) - (b.isNew ? -1 : 1)); break;
      }

      setFilteredProducts(results);
      setLoading(false);
    };

    applyFilters();
  }, [query, activeCategory, activeTags, priceRange, sortBy]);

  const toggleTag = (tag: string) => {
    setActiveTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-serif text-stone-900 mb-4">Shop Collection</h1>
        <div className="flex items-center text-xs text-stone-400 uppercase tracking-widest">
          <span>Home</span>
          <span className="mx-2">/</span>
          <span className="text-brand font-bold">Shop</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 space-y-12">
          <div className="bg-white p-6 rounded-[5px] border border-stone-100">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand mb-6 border-b border-stone-50 pb-2">Categories</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => setActiveCategory(null)}
                  className={`text-sm w-full text-left px-3 py-2 rounded-[5px] transition-colors ${!activeCategory ? 'bg-brand text-white' : 'text-stone-500 hover:bg-stone-50 hover:text-brand'}`}
                >
                  All Products
                </button>
              </li>
              {CATEGORIES.map(cat => (
                <li key={cat}>
                  <button 
                    onClick={() => setActiveCategory(cat)}
                    className={`text-sm w-full text-left px-3 py-2 rounded-[5px] transition-colors ${activeCategory === cat ? 'bg-brand text-white' : 'text-stone-500 hover:bg-stone-50 hover:text-brand'}`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-[5px] border border-stone-100">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand mb-6 border-b border-stone-50 pb-2">Price Range</h4>
            <div className="space-y-4">
              <input 
                type="range" 
                min="0" 
                max="500" 
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full accent-brand h-1 bg-stone-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-stone-500">
                <span>$0</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[5px] border border-stone-100">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand mb-6 border-b border-stone-50 pb-2">Product Tags</h4>
            <div className="flex flex-wrap gap-2">
              {TAGS.map(tag => (
                <button 
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 text-[10px] uppercase tracking-widest border transition-colors rounded-[5px] ${activeTags.includes(tag) ? 'bg-brand text-white border-brand' : 'bg-white text-stone-600 border-stone-200 hover:border-brand hover:text-brand'}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 bg-white p-4 rounded-[5px] border border-stone-100">
            <p className="text-sm text-stone-500">
              Showing <span className="text-brand font-medium">1–{filteredProducts.length}</span> of {filteredProducts.length} Results
            </p>
            <div className="flex items-center gap-4">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-stone-50 text-sm font-medium border border-stone-100 py-2 px-4 outline-none focus:border-brand transition-colors rounded-[5px]"
              >
                <option value="default">Default Sorting</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-32">
              <div className="w-12 h-12 border-4 border-stone-200 border-t-brand rounded-full animate-spin"></div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-stone-50 rounded-[5px]">
              <p className="text-stone-500 font-serif text-xl">No products found for your criteria.</p>
              <button 
                onClick={() => { setActiveCategory(null); setActiveTags([]); setPriceRange([0, 500]); }}
                className="mt-6 text-xs uppercase tracking-widest border-b border-brand pb-1 text-brand font-bold"
              >
                Clear all filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;
