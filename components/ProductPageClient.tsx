'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { PRODUCTS, Product, formatPrice } from '@/lib/products';

import { useCart, ExtendedProduct } from '@/context/CartContext';
import { motion } from 'motion/react';
import { Star, ShoppingCart, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

export default function ProductPageClient({ slug, wpProduct }: { slug: string; wpProduct?: ExtendedProduct }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const router = useRouter();
  const localProduct = PRODUCTS.find((p) => p.slug === slug);
  const product = localProduct || wpProduct;
  const categoryLink = `/category/${product?.categorySlug}`;
  const relatedProducts = localProduct
    ? PRODUCTS.filter((p) => p.categorySlug === product?.categorySlug && p.id !== product?.id).slice(0, 3)
    : [];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
        <div className="text-center">
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Produto Não Encontrado</h1>
          <Link href="/" className="btn-ll">Voltar para Início</Link>
        </div>
      </div>
    );
  }

  const handleBuyNow = () => {
    // Add to local cart and go to the local cart page
    addToCart(product, quantity);
    router.push('/cart');
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-12">
            <Link href="/" className="hover:text-black">Início</Link>
            <span>/</span>
            <Link href={categoryLink} className="hover:text-black">{product?.category}</Link>
            <span>/</span>
            <span className="text-black">{product?.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
            {/* Product Images */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-gray-100 border border-gray-200">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill 
                  className="object-cover"
                  priority
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-200 cursor-pointer hover:border-black transition-all">
                    <Image 
                      src={product.image} 
                      alt={`${product.name} view ${i}`} 
                      fill 
                      className="object-cover opacity-60 hover:opacity-100 transition-opacity"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-gray-400 mb-4">{product.category}</span>
              <h1 className="text-5xl font-black uppercase tracking-tighter mb-4 leading-tight">{product.name}</h1>
              
              <div className="flex items-center space-x-4 mb-8">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-brand-pink text-brand-pink" />
                  ))}
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">(128 Avaliações)</span>
              </div>

              <p className="text-3xl font-black mb-8 text-brand-pink">{formatPrice(product.price)}</p>
              
              <p className="text-gray-600 leading-relaxed mb-10">
                {product.description}
              </p>

              <div className="space-y-6 mb-12">
                <h4 className="text-xs font-bold uppercase tracking-widest">Detalhes do Produto</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.details.map((detail, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 bg-brand-pink rounded-full mr-3"></div>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Add to Cart Section */}
              <div className="flex flex-col gap-4 mb-12">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center border-2 border-brand-pink rounded-lg overflow-hidden">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-3 hover:bg-brand-pink hover:text-white transition-colors font-bold"
                    >
                      -
                    </button>
                    <span className="px-6 py-3 font-bold border-x-2 border-brand-pink min-w-[60px] text-center">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-3 hover:bg-brand-pink hover:text-white transition-colors font-bold"
                    >
                      +
                    </button>
                  </div>
                  <button 
                    onClick={() => addToCart(product, quantity)}
                    className="btn-ll flex-1 py-4 bg-white text-black border-2 border-black hover:bg-black hover:text-white"
                  >
                    Adicionar ao Carrinho <ShoppingCart className="ml-2" size={20} />
                  </button>
                </div>
                
                <button 
                  onClick={handleBuyNow}
                  className="btn-ll w-full py-4 bg-brand-pink text-white hover:bg-brand-pink/90 flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} /> Comprar Agora
                </button>

              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 py-8 border-t border-gray-100">
                <div className="flex flex-col items-center text-center">
                  <Truck size={20} className="mb-2" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Frete Grátis</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <RotateCcw size={20} className="mb-2" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">30 Dias para Devolução</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <ShieldCheck size={20} className="mb-2" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Pagamento Seguro</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section>
              <div className="flex items-end justify-between mb-12">
                <h2 className="text-3xl font-black uppercase tracking-tighter">Você Também Pode Gostar</h2>
                <Link href={`/category/${product.categorySlug}`} className="text-xs font-bold uppercase tracking-widest border-b-2 border-brand-pink pb-1 hover:text-brand-pink/80 hover:border-brand-pink/80 transition-all">
                  Ver Coleção
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
