'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'motion/react';
import { ShoppingCart, Star, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useCart } from '@/context/CartContext';

type Anuncio = {
  id: number;
  titulo: string;
  descricao_curta: string;
  preco: string;
  url_ecwid: string;
  id_ecwid: string;
  texto_botao: string;
  destaque: string;
  ordem: number;
  estoque: number;
  imagem: string;
};

const formatPrice = (value: number) => {
  return `R$ ${value.toFixed(2).replace('.', ',')}`;
};

export default function WordPressProductDetail() {
  const searchParams = useSearchParams();
  const wpSlug = searchParams?.get('wp');
  const router = useRouter();
  const [product, setProduct] = useState<Anuncio | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!wpSlug) {
      setProduct(null);
      setError(null);
      return;
    }

    const loadProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch('https://llmodas.shop/wp-json/site/v1/anuncios');

        if (!res.ok) {
          throw new Error('Não foi possível carregar o produto');
        }

        const data = await res.json();
        const item = Array.isArray(data)
          ? data.find(
              (anuncio: Anuncio) =>
                String(anuncio.id_ecwid) === wpSlug || String(anuncio.id) === wpSlug
            )
          : null;

        if (!item) {
          setError('Produto não encontrado.');
          setProduct(null);
        } else {
          setProduct(item);
        }
      } catch (fetchError) {
        console.error('Erro ao buscar produto WordPress:', fetchError);
        setError('Erro ao carregar o produto. Tente novamente.');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [wpSlug]);

  const productDetails = useMemo(() => {
    if (!product) return [];
    return [
      `Código ${product.id_ecwid || product.id}`,
      product.estoque !== undefined ? `Estoque: ${product.estoque}` : 'Estoque disponível',
      'Modelagem moderna e confortável',
      'Acabamento premium',
    ];
  }, [product]);

  const handleAddToCart = () => {
    if (!product) return;

    const wpProduct = {
      id: parseInt(product.id_ecwid) || product.id,
      slug: product.id_ecwid,
      name: product.titulo,
      price: Number(product.preco) || 0,
      image: product.imagem,
      category: 'WordPress',
      categorySlug: 'wordpress',
      description: product.descricao_curta,
      details: productDetails,
      id_ecwid: product.id_ecwid,
      url_ecwid: product.url_ecwid,
      isWordPress: true,
    };

    addToCart(wpProduct);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/cart');
  };

  if (!wpSlug) {
    return null;
  }

  if (loading) {
    return (
      <section className="w-full px-4 md:px-8 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm opacity-70">Carregando detalhes do produto...</p>
        </div>
      </section>
    );
  }

  if (error || !product) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-[#f5f5f5] py-24">
        <div className="max-w-3xl text-center">
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-6">Produto não encontrado</h1>
          <p className="text-sm text-[#6b6363] mb-8">Tente acessar novamente pelo anúncio ou volte para a loja.</p>
          <Link href="/store" className="inline-flex rounded-full border border-black bg-white px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] hover:bg-[#f7f2f2] transition">
            Voltar para loja
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#f6efef] pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <nav className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-12">
          <Link href="/" className="hover:text-black">Início</Link>
          <span>/</span>
          <Link href="/store" className="hover:text-black">Store</Link>
          <span>/</span>
          <span className="text-black">{product.titulo}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-gray-100 border border-gray-200">
              <Image
                src={product.imagem}
                alt={product.titulo}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-200 cursor-pointer hover:border-black transition-all">
                  <Image
                    src={product.imagem}
                    alt={`${product.titulo} view ${i}`}
                    fill
                    className="object-cover opacity-60 hover:opacity-100 transition-opacity"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-gray-400 mb-4">WordPress</span>
            <h1 className="text-5xl font-black uppercase tracking-tighter mb-4 leading-tight">{product.titulo}</h1>

            <div className="flex items-center space-x-4 mb-8">
              <div className="text-3xl font-black text-[#d28b95]">{formatPrice(Number(product.preco) || 0)}</div>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} size={16} className="fill-[#d28b95] text-[#d28b95]" />
                ))}
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed mb-10">{product.descricao_curta}</p>

            <div className="space-y-6 mb-12">
              <div className="text-xs font-bold uppercase tracking-widest">Detalhes do Produto</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {productDetails.map((detail, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-500 gap-3 px-4 py-4 rounded-3xl border border-[#eae0e0] bg-[#faf5f4]">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#d28b95]" />
                    {detail}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 mb-12">
              <button
                onClick={handleBuyNow}
                className="w-full inline-flex items-center justify-center gap-2 rounded-[10px] bg-[#d28b95] px-6 py-4 text-sm font-bold uppercase text-white hover:bg-[#c86e8a] transition"
              >
                <ShoppingCart size={20} /> Comprar Agora
              </button>
              <button
                onClick={handleAddToCart}
                className="w-full inline-flex items-center justify-center gap-2 rounded-[10px] border border-black bg-white px-6 py-4 text-sm font-bold uppercase text-black hover:bg-[#f7f2f2] transition"
              >
                Adicionar ao Carrinho
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 py-8 border-t border-gray-100">
              <div className="flex flex-col items-center text-center">
                <Truck size={20} className="mb-2" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Frete rápido</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <RotateCcw size={20} className="mb-2" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Troca fácil</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <ShieldCheck size={20} className="mb-2" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Compra segura</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
