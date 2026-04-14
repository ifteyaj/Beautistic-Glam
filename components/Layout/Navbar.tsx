
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../store/AppContext';
import { LogOut, User, ShieldCheck } from 'lucide-react';

const Navbar: React.FC = () => {
  const { cart, wishlist, auth, logout } = useApp();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const navigate = useNavigate();
  
  const accountMenuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
        setIsAccountMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        // Only close if the click wasn't on the search toggle button
        const target = event.target as HTMLElement;
        if (!target.closest('.search-toggle')) {
          setIsSearchOpen(false);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchVal)}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 relative">
          
          {/* Logo on the Left */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-3xl brand-logo text-stone-900">Beautistic Glam</Link>
          </div>

          {/* Navigation Links in the Center - Removed Blog */}
          <div className="hidden md:flex space-x-10 absolute left-1/2 -translate-x-1/2">
            <Link to="/" className="text-stone-600 hover:text-brand uppercase tracking-widest text-[11px] font-semibold transition-colors">Home</Link>
            <Link to="/shop" className="text-stone-600 hover:text-brand uppercase tracking-widest text-[11px] font-semibold transition-colors">Shop</Link>
            <Link to="/about" className="text-stone-600 hover:text-brand uppercase tracking-widest text-[11px] font-semibold transition-colors">About</Link>
            {auth.user?.role === 'admin' && (
              <Link to="/admin" className="text-brand hover:text-brand-hover uppercase tracking-widest text-[11px] font-bold transition-colors flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Admin
              </Link>
            )}
          </div>

          {/* Action Icons on the Right */}
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)} 
              className="text-stone-600 hover:text-brand transition-colors p-1 search-toggle"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
            
            <div className="relative" ref={accountMenuRef}>
              {auth.isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                    className="flex items-center gap-2 text-stone-600 hover:text-brand transition-colors p-1"
                  >
                    <User className="w-5 h-5" />
                    <span className="hidden lg:block text-[10px] font-bold uppercase tracking-widest">{auth.user?.name.split(' ')[0]}</span>
                  </button>
                  
                  {isAccountMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-stone-100 shadow-lg rounded-box py-2 z-50 animate-slideDown">
                      <div className="px-4 py-2 border-b border-stone-50 mb-2">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Signed in as</p>
                        <p className="text-xs font-medium text-stone-900 truncate">{auth.user?.email}</p>
                      </div>
                      {auth.user?.role === 'admin' ? (
                        <Link to="/admin" onClick={() => setIsAccountMenuOpen(false)} className="block px-4 py-2 text-xs text-stone-600 hover:bg-stone-50 hover:text-brand">Admin Dashboard</Link>
                      ) : (
                        <Link to="/shop" onClick={() => setIsAccountMenuOpen(false)} className="block px-4 py-2 text-xs text-stone-600 hover:bg-stone-50 hover:text-brand">My Orders</Link>
                      )}
                      <button 
                        onClick={() => { logout(); setIsAccountMenuOpen(false); }}
                        className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <LogOut className="w-3 h-3" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="text-stone-600 hover:text-brand transition-colors p-1">
                  <User className="w-5 h-5" />
                </Link>
              )}
            </div>
            <Link to="/wishlist" className="text-stone-600 hover:text-brand relative transition-colors p-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              {wishlist.length > 0 && <span className="absolute top-0 right-0 bg-brand text-white text-[9px] rounded-[5px] w-4 h-4 flex items-center justify-center font-bold">{wishlist.length}</span>}
            </Link>
            <Link to="/cart" className="text-stone-600 hover:text-brand relative transition-colors p-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              {cart.length > 0 && <span className="absolute top-0 right-0 bg-brand text-white text-[9px] rounded-[5px] w-4 h-4 flex items-center justify-center font-bold">{cart.reduce((a, b) => a + b.quantity, 0)}</span>}
            </Link>
          </div>
        </div>
      </div>

      {isSearchOpen && (
        <div ref={searchRef} className="absolute top-20 left-0 w-full bg-white border-b border-stone-200 p-4 animate-slideDown">
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto flex items-center bg-stone-50 px-4 rounded-[5px]">
            <input 
              type="text" 
              placeholder="Search our collection..." 
              autoFocus
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="w-full border-none focus:ring-0 text-lg font-light py-4 bg-transparent"
            />
            <button type="submit" className="ml-4 p-2 text-stone-400 hover:text-brand">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
