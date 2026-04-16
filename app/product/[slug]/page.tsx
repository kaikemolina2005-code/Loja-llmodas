import React from 'react';
import ProductPageClient from '@/components/ProductPageClient';
import { PRODUCTS, getWordPressProductSlug } from '@/lib/products';

export const revalidate = 60; // Revalidar cache a cada 60 segundos
export const dynamicParams = true; // Permitir rotas dinâmicas não pré-renderizadas

type WordPressAnuncio = {
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

const WP_API_URL = 'https://llmodas.shop/wp-json/site/v1/anuncios';

const normalizeSlug = (value: string | number | undefined | null) => String(value ?? '').trim();

const matchesWordPressSlug = (slug: string, item: WordPressAnuncio) => {
  const itemSlug = getWordPressProductSlug(item);
  const idSlug = normalizeSlug(item.id);
  const slugFromTitle = normalizeSlug(item.titulo)
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');
  
  return itemSlug === slug || idSlug === slug || slugFromTitle === slug;
};

async function fetchWordPressAnuncios(useStaticCache = true) {
  try {
    // Para static export, sempre usar force-cache
    const res = await fetch(WP_API_URL, { 
      cache: 'force-cache',
      next: { revalidate: 86400 } // 24h
    });

    if (!res.ok) {
      console.error('Erro ao buscar anúncios WordPress - Status:', res.status);
      throw new Error(`Erro ao buscar anúncios WordPress: ${res.status}`);
    }

    const data = await res.json();
    const anuncios = Array.isArray(data) ? (data as WordPressAnuncio[]) : [];
    
    console.log(`✓ ${anuncios.length} anúncios carregados do WordPress`);
    
    return anuncios;
  } catch (error) {
    console.error('Erro em fetchWordPressAnuncios:', error);
    return [];
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: rawSlug } = await params;
  const slug = normalizeSlug(rawSlug);
  const localProduct = PRODUCTS.find((product) => product.slug === slug);

  if (localProduct) {
    return <ProductPageClient slug={slug} />;
  }

  const anuncios = await fetchWordPressAnuncios();
  const anuncio = anuncios.find((item) => matchesWordPressSlug(slug, item));

  if (!anuncio) {
    return <ProductPageClient slug={slug} />;
  }

  const wpProduct = {
    id: parseInt(anuncio.id_ecwid) || anuncio.id,
    slug: getWordPressProductSlug(anuncio),
    name: anuncio.titulo,
    price: Number(anuncio.preco) || 0,
    image: anuncio.imagem,
    category: 'WordPress',
    categorySlug: 'wordpress',
    description: anuncio.descricao_curta,
    details: [],
    id_ecwid: anuncio.id_ecwid,
    url_ecwid: anuncio.url_ecwid,
    isWordPress: true,
  };

  return <ProductPageClient slug={slug} wpProduct={wpProduct} />;
}

export async function generateStaticParams() {
  try {
    console.log('🔄 Iniciando geração de params estáticos para produtos...');
    
    const wpProducts = await fetchWordPressAnuncios(true); // true = usar cache estático
    console.log(`📦 Total de produtos WordPress obtidos: ${wpProducts.length}`);
    
    const params = new Set<string>();

    wpProducts.forEach((product, index) => {
      // Adiciona slug primário
      const slug = getWordPressProductSlug(product);
      if (slug) {
        params.add(slug);
        console.log(`  [${index + 1}] Adicionado slug principal: ${slug}`);
      } else {
        console.warn(`  [${index + 1}] ⚠️ Produto sem slug: ${product.titulo}`);
      }
      
      // Adiciona slug do ID
      const idSlug = normalizeSlug(product.id);
      if (idSlug && !params.has(idSlug)) {
        params.add(idSlug);
      }
      
      // Adiciona slug derivado do título
      const slugFromTitle = normalizeSlug(product.titulo)
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '');
      if (slugFromTitle && !params.has(slugFromTitle)) {
        params.add(slugFromTitle);
      }
    });

    const allParams = [
      ...PRODUCTS.map((product) => ({ slug: product.slug })),
      ...Array.from(params).map((slug) => ({ slug })),
    ];
    
    console.log(`✅ Total de rotas geradas: ${allParams.length}`);
    console.log(`   - Produtos locais: ${PRODUCTS.length}`);
    console.log(`   - Produtos WordPress: ${params.size}`);
    
    return allParams;
  } catch (error) {
    console.error('❌ Erro ao gerar params estáticos:', error);
    return PRODUCTS.map((product) => ({ slug: product.slug }));
  }
}
