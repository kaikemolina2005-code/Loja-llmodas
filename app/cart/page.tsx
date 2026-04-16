'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { formatPrice, getEcwidCheckoutUrl } from '@/lib/products';
import { storeConfig } from '@/config/store';

declare global {
  interface Window {
    Ecwid: any;
  }
}

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
  const [isSyncing, setIsSyncing] = useState(false);

  const handleEcwidCheckout = async () => {
    if (!cart?.length) {
      alert("Seu carrinho está vazio.");
      return;
    }

    setIsSyncing(true);

    try {
      const cartItems = cart.map(item => ({
        id: item.id,
        id_ecwid: item.id_ecwid,
        quantity: item.quantity,
      }));
      
      console.log('Carrinho para Ecwid (debug completo):', JSON.stringify(cartItems, null, 2));
      
      const urlFinal = getEcwidCheckoutUrl(cartItems);
      console.log('URL final gerada:', urlFinal);

      window.location.href = urlFinal;
    } catch (error) {
      console.error("Erro na geração do checkout Ecwid:", error);
      alert("Não foi possível finalizar a compra no momento. Tente novamente.");
      setIsSyncing(false);
    }
  };

  if (cartCount === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center pt-32 pb-24">
          <div className="text-center px-6">
            <div className="w-24 h-24 bg-brand-pink/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingBag size={40} className="text-brand-pink" />
            </div>
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Seu Carrinho está Vazio</h1>
            <p className="text-gray-500 mb-12 max-w-md mx-auto">
              Parece que você ainda não adicionou nada ao seu carrinho. Explore nossas coleções e encontre algo que você ame.
            </p>
            <Link href="/" className="btn-ll">
              Começar a Comprar
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-12">Carrinho de Compras</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-8">
              {cart.map((item) => (
                <motion.div 
                  layout
                  key={item.id} 
                  className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm"
                >
                  <div className="relative w-32 aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      fill 
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  <div className="flex-1 text-center sm:text-left">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 block">
                      {item.category}
                    </span>
                    <h3 className="text-xl font-black uppercase tracking-tight mb-2">{item.name}</h3>
                    <p className="font-bold text-lg mb-4">{formatPrice(item.price)}</p>
                    
                    <div className="flex items-center justify-center sm:justify-start space-x-4">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 hover:bg-brand-pink hover:text-white transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-4 py-1 font-bold text-sm min-w-[40px] text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-brand-pink hover:text-white transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Subtotal</p>
                    <p className="text-xl font-black">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl sticky top-32">
                <h2 className="text-2xl font-black uppercase tracking-tighter mb-8">Resumo do Pedido</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm font-bold uppercase tracking-widest text-gray-500">
                    <span>Subtotal</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold uppercase tracking-widest text-gray-500">
                    <span>Frete</span>
                    <span className="text-black">GRÁTIS</span>
                  </div>
                  <div className="border-t border-gray-100 pt-4 flex justify-between items-end">
                    <span className="text-xs font-bold uppercase tracking-widest">Total</span>
                    <span className="text-3xl font-black text-brand-pink">{formatPrice(cartTotal)}</span>
                  </div>
                </div>

                <button 
                  onClick={handleEcwidCheckout}
                  disabled={isSyncing}
                  className="btn-ll w-full py-4 text-center flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-wait"
                >
                  {isSyncing ? 'Redirecionando...' : 'Ir para o Pagamento'} 
                  {!isSyncing && <ArrowRight size={20} />}
                </button>

                <div className="mt-8 text-center">
                  <Link href="/" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
                    Continuar Comprando
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
