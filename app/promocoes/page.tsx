'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { EcwidProduct } from '@/lib/ecwid';

export default function PromocoesPage() {
  const [products, setProducts] = useState<EcwidProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/ecwid-products')
      .then((r) => r.json())
      .then((data) => setProducts(data.products || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const promotionProducts = useMemo(() => {
    return [...products].sort((a, b) => a.price - b.price).slice(0, 12);
  }, [products]);

  return (
    <div className="min-h-screen bg-[#f6efef]">
      <Header />
      <main className="pt-32 pb-24">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-10">
          <span className="text-xs font-bold tracking-[0.4em] uppercase text-gray-400 mb-3 block">Ofertas</span>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-[#3b2b2b]">Produtos em Promoção</h1>
          <p className="mt-4 text-sm md:text-base text-[#7c6c6c] max-w-2xl">
            Seleção com os menores preços da loja para facilitar sua escolha.
          </p>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          {loading ? (
            <div className="py-24 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-brand-pink border-t-transparent rounded-full animate-spin" />
            </div>
          ) : promotionProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {promotionProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center bg-white rounded-3xl border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-black uppercase tracking-tight mb-3">Sem promoções por enquanto</h2>
              <p className="text-gray-500">Assim que os produtos forem sincronizados no Ecwid, as promoções aparecem aqui.</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
