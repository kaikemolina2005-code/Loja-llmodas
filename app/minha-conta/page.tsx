'use client';

import React, { useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { storeConfig } from '@/config/store';
import Script from 'next/script';
import { ECWID_STORE_ID } from '@/lib/products';
import { useSearchParams } from 'next/navigation';

export default function MinhaContaPage() {
  const accountUrl = "https://llmodas.shop/store/account";
  const searchParams = useSearchParams();

  useEffect(() => {
    // List of Ecwid authentication and session parameters
    const ecwidParams = [
      '~mode', 
      '~key', 
      '~t', 
      '~return_url', 
      '~orderid', 
      '~cartid', 
      'callback'
    ];

    // Check if any of these parameters are present in the URL
    const hasEcwidParam = ecwidParams.some(param => searchParams.has(param));

    if (hasEcwidParam) {
      // Construct the redirect URL with all current parameters
      const currentParams = searchParams.toString();
      const redirectUrl = `${accountUrl}${currentParams ? '?' + currentParams : ''}`;
      
      console.log('Ecwid parameter detected, redirecting to real account page:', redirectUrl);
      
      // We use window.location.href for a full page redirect to the store environment
      window.location.href = redirectUrl;
    }
  }, [searchParams, accountUrl]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 
        Fallback: inline script que roda ANTES do React hidratar.
        Não usa eval — apenas window.location.replace(), que não é bloqueado por CSP de eval.
        A solução primária e mais confiável é o .htaccess (server-side).
        Este script cobre casos onde o .htaccess não estiver disponível.
      */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){
  var ECWID_PARAMS = ['~mode','~key','~t','~return_url','~orderid','~cartid','callback'];
  var ACCOUNT_URL = 'https://llmodas.shop/store/account';
  try {
    var qs = window.location.search;
    if (qs) {
      var hasParam = ECWID_PARAMS.some(function(p){ return qs.indexOf(p + '=') !== -1 || qs.indexOf(p + '&') !== -1; });
      if (hasParam) { window.location.replace(ACCOUNT_URL + qs); }
    }
  } catch(e) {}
})();`
        }}
      />

      <Header />

      <Script 
        src={`https://app.ecwid.com/script.js?${ECWID_STORE_ID}&data_platform=nextjs`} 
        strategy="afterInteractive"
      />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="ll-account-section">
          <div className="ll-account-container">
            <div className="ll-account-card">
              <div className="ll-account-left">
                <span className="ll-badge">{storeConfig.name}</span>
                <h1 className="ll-title">Entre na sua conta</h1>
                <p className="ll-description">
                  Acompanhe pedidos, salve seus dados e compre com mais rapidez.
                </p>

                <div className="ll-account-actions">
                  <a 
                    href={accountUrl}
                    className="ll-btn ll-btn-primary"
                  >
                    Entrar / Cadastrar
                  </a>

                  <a 
                    href={accountUrl}
                    className="ll-btn ll-btn-secondary"
                  >
                    Meus pedidos
                  </a>
                </div>

                <p className="ll-help">
                  Esqueceu a senha? Clique em <strong>Entrar / Cadastrar</strong> e use a recuperação no ambiente do Ecwid.
                </p>
              </div>

              <div className="ll-account-right">
                <div className="ll-mini-box">
                  <h3>Vantagens da sua conta</h3>
                  <ul>
                    <li>• Acompanhar pedidos</li>
                    <li>• Comprar mais rápido</li>
                    <li>• Salvar endereço</li>
                    <li>• Ter histórico de compras</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Barra de navegação de retorno — visível abaixo do card principal */}
        <div className="ll-back-bar">
          <div className="ll-back-bar-inner">
            <span className="ll-back-bar-label">Já entrou na conta?</span>
            <div className="ll-back-bar-links">
              <a href="https://llmodas.shop/ai-site2/" className="ll-back-link ll-back-link-primary">
                ← Continuar comprando
              </a>
              <a href="https://llmodas.shop/ai-site2/category/vestidos" className="ll-back-link">
                Vestidos
              </a>
              <a href="https://llmodas.shop/ai-site2/category/conjuntos" className="ll-back-link">
                Conjuntos
              </a>
              <a href="https://llmodas.shop/ai-site2/category/novidades" className="ll-back-link">
                Novidades
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        /* Scoped to this specific page container only */
        .ll-account-section {
          min-height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px 20px;
          background: linear-gradient(180deg, #f8efef 0%, #f4e5e7 100%);
          position: relative;
          z-index: 1;
        }

        .ll-account-container {
          width: 100%;
          max-width: 980px;
          margin: 0 auto;
        }

        .ll-account-card {
          width: 100%;
          background: #fff;
          border-radius: 24px;
          box-shadow: 0 18px 50px rgba(0,0,0,.08);
          overflow: hidden;
          display: grid;
          grid-template-columns: 1.2fr .8fr;
        }

        .ll-account-left {
          padding: 56px 48px;
        }

        .ll-account-right {
          background: #f3dfe2;
          padding: 56px 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ll-badge {
          display: inline-block;
          padding: 8px 14px;
          border-radius: 999px;
          background: #f7d9de;
          color: #a66b74;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: .08em;
          margin-bottom: 20px;
        }

        .ll-title {
          font-size: 42px;
          line-height: 1.1;
          color: #1a1a1a;
          margin: 0 0 16px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.03em;
        }

        .ll-description {
          font-size: 16px;
          line-height: 1.6;
          color: #555;
          margin: 0;
          max-width: 480px;
        }

        .ll-account-actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-top: 32px;
        }

        .ll-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          border: none;
          cursor: pointer;
          border-radius: 14px;
          padding: 16px 32px;
          font-size: 15px;
          font-weight: 800;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .ll-btn-primary {
          background: var(--brand-primary, #d9a2ab);
          color: #fff;
          box-shadow: 0 6px 18px rgba(217, 162, 171, 0.35);
        }

        .ll-btn-primary:hover {
          transform: translateY(-2px);
          opacity: 0.95;
          box-shadow: 0 8px 24px rgba(217, 162, 171, 0.45);
        }

        .ll-btn-secondary {
          background: #fff;
          color: #333;
          border: 1px solid #eee;
        }

        .ll-btn-secondary:hover {
          background: #fafafa;
          border-color: #ddd;
          transform: translateY(-1px);
        }

        .ll-help {
          margin-top: 28px !important;
          font-size: 13px !important;
          color: #999 !important;
          line-height: 1.5;
        }

        .ll-mini-box {
          background: rgba(255, 255, 255, 0.55);
          border: 1px solid rgba(255, 255, 255, 0.7);
          border-radius: 20px;
          padding: 32px;
          width: 100%;
          max-width: 320px;
          backdrop-filter: blur(10px);
        }

        .ll-mini-box h3 {
          margin: 0 0 20px;
          color: #4a3e43;
          font-size: 18px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: -0.01em;
        }

        .ll-mini-box ul {
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .ll-mini-box li {
          margin: 0 0 14px;
          color: #5e5559;
          font-size: 14px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        @media (max-width: 860px) {
          .ll-account-section {
            padding: 40px 16px;
          }
          
          .ll-account-card {
            grid-template-columns: 1fr;
          }

          .ll-account-left,
          .ll-account-right {
            padding: 42px 24px;
          }

          .ll-title {
            font-size: 32px;
          }

          .ll-back-bar-inner {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }

          .ll-back-bar-links {
            flex-wrap: wrap;
            justify-content: center;
          }
        }

        /* ---- Barra "Continuar comprando" ---- */
        .ll-back-bar {
          background: #fff;
          border-top: 1px solid #f0e8ea;
          padding: 28px 20px;
        }

        .ll-back-bar-inner {
          max-width: 980px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .ll-back-bar-label {
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #999;
          white-space: nowrap;
        }

        .ll-back-bar-links {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .ll-back-link {
          display: inline-flex;
          align-items: center;
          text-decoration: none;
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #666;
          padding: 10px 18px;
          border-radius: 10px;
          border: 1px solid #eee;
          background: #fafafa;
          transition: all 0.2s ease;
        }

        .ll-back-link:hover {
          background: #f5f0f1;
          border-color: #ddd;
          color: #333;
          transform: translateY(-1px);
        }

        .ll-back-link-primary {
          background: var(--brand-primary, #d9a2ab);
          color: #fff !important;
          border-color: transparent;
          box-shadow: 0 4px 14px rgba(217, 162, 171, 0.35);
        }

        .ll-back-link-primary:hover {
          opacity: 0.9;
          background: var(--brand-primary, #d9a2ab);
          border-color: transparent;
        }
      `}</style>
    </div>
  );
}
