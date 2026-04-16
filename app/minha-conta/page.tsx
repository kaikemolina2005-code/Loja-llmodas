'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useAuth, UserProfile } from '@clerk/nextjs';
import Link from 'next/link';
import { storeConfig } from '@/config/store';

export default function MinhaContaPage() {
  const { userId } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">Minha Conta</h1>
            <p className="text-gray-500">Gerencie suas informações e pedidos</p>
          </div>

          {userId ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* User Profile Section */}
              <div className="lg:col-span-2">
                <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                  <h2 className="text-2xl font-bold uppercase mb-6">Perfil do Usuário</h2>
                  <UserProfile />
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-4">
                <div className="bg-brand-pink/10 border border-brand-pink/20 rounded-2xl p-6">
                  <h3 className="font-bold uppercase mb-4">Links Rápidos</h3>
                  <div className="space-y-3">
                    <Link 
                      href="/" 
                      className="block text-sm font-bold uppercase text-brand-pink hover:text-brand-accent transition"
                    >
                      ← Voltar para Home
                    </Link>
                    <Link 
                      href="/store" 
                      className="block text-sm font-bold uppercase text-brand-pink hover:text-brand-accent transition"
                    >
                      Ver Produtos
                    </Link>
                    <Link 
                      href="/cart" 
                      className="block text-sm font-bold uppercase text-brand-pink hover:text-brand-accent transition"
                    >
                      Meu Carrinho
                    </Link>
                  </div>
                </div>
              </div>
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
