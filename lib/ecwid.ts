export interface EcwidApiProduct {
  id: number;
  name: string;
  price: number;
  defaultDisplayedPrice?: string;
  description?: string;
  shortDescription?: string;
  thumbnailUrl?: string;
  originalImageUrl?: string;
  imageUrl?: string;
  url?: string;
  categoryIds?: number[];
}

export interface EcwidProduct {
  id: number;
  slug: string;
  name: string;
  price: number;
  image: string;
  category: string;
  categorySlug: string;
  description: string;
  details: string[];
  id_ecwid: string;
  url_ecwid: string;
}

export interface EcwidCategory {
  id: number;
  name: string;
  slug: string;
}

const DEFAULT_STORE_ID = '134156251';

export const getEcwidStoreId = () => {
  return process.env.ECWID_STORE_ID || process.env.NEXT_PUBLIC_ECWID_STORE_ID || DEFAULT_STORE_ID;
};

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

export const mapEcwidProduct = (item: EcwidApiProduct): EcwidProduct => {
  const cleanDescription = stripHtml(item.shortDescription || item.description || '');
  const categoryName = item.categoryIds?.length ? `Categoria ${item.categoryIds[0]}` : 'Ecwid';
  const categorySlug = item.categoryIds?.length ? `categoria-${item.categoryIds[0]}` : 'ecwid';
  const image = item.thumbnailUrl || item.originalImageUrl || item.imageUrl || '/products/default.webp';
  const productUrl = item.url || `https://llmodas.shop/store/#!/~/p/${item.id}`;

  return {
    id: item.id,
    slug: String(item.id),
    name: item.name,
    price: Number(item.price) || 0,
    image,
    category: categoryName,
    categorySlug,
    description: cleanDescription || 'Produto sem descrição.',
    details: [`Código ${item.id}`],
    id_ecwid: String(item.id),
    url_ecwid: productUrl,
  };
};

export const fetchEcwidProducts = async (): Promise<EcwidProduct[]> => {
  const token = process.env.ECWID_API_TOKEN;
  if (!token) {
    return [];
  }

  const storeId = getEcwidStoreId();
  const response = await fetch(
    `https://app.ecwid.com/api/v3/${storeId}/products?enabled=true&limit=100`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    throw new Error(`Falha ao buscar produtos Ecwid: ${response.status}`);
  }

  const data = await response.json();
  const items = Array.isArray(data?.items) ? (data.items as EcwidApiProduct[]) : [];
  return items.map(mapEcwidProduct);
};

export const fetchEcwidCategories = async (): Promise<EcwidCategory[]> => {
  const token = process.env.ECWID_API_TOKEN;
  if (!token) {
    return [];
  }

  const storeId = getEcwidStoreId();
  const response = await fetch(`https://app.ecwid.com/api/v3/${storeId}/categories?limit=100`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Falha ao buscar categorias Ecwid: ${response.status}`);
  }

  const data = await response.json();
  const items = Array.isArray(data?.items) ? data.items : [];

  return items.map((item: any) => ({
    id: item.id,
    name: item.name,
    slug: slugify(item.name || `categoria-${item.id}`),
  }));
};
