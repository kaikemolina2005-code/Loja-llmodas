'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Menu, X, Search, User, List } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { storeConfig } from '@/config/store';
import { useAuth } from "@clerk/nextjs";
import { SignInButton, UserButton } from "@clerk/nextjs";

interface Category {
  name: string;
  slug: string;
  image: string;
}

export const Header = () => {
  const { cartCount } = useCart();
  const { userId } = useAuth();
  const router = useRouter();

  // Split name for the logo fallback styling (e.g., "LL MODAS" -> "LL" and "MODAS")
  const nameParts = storeConfig.name.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetch('/api/ecwid-products', { cache: 'no-store' });
        const data = await response.json();
        const fetchedCategories = Array.isArray(data?.categories)
          ? data.categories.map((category: any) => ({
              name: category.name,
              slug: category.slug,
              image: '/products/default.webp',
            }))
          : [];
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Erro ao carregar categorias Ecwid:', error);
        setCategories([]);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const shouldLockScroll = isCategoryMenuOpen || isMenuOpen;
    document.body.style.overflow = shouldLockScroll ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isCategoryMenuOpen, isMenuOpen]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled && !isCategoryMenuOpen ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCategoryMenuOpen(true)}
            className="inline-flex items-center gap-2 px-3 py-2 border border-white rounded-full hover:bg-white/10 transition-colors text-[10px] uppercase tracking-widest font-bold text-white"
          >
            <List size={16} />
            Categorias
          </button>
          <button className="md:hidden p-2" onClick={() => setIsCategoryMenuOpen(true)}>
            <List size={20} />
          </button>
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-full shadow-lg">
              <Image 
                src="/logo.jpg" 
                alt={`${storeConfig.name} Logo`} 
                fill 
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase hidden sm:block text-brand-dark">
              {firstName}<span className="text-brand-accent">{lastName}</span>
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8 font-bold uppercase text-xs tracking-widest text-brand-dark flex-wrap justify-center">
          <Link href="/" className="hover:text-brand-accent transition-colors whitespace-nowrap">Home</Link>
          {categories.length > 0 ? (
            categories.slice(0, 10).map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="hover:text-brand-accent transition-colors whitespace-nowrap"
              >
                {category.name}
              </Link>
            ))
          ) : (
            <span className="text-gray-400 whitespace-nowrap">Carregando categorias...</span>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          <div className="relative flex items-center">
            <AnimatePresence>
              {isSearchOpen && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 240, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="absolute right-0 flex items-center"
                >
                  <form onSubmit={handleSearch} className="w-full relative flex items-center">
                    <input
                      autoFocus
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Buscar produtos..."
                      className="w-full bg-gray-100 border-2 border-black rounded-full py-2 pl-4 pr-10 text-xs font-bold uppercase tracking-widest outline-none"
                    />
                    <button 
                      type="button"
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="absolute right-3 text-gray-400 hover:text-black"
                    >
                      <X size={14} />
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`p-2 hover:bg-black/5 rounded-full transition-colors ${isSearchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
              <Search size={20} />
            </button>
          </div>

          <Link href="/cart" className="p-2 hover:bg-black/5 rounded-full transition-colors relative">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-brand-accent text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-sm">
                {cartCount}
              </span>
            )}
          </Link>
          <div className="flex items-center">
            {!userId ? (
              <SignInButton mode="modal">
                <button className="p-2 hover:bg-black/5 rounded-full transition-colors" title="Minha Conta">
                  <User size={20} />
                </button>
              </SignInButton>
            ) : (
              <UserButton />
            )}
          </div>
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[60] flex flex-col p-6"
          >
            <div className="flex justify-end">
              <button onClick={() => setIsMenuOpen(false)} className="p-2">
                <X size={32} />
              </button>
            </div>
            <nav className="flex flex-col space-y-8 mt-12 text-3xl font-black uppercase tracking-tighter">
              <Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
              {categories.length > 0 ? (
                categories.slice(0, 10).map((category) => (
                  <Link
                    key={category.slug}
                    href={`/category/${category.slug}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))
              ) : (
                <span className="text-gray-400 text-xl">Carregando categorias...</span>
              )}
              <Link href="/minha-conta" onClick={() => setIsMenuOpen(false)}>Minha Conta</Link>
              
              <div className="flex items-center gap-4 pt-4">
                {!userId ? (
                  <SignInButton mode="modal">
                    <button className="bg-pink-500 text-white px-5 py-2 rounded-full font-medium hover:bg-pink-600 transition text-lg">
                      Entrar
                    </button>
                  </SignInButton>
                ) : (
                  <UserButton />
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCategoryMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] h-dvh bg-black/40 overflow-hidden"
            onClick={() => setIsCategoryMenuOpen(false)}
          >
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute left-0 top-0 h-dvh w-full max-w-xs bg-white shadow-2xl p-6 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black uppercase tracking-[0.2em]">Categorias</h2>
                <button onClick={() => setIsCategoryMenuOpen(false)} className="p-2">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-3">
                {categories.length > 0 ? (
                  categories.slice(0, 10).map((category) => (
                    <Link
                      key={category.slug}
                      href={`/category/${category.slug}`}
                      className="block rounded-2xl px-4 py-3 bg-gray-100 hover:bg-gray-200 transition-colors text-sm font-bold uppercase tracking-[0.2em]"
                      onClick={() => setIsCategoryMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))
                ) : (
                  <span className="text-gray-500">Carregando categorias...</span>
                )}
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
