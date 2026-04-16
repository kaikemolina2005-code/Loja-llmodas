'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] px-6">
      <div className="text-center">
        <h1 className="text-9xl font-black uppercase tracking-tighter mb-4 text-brand-pink">ERR</h1>
        <h2 className="text-2xl font-bold uppercase tracking-tight mb-8">Algo deu errado!</h2>
        <p className="text-gray-500 mb-12 max-w-md mx-auto">
          Encontramos um erro inesperado. Por favor, tente novamente ou entre em contato com o suporte se o problema persistir.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => reset()} className="btn-ll">
            Tentar Novamente
          </button>
          <Link href="/" className="px-6 py-3 border-2 border-brand-pink text-brand-pink rounded-lg font-bold uppercase tracking-widest text-xs flex items-center hover:bg-brand-pink hover:text-white transition-all">
            Voltar para Início
          </Link>
        </div>
      </div>
    </div>
  );
}
