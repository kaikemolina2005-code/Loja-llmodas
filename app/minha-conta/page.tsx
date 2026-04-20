'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useAuth, UserProfile } from '@clerk/nextjs';
import Link from 'next/link';

export default function MinhaContaPage() {
  const { userId } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {userId ? (
            <div className="flex justify-center">
              <UserProfile
                appearance={{
                  elements: {
                    rootBox: 'w-full',
                    cardBox: 'shadow-lg border border-gray-200 rounded-2xl w-full max-w-3xl',
                    navbar: 'border-r border-gray-200',
                    pageScrollBox: 'p-4 sm:p-6',
                  },
                }}
              />
            </div>
          ) : (
            <div className="bg-brand-pink/10 border border-brand-pink/20 rounded-2xl p-12 text-center">
              <h2 className="text-2xl font-bold uppercase mb-4">Você não está logado</h2>
              <p className="text-gray-600 mb-8">
                Faça login com sua conta para acessar seus pedidos e informações.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/sign-in" 
                  className="btn-ll"
                >
                  Entrar
                </Link>
                <Link 
                  href="/sign-up" 
                  className="px-8 py-4 border-2 border-brand-pink text-brand-pink font-bold uppercase rounded-full hover:bg-brand-pink/5 transition"
                >
                  Cadastrar
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
