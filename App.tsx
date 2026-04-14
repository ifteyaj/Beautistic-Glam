
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { AppProvider } from './store/AppContext';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/wishlist" element={<div className="py-24 text-center h-[70vh] flex flex-col items-center justify-center"><h2 className="text-2xl font-serif">Wishlist feature coming soon</h2><Link to="/shop" className="mt-4 border-b border-brand text-brand pb-1 uppercase tracking-widest text-xs font-bold">Back to Shop</Link></div>} />
              <Route path="/about" element={<div className="max-w-3xl mx-auto py-24 px-4 text-center"><h1 className="text-5xl font-serif mb-8 text-brand">Our Story</h1><p className="text-stone-600 leading-relaxed text-lg">Beautistic Glam was born from a simple belief: that luxury beauty should be as clean as it is effective. We combine botanical wisdom with modern clinical research to create rituals that nourish both skin and soul.</p></div>} />
              {/* Fallback */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;
