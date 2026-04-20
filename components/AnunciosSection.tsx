"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { EcwidProduct } from "@/lib/ecwid";

type Anuncio = EcwidProduct;

export default function AnunciosSection() {
  const router = useRouter();
  const [anuncios, setAnuncios] = useState<Anuncio[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    async function carregarAnuncios() {
      try {
        const res = await fetch("/api/ecwid-products", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Erro ao buscar produtos Ecwid");
        }

        const data = await res.json();
        const items = Array.isArray(data?.products) ? (data.products as Anuncio[]) : [];
        setAnuncios(items);
      } catch (error) {
        console.error("Erro ao carregar produtos Ecwid:", error);
        setAnuncios([]);
      } finally {
        setLoading(false);
      }
    }

    carregarAnuncios();
  }, []);

  const handleAddToCart = (anuncio: Anuncio) => {
    addToCart(anuncio);
  };

  const handleComprar = (anuncio: Anuncio) => {
    try {
      handleAddToCart(anuncio);
      router.push('/cart');
    } catch (error) {
      console.error("Erro ao comprar:", error);
      alert("Erro ao adicionar ao carrinho. Tente novamente.");
    }
  };

  if (loading) {
    return (
      <section className="w-full px-4 md:px-8 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm opacity-70">Carregando produtos...</p>
        </div>
      </section>
    );
  }

  if (!anuncios.length) {
    return null;
  }

  return (
    <section className="w-full px-4 md:px-8 py-12 bg-[#f6efef]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[32px] md:text-[38px] font-extrabold uppercase tracking-tight text-[#3b2b2b]">
            Produtos em Destaque
          </h2>
          <Link
            href="/store"
            className="text-[11px] md:text-[12px] uppercase tracking-[0.12em] text-[#8f5f67] font-semibold"
          >
            Ver todos os produtos
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {anuncios.map((anuncio) => {
            const precoFormatado = anuncio.price
              ? `R$ ${Number(anuncio.price).toFixed(2).replace('.', ',')}`
              : '';
            const productSlug = String(anuncio.id);

            return (
              <div key={anuncio.id} className="group relative bg-white border border-gray-100 p-4 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300">
                <Link href={`/product/${encodeURIComponent(productSlug)}`} className="block">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-4 bg-gray-100">
                    {anuncio.image ? (
                      <img
                        src={anuncio.image}
                        alt={anuncio.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#eee]" />
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="bg-black text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">
                        Ecwid
                      </span>
                    </div>
                  </div>
                </Link>

                <div className="flex justify-between items-start gap-3">
                  <Link href={`/product/${encodeURIComponent(productSlug)}`} className="grow">
                    <h3 className="font-bold text-sm uppercase tracking-tight mb-2 hover:text-brand-accent transition-colors">
                      {anuncio.name}
                    </h3>
                  </Link>
                  {precoFormatado ? (
                    <span className="font-black text-lg text-[#d28b95] whitespace-nowrap">
                      {precoFormatado}
                    </span>
                  ) : null}
                </div>

                {anuncio.description ? (
                  <p className="text-[12px] text-[#7c6c6c] line-clamp-2 mb-4">
                    {anuncio.description}
                  </p>
                ) : null}

                <div className="grid gap-3">
                  <button
                    type="button"
                    onClick={() => handleComprar(anuncio)}
                    className="inline-flex items-center justify-center w-full rounded-[10px] bg-[#d28b95] px-4 py-3 text-[11px] font-bold uppercase tracking-[0.08em] text-white hover:bg-[#c86e8a] transition"
                  >
                    Comprar agora
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddToCart(anuncio)}
                    className="inline-flex items-center justify-center w-full rounded-[10px] border border-black bg-white px-4 py-3 text-[11px] font-bold uppercase tracking-[0.08em] text-black hover:bg-[#f7f2f2] transition"
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
