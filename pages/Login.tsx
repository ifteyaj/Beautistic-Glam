
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { motion } from 'motion/react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data);
        if (data.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/shop');
        }
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-[#FAF9F6]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-8 rounded-box shadow-sm border border-stone-100"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif text-brand mb-2">Welcome Back</h2>
          <p className="text-stone-500 text-sm">Sign in to your Beautistic Glam account</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-box animate-fadeIn">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all text-sm"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 bg-stone-50 border border-stone-200 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all text-sm"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-brand transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center text-stone-500 cursor-pointer">
              <input type="checkbox" className="mr-2 rounded border-stone-300 text-brand focus:ring-brand" />
              Remember me
            </label>
            <a href="#" className="text-brand hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-brand text-white py-4 rounded-box font-bold uppercase tracking-widest text-xs hover:bg-brand-hover transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
            {!isLoading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-stone-100 text-center">
          <p className="text-stone-500 text-sm mb-4">Don't have an account?</p>
          <Link 
            to="/shop" 
            className="text-brand font-bold uppercase tracking-widest text-xs hover:underline"
          >
            Create Account
          </Link>
        </div>

        <div className="mt-6 p-4 bg-stone-50 rounded-box border border-stone-100">
          <div className="flex items-center gap-2 text-stone-400 mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Demo Credentials</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-[11px]">
            <div>
              <p className="text-stone-400">Admin:</p>
              <p className="text-stone-600 font-mono">admin@beautisticglam.com</p>
              <p className="text-stone-600 font-mono">admin123</p>
            </div>
            <div>
              <p className="text-stone-400">User:</p>
              <p className="text-stone-600 font-mono">user@example.com</p>
              <p className="text-stone-600 font-mono">user123</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
