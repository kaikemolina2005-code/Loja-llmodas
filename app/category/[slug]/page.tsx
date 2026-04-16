import React from 'react';
import { CATEGORIES } from '@/lib/products';
import CategoryPageClient from '@/components/CategoryPageClient';

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <CategoryPageClient slug={slug} />;
}

export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    slug: category.slug,
  }));
}
