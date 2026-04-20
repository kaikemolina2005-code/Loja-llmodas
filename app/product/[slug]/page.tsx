import React from 'react';
import ProductPageClient from '@/components/ProductPageClient';
import { fetchEcwidProducts } from '@/lib/ecwid';

export const revalidate = 60;
export const dynamicParams = true;

const normalizeSlug = (value: string | number | undefined | null) => String(value ?? '').trim();

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: rawSlug } = await params;
  const slug = normalizeSlug(rawSlug);

  const ecwidProducts = await fetchEcwidProducts();
  const ecwidProduct = ecwidProducts.find((item) => normalizeSlug(item.id) === slug || item.slug === slug);

  return <ProductPageClient slug={slug} wpProduct={ecwidProduct} />;
}

export async function generateStaticParams() {
  try {
    const ecwidProducts = await fetchEcwidProducts();
    return ecwidProducts.map((product) => ({ slug: normalizeSlug(product.id) }));
  } catch (error) {
    console.error('Erro ao gerar params estáticos de produtos Ecwid:', error);
    return [];
  }
}
