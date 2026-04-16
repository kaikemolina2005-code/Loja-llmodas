'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { PRODUCTS, CATEGORIES } from '@/lib/products';
import { motion } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';

export default function CategoryPageClient({ slug }: { slug: string }) {
  const category = CATEGORIES.find((c) => c.slug === slug);
  const filteredProducts = PRODUCTS.filter((p) => p.categorySlug === slug);

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
            <div className="absolute inset-0 opacity-40 grayscale z-0">
              <Image 
                src={category.image} 
                alt={category.name} 
                fill 
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Other Categories */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-32">
          <h2 className="text-2xl font-black uppercase tracking-tighter mb-12">Outras Categorias</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CATEGORIES.filter(c => c.slug !== slug).map((cat) => (
              <Link key={cat.slug} href={`/category/${cat.slug}`} className="group relative h-48 rounded-2xl overflow-hidden bg-gray-100">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 z-10"></div>
                <Image 
                  src={cat.image} 
                  alt={cat.name} 
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                  <span className="text-white font-black uppercase tracking-widest text-lg">{cat.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
