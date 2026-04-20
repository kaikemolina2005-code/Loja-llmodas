'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Instagram } from 'lucide-react';
import { storeConfig } from '@/config/store';

export const Footer = () => {
  // Split name for the logo fallback styling
  const nameParts = storeConfig.name.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
  return (
    <footer className="bg-white border-t border-gray-200 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <div className="relative w-10 h-10 overflow-hidden rounded-full shadow-md">
                <Image 
                  src="/logo.jpg" 
                  alt={`${storeConfig.name} Logo`} 
                  fill 
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-2xl font-black tracking-tighter uppercase text-brand-dark">
                {firstName}<span className="text-brand-accent">{lastName}</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              O destino definitivo para moda minimalista moderna e itens essenciais de estilo de vida.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/llmodas?igsh=MThna2RkNmJnNTE5OQ==" target="_blank" rel="noopener noreferrer" className="p-2 border border-gray-200 rounded-full hover:bg-black hover:text-white transition-all">
                <Instagram size={18} />
              </a>
              <a
                href="https://www.mercadolivre.com.br/pagina/llmodas7054?category_id=MLB108704&item_id=MLB6146325322&recos_listing=true&client=recoview-selleritems&seller_id=2720718320#origin=vpp"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-gray-200 rounded-full hover:bg-[#ffe600] transition-all flex items-center justify-center"
                title="Mercado Livre"
              >
                <Image
                  src="/mercado-livre-logo.svg"
                  alt="Mercado Livre"
                  width={18}
                  height={18}
                  className="rounded-full"
                />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold uppercase text-xs tracking-[0.2em] mb-6">Loja</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link href="#" className="hover:text-brand-accent transition-colors">Todos os Produtos</Link></li>
              <li><Link href="#" className="hover:text-brand-accent transition-colors">Novos Lançamentos</Link></li>
              <li><Link href="#" className="hover:text-brand-accent transition-colors">Mais Vendidos</Link></li>
              <li><Link href="#" className="hover:text-brand-accent transition-colors">Promoção</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase text-xs tracking-[0.2em] mb-6">Suporte</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link href="#" className="hover:text-brand-accent transition-colors">Política de Envio</Link></li>
              <li>
                <a 
                  href={`https://wa.me/${storeConfig.whatsapp}?text=Ol%C3%A1%2C%20quero%20solicitar%20troca%2Fdevolu%C3%A7%C3%A3o.%0A%0APedido%3A%0ANome%3A%0AMotivo%3A`} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-accent transition-colors"
                >
                  Trocas e Devoluções
                </a>
              </li>
              <li><Link href="/minha-conta" className="hover:text-brand-accent transition-colors">Minha Conta</Link></li>
              <li><Link href="#" className="hover:text-brand-accent transition-colors">FAQs</Link></li>
              <li><Link href="#" className="hover:text-brand-accent transition-colors">Contato</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase text-xs tracking-[0.2em] mb-6">Newsletter</h4>
            <p className="text-gray-500 text-sm mb-4">Inscreva-se para receber atualizações, acesso a ofertas exclusivas e muito mais.</p>
            <div className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder="Seu e-mail" 
                className="bg-gray-100 border-none px-4 py-3 rounded-lg text-sm focus:ring-2 focus:ring-brand-accent outline-none"
              />
              <button className="btn-ll w-full text-xs py-3">Inscrever-se</button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-10 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
          <p>© {new Date().getFullYear()} {storeConfig.name.toUpperCase()}. TODOS OS DIREITOS RESERVADOS.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#">Política de Privacidade</Link>
            <Link href="#">Termos de Serviço</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
