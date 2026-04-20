'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShoppingCart, Star, Menu } from 'lucide-react';
import { motion } from 'motion/react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import AnunciosSection from '@/components/AnunciosSection';
import { CATEGORIES } from '@/lib/products';
import { storeConfig } from '@/config/store';

const Hero = () => {
  // Split title if it contains spaces to keep the design aesthetics
  const titleParts = storeConfig.hero.title.split(' ');
  const firstPart = titleParts.slice(0, 2).join(' ');
  const secondPart = titleParts.slice(2).join(' ');

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-brand-pink">
      {/* Decorative Curved Lines (SVG) */}
      <div className="absolute inset-0 z-0 opacity-20">
        <svg viewBox="0 0 1000 1000" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0,500 C200,300 400,700 600,500 C800,300 1000,700 1000,500" fill="none" stroke="var(--color-brand-accent)" strokeWidth="2" />
          <path d="M0,600 C300,400 500,800 700,600 C900,400 1000,800 1000,600" fill="none" stroke="var(--color-brand-accent)" strokeWidth="1" />
        </svg>
      </div>

      <div className="absolute inset-0 z-0">
        <Image 
          src="/products/banner-1.jpg" 
          alt="Hero Background" 
          fill 
          className="object-cover"
          priority
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/10 z-10"></div>
      </div>
      
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-6 text-white">
            {firstPart} <br />
            <span className="text-brand-accent">{secondPart}</span>
          </h1>
          <p className="text-xl text-white/90 mb-10 max-w-lg font-medium">
            Tendências atuais com conforto e estilo. Descubra a coleção que redefine o seu guarda-roupa com elegância e leveza.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="#shop" className="btn-ll text-lg px-12 py-5">
              {storeConfig.hero.button}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        <Hero />

        {/* Categories Section */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CATEGORIES.map((cat) => (
              <Link key={cat.slug} href={`/category/${cat.slug}`} className="group relative h-[400px] rounded-3xl overflow-hidden bg-gray-100">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 z-10"></div>
                <Image 
                  src={cat.image} 
                  alt={cat.name} 
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-8 left-8 z-20">
                  <h3 className="text-3xl font-black uppercase tracking-tighter text-white mb-2">{cat.name}</h3>
                  <span className="text-white text-xs font-bold uppercase tracking-widest border-b border-white pb-1">Explorar Coleção</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div id="shop">
          <AnunciosSection />
        </div>

        {/* Promo Section */}
        <section className="py-24 bg-black text-white overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="flex whitespace-nowrap animate-marquee">
              {[...Array(10)].map((_, i) => (
                <span key={i} className="text-[200px] font-black uppercase tracking-tighter mr-20 text-brand-pink/20">LL MODAS</span>
              ))}
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8">
                Junte-se à LL Modas <br />
                <span className="text-brand-pink">Ganhe 15% de Desconto</span>
              </h2>
              <p className="text-gray-400 mb-10 max-w-xl mx-auto">
                Seja o primeiro a saber sobre novos lançamentos, lookbooks, promoções e ofertas assinando nossa newsletter.
              </p>
              <button className="bg-brand-pink text-white px-10 py-4 rounded-lg font-black uppercase tracking-widest hover:bg-brand-pink/80 transition-colors shadow-lg">
                Assinar Agora
              </button>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-white border-2 border-brand-pink rounded-full flex items-center justify-center mx-auto mb-6 shadow-[4px_4px_0px_0px_rgba(255,105,180,1)]">
                <ShoppingCart size={24} className="text-brand-pink" />
              </div>
              <h3 className="font-black uppercase tracking-tight mb-3">Frete Grátis</h3>
              <p className="text-gray-500 text-sm">Em todos os pedidos acima de R$ 500. Entrega rápida e segura na sua porta.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white border-2 border-brand-pink rounded-full flex items-center justify-center mx-auto mb-6 shadow-[4px_4px_0px_0px_rgba(255,105,180,1)]">
                <Star size={24} className="text-brand-pink" />
              </div>
              <h3 className="font-black uppercase tracking-tight mb-3">Qualidade Premium</h3>
              <p className="text-gray-500 text-sm">Materiais selecionados a dedo e artesanato especializado em cada peça.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white border-2 border-brand-pink rounded-full flex items-center justify-center mx-auto mb-6 shadow-[4px_4px_0px_0px_rgba(255,105,180,1)]">
                <Menu size={24} className="text-brand-pink" />
              </div>
              <h3 className="font-black uppercase tracking-tight mb-3">Suporte 24/7</h3>
              <p className="text-gray-500 text-sm">Nossa equipe dedicada está sempre aqui para ajudar com qualquer dúvida.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx global>{`
        .border-text {
          -webkit-text-fill-color: transparent;
        }
        .vertical-text {
          writing-mode: vertical-rl;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}

// Atualização final.
