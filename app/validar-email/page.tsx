'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'motion/react';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function ValidarEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Token de validação não encontrado na URL.');
      return;
    }

    // Simular validação do token (em produção, isso seria feito no backend)
    const validateToken = async () => {
      try {
        // Aqui você faria uma chamada para o backend para validar o token
        // Por exemplo: await fetch('/api/validate-token', { method: 'POST', body: JSON.stringify({ token }) });

        // Para demonstração, vamos assumir que o token é válido se não estiver vazio
        if (token.length > 10) { // Simples validação de exemplo
          setStatus('success');
          setMessage('E-mail validado com sucesso! Redirecionando para sua conta...');

          // Redirecionar após 3 segundos
          setTimeout(() => {
            window.location.href = 'https://llmodas.shop/store/account';
          }, 3000);
        } else {
          setStatus('error');
          setMessage('Token de validação inválido ou expirado.');
        }
      } catch (error) {
        setStatus('error');
        setMessage('Erro ao validar o token. Tente novamente.');
      }
    };

    validateToken();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-pink/10 to-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
      >
        {status === 'loading' && (
          <>
            <Loader2 size={48} className="text-brand-pink animate-spin mx-auto mb-4" />
            <h1 className="text-2xl font-black uppercase tracking-tighter mb-4">
              Validando E-mail
            </h1>
            <p className="text-gray-600">
              Aguarde enquanto validamos seu endereço de e-mail...
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-black uppercase tracking-tighter mb-4 text-green-600">
              E-mail Validado!
            </h1>
            <p className="text-gray-600 mb-6">
              {message}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <motion.div
                className="bg-green-500 h-2 rounded-full"
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 3, ease: 'linear' }}
              />
            </div>
            <p className="text-sm text-gray-500">
              Se não for redirecionado automaticamente,{' '}
              <a
                href="https://llmodas.shop/store/account"
                className="text-brand-pink hover:underline"
              >
                clique aqui
              </a>
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle size={48} className="text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-black uppercase tracking-tighter mb-4 text-red-600">
              Erro na Validação
            </h1>
            <p className="text-gray-600 mb-6">
              {message}
            </p>
            <div className="space-y-4">
              <Link
                href="/"
                className="block w-full bg-brand-pink text-white py-3 px-6 rounded-lg font-bold uppercase tracking-widest hover:bg-brand-pink/90 transition-colors"
              >
                Voltar ao Início
              </Link>
              <Link
                href="/minha-conta"
                className="block w-full bg-white text-brand-pink border-2 border-brand-pink py-3 px-6 rounded-lg font-bold uppercase tracking-widest hover:bg-brand-pink hover:text-white transition-colors"
              >
                Ir para Minha Conta
              </Link>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}