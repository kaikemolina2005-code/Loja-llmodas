import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] px-6">
      <div className="text-center">
        <h1 className="text-9xl font-black uppercase tracking-tighter mb-4 text-brand-pink">404</h1>
        <h2 className="text-2xl font-bold uppercase tracking-tight mb-8">Página Não Encontrada</h2>
        <p className="text-gray-500 mb-12 max-w-md mx-auto">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Link href="/" className="btn-ll">
          Voltar para Início
        </Link>
      </div>
    </div>
  );
}
