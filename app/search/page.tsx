'use client';

import React, { use, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { PRODUCTS, formatPrice } from '@/lib/products';
import Link from 'next/link';
import { Search as SearchIcon } from 'lucide-react';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const filteredProducts = PRODUCTS.filter((product) => 
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-16">
          <span className="text-xs font-bold tracking-[0.4em] uppercase text-gray-400 mb-4 block">Resultados da Busca</span>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
            {query ? `"${query}"` : 'Todos os Produtos'}
          </h1>
          <p className="mt-4 text-gray-500 font-bold uppercase tracking-widest text-xs">
            Encontrados {filteredProducts.length} resultados
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="w-20 h-20 bg-brand-pink/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <SearchIcon size={32} className="text-brand-pink" />
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tight mb-4">Nenhum produto encontrado</h2>
            <p className="text-gray-500 mb-8 max-w-xs mx-auto">
              Não conseguimos encontrar nenhum produto correspondente à sua busca. Tente palavras-chave diferentes.
            </p>
            <Link href="/" className="btn-ll">
              Voltar para Loja
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-brand-pink border-t-transparent rounded-full animate-spin"></div>
        </div>
      }>
        <SearchResults />
      </Suspense>
      <Footer />
    </div>
  );
}
