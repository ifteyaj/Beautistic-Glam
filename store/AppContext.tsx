
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CartItem, Product, User, AuthState } from '../types';
import { PRODUCTS } from '../constants';

interface AppContextType {
  cart: CartItem[];
  wishlist: string[];
  auth: AuthState;
  products: Product[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleWishlist: (productId: string) => void;
  clearCart: () => void;
  login: (user: User) => void;
  logout: () => void;
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  cartTotal: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false
  });

  const addProduct = useCallback((product: Product) => {
    setProducts(prev => [product, ...prev]);
  }, []);

  const removeProduct = useCallback((productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  }, []);

  const login = useCallback((user: User) => {
    setAuth({
      user,
      isAuthenticated: true,
      isLoading: false
    });
    // Store in localStorage for persistence in this mock setup
    localStorage.setItem('bliss_user', JSON.stringify(user));
  }, []);

  const logout = useCallback(() => {
    setAuth({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
    localStorage.removeItem('bliss_user');
  }, []);

  // Initialize auth from localStorage
  React.useEffect(() => {
    const savedUser = localStorage.getItem('bliss_user');
    if (savedUser) {
      try {
        setAuth({
          user: JSON.parse(savedUser),
          isAuthenticated: true,
          isLoading: false
        });
      } catch (e) {
        localStorage.removeItem('bliss_user');
      }
    }
  }, []);

  const addToCart = useCallback((product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ));
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AppContext.Provider value={{
      cart,
      wishlist,
      auth,
      products,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleWishlist,
      clearCart,
      login,
      logout,
      addProduct,
      removeProduct,
      cartTotal
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
