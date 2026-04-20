import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_HOST = 'llmodas.shop';

function extractImageFromHtml(html: string): string | null {
  const ogImageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i);
  if (ogImageMatch?.[1]) return ogImageMatch[1];

  const twitterImageMatch = html.match(/<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["'][^>]*>/i);
  if (twitterImageMatch?.[1]) return twitterImageMatch[1];

  const jsonLdImageMatch = html.match(/"image"\s*:\s*"([^"]+)"/i);
  if (jsonLdImageMatch?.[1]) return jsonLdImageMatch[1];

  return null;
}

export async function GET(request: NextRequest) {
  const rawUrl = request.nextUrl.searchParams.get('url')?.trim();
  if (!rawUrl) {
    return NextResponse.json({ error: 'Parâmetro url é obrigatório.' }, { status: 400 });
  }

  let productUrl: URL;
  try {
    productUrl = new URL(rawUrl);
  } catch {
    return NextResponse.json({ error: 'URL inválida.' }, { status: 400 });
  }

  // Evita SSRF: permite apenas produtos públicos do domínio oficial.
  if (productUrl.hostname !== ALLOWED_HOST || !productUrl.pathname.startsWith('/store')) {
    return NextResponse.json({ error: 'URL não permitida.' }, { status: 400 });
  }

  try {
    const response = await fetch(productUrl.toString(), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; LLModasBot/1.0)',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Não foi possível buscar a página do produto.' }, { status: 502 });
    }

    const html = await response.text();
    const image = extractImageFromHtml(html);

    if (!image) {
      return NextResponse.json({ image: null });
    }

    return NextResponse.json({ image });
  } catch {
    return NextResponse.json({ error: 'Erro ao buscar imagem no Ecwid.' }, { status: 500 });
  }
}
