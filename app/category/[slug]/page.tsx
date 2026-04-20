import React from 'react';
import { fetchEcwidCategories } from '@/lib/ecwid';
import CategoryPageClient from '@/components/CategoryPageClient';

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <CategoryPageClient slug={slug} />;
}

export async function generateStaticParams() {
  try {
    const categories = await fetchEcwidCategories();
    return categories.map((category) => ({ slug: category.slug }));
  } catch (error) {
    return [];
  }
}
