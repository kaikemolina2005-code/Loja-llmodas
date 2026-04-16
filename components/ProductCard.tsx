'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Star, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';
import { Product, formatPrice, getEcwidProductUrl } from '@/lib/products';
import { useCart } from '@/context/CartContext';

export const ProductCard = ({ product }: { product: Product }) => {
  const router = useRouter();
  const { addToCart } = useCart();
  
  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    router.push('/cart');
  };

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group relative bg-white border border-gray-100 p-4 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-4 bg-gray-100">
        <Link href={`/product/${product.slug}`} className="absolute inset-0 z-0">
          <Image 
            src={product.image} 
            alt={product.name} 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
        </Link>
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-black text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">
            {product.category}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={handleBuyNow}
            className="w-full bg-brand-accent text-white py-2.5 font-bold uppercase text-[10px] tracking-widest border border-brand-accent hover:bg-black hover:border-black transition-colors flex items-center justify-center gap-2 shadow-xl rounded"
          >
            <ShoppingBag size={14} /> Comprar
          </button>
          <button 
            onClick={() => addToCart(product)}
            className="w-full bg-white text-black py-2.5 font-bold uppercase text-[10px] tracking-widest border border-black hover:bg-gray-100 transition-colors flex items-center justify-center shadow-xl rounded"
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
      <div className="flex justify-between items-start">
        <div>
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-bold text-sm uppercase tracking-tight mb-1 hover:text-brand-accent transition-colors">{product.name}</h3>
          </Link>
          <div className="flex items-center space-x-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={10} className="fill-brand-accent text-brand-accent" />
            ))}
          </div>
        </div>
        <span className="font-black text-lg text-brand-accent">{formatPrice(product.price)}</span>
      </div>
    </motion.div>
  );
};
