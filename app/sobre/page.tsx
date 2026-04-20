import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-[#f6efef]">
      <Header />
      <main className="pt-32 pb-24">
        <section className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="text-xs font-bold tracking-[0.4em] uppercase text-gray-400 mb-3 block">Sobre a Loja</span>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-[#3b2b2b] mb-8">
            Informações da LL Modas
          </h1>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-10 space-y-8">
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tight mb-3">Quem Somos</h2>
              <p className="text-gray-600 leading-relaxed">
                A LL Modas e uma loja focada em moda feminina, com curadoria de pecas para o dia a dia,
                eventos especiais e tendencias da temporada. Nosso objetivo e oferecer estilo, qualidade e
                praticidade em cada compra.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase tracking-tight mb-3">Atendimento</h2>
              <p className="text-gray-600 leading-relaxed">
                Nosso atendimento e feito com rapidez e cuidado para te ajudar em duvidas sobre tamanhos,
                pedidos, entregas e trocas. Sempre que precisar, fale conosco pelo WhatsApp no botao verde
                no canto da tela.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase tracking-tight mb-3">Entregas e Trocas</h2>
              <p className="text-gray-600 leading-relaxed">
                Trabalhamos para garantir uma experiencia segura e transparente. As informacoes de envio,
                prazos e politica de troca sao passadas de forma clara durante o processo de compra.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
