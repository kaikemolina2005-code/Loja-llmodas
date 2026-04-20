import { NextResponse } from 'next/server';
import { fetchEcwidCategories, fetchEcwidProducts } from '@/lib/ecwid';

export async function GET() {
  try {
    const [products, categories] = await Promise.all([fetchEcwidProducts(), fetchEcwidCategories()]);

    return NextResponse.json({ products, categories });
  } catch (error) {
    console.error('Erro ao buscar dados do Ecwid:', error);
    return NextResponse.json({ products: [], categories: [] }, { status: 200 });
  }
}
