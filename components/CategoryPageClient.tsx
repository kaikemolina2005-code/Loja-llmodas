'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { EcwidProduct, EcwidCategory } from '@/lib/ecwid';
import Link from 'next/link';

export default function CategoryPageClient({ slug }: { slug: string }) {
  const [products, setProducts] = useState<EcwidProduct[]>([]);
  const [categories, setCategories] = useState<EcwidCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/ecwid-products')
      .then(r => r.json())
      .then(data => {
        setProducts(data.products || []);
        setCategories(data.categories || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const category = categories.find((c) => c.slug === slug);
  const filteredProducts = products.filter((p) => p.categorySlug === slug);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-pink border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
        <div className="text-center">
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Categoria Não Encontrada</h1>
          <Link href="/" className="btn-ll">Voltar para Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-32 pb-24">
        {/* Category Header */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-16">
          <div className="relative h-[300px] rounded-3xl overflow-hidden bg-black flex items-center justify-center text-center px-6">
            <div className="relative z-10">
              <span className="text-xs font-bold tracking-[0.4em] uppercase text-brand-pink mb-4 block">Coleção</span>
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white">{category.name}</h1>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center mb-12 border-b border-gray-200 pb-6">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Mostrando {filteredProducts.length} produtos
            </p>
            <div className="flex space-x-4 text-xs font-bold uppercase tracking-widest">
              <span className="text-gray-400">Ordenar por:</span>
              <select className="bg-transparent border-none outline-none cursor-pointer">
                <option>Destaque</option>
                <option>Preço: Menor para Maior</option>
                <option>Preço: Maior para Menor</option>
              </select>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Nenhum produto nesta categoria ainda.</p>
            </div>
          )}
        </section>

        {/* Other Categories */}
        {categories.filter(c => c.slug !== slug).length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-32">
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-12">Outras Categorias</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categories.filter(c => c.slug !== slug).map((cat) => (
                <Link key={cat.slug} href={`/category/${cat.slug}`} className="group relative h-48 rounded-2xl overflow-hidden bg-black flex items-center justify-center hover:bg-gray-900 transition-colors">
                  <span className="text-white font-black uppercase tracking-widest text-lg">{cat.name}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

