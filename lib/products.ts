export const ECWID_STORE_ID = '134156251';

export interface Product {
  id: number;
  slug: string;
  name: string;
  price: number;
  image: string;
  category: string;
  categorySlug: string;
  description: string;
  details: string[];
}

export interface WordPressAnuncio {
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
}

/**
 * Normaliza um valor para string e remove espaços
 */
const normalizeSlug = (value: string | number | undefined | null) => String(value ?? '').trim();

/**
 * Gera slug consistente para produtos WordPress
 * Prioridade: id_ecwid > titulo normalizado > id
 */
export const getWordPressProductSlug = (product: WordPressAnuncio | { id_ecwid?: string; id: number; titulo?: string }): string => {
  // Prioridade 1: id_ecwid (se tiver)
  const idEcwid = normalizeSlug((product as any).id_ecwid);
  if (idEcwid) return idEcwid;
  
  // Prioridade 2: slug derivado do título
  const title = normalizeSlug((product as any).titulo);
  if (title) {
    const slugFromTitle = title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');
    if (slugFromTitle) return slugFromTitle;
  }
  
  // Prioridade 3: id como última opção
  return normalizeSlug((product as any).id);
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
};

export const getEcwidProductUrl = (slug: string) => {
  return `https://llmodas.shop/store/${slug}`;
};

const ECWID_CHECKOUT_BASE_URL = 'https://llmodas.shop/store/';

export const getEcwidCheckoutUrl = (items: { id: number; id_ecwid?: string; quantity: number }[]) => {
  const cartData = items
    .filter(item => item.quantity > 0)
    .map(item => {
      const ecwidId = item.id_ecwid ? Number(item.id_ecwid) : item.id;
      return `${ecwidId}:${item.quantity}`;
    })
    .join(',');

  return cartData
    ? `${ECWID_CHECKOUT_BASE_URL}#!/~/cart/add=${cartData}`
    : ECWID_CHECKOUT_BASE_URL;
};

export const PRODUCTS: Product[] = [
  { 
    id: 828720114, 
    slug: 'vestido-midi-jeans-feminino-alca-botoes-tres-marias-rodado',
    name: 'Vestido Midi Jeans Feminino Alça Botões Três Marias Rodado', 
    price: 140.42, 
    image: '/ai-site2/products/vestido-midi-jeans.webp', 
    category: 'Vestidos',
    categorySlug: 'vestidos',
    description: 'Vestido midi jeans com alças ajustáveis e botões frontais. Modelo Três Marias com caimento rodado e elegante.',
    details: ['Jeans leve', 'Botões funcionais', 'Alças reguláveis', 'Comprimento midi'],
  },
  { 
    id: 2, 
    slug: 'vestido-feminino-midi-evase-elegante',
    name: 'Vestido Feminino Midi Evase Elegante Natal E Ano Novo', 
    price: 110.31, 
    image: '/ai-site2/products/vestido-midi-evase.webp', 
    category: 'Vestidos',
    categorySlug: 'vestidos',
    description: 'Vestido midi evasê perfeito para festas de fim de ano. Tecido sofisticado com caimento impecável.',
    details: ['Corte evasê', 'Ideal para festas', 'Tecido premium', 'Zíper invisível']
  },
  { 
    id: 3, 
    slug: 'vestido-feminino-longo-elastex-acinturado',
    name: 'Vestido Feminino Longo Elastex Acinturado Laço Elegante', 
    price: 119.90, 
    image: '/ai-site2/products/vestido-longo-elastex.webp', 
    category: 'Vestidos',
    categorySlug: 'vestidos',
    description: 'Vestido longo com detalhe em elastex na cintura para melhor ajuste. Detalhe de laço que traz delicadeza à peça.',
    details: ['Cintura com elastex', 'Detalhe de laço', 'Comprimento longo', 'Forro interno']
  },
  { 
    id: 4, 
    slug: 'vestido-feminino-longo-listrado-alcas',
    name: 'Vestido Feminino Longo Listrado Alças Ajustáveis Moda Verão', 
    price: 115.62, 
    image: '/ai-site2/products/vestido-longo-listrado.webp', 
    category: 'Vestidos',
    categorySlug: 'vestidos',
    description: 'Vestido longo listrado, a cara do verão. Alças ajustáveis para maior conforto e estilo.',
    details: ['Estampa listrada', 'Alças reguláveis', 'Tecido fresco', 'Fenda lateral']
  },
  { 
    id: 5, 
    slug: 'conjunto-feminino-alfaiataria-colete-short',
    name: 'Conjunto Feminino Em Alfaiataria Colete E Short', 
    price: 80.99, 
    image: '/ai-site2/products/conjunto-alfaiataria-short.webp', 
    category: 'Conjuntos',
    categorySlug: 'conjuntos',
    description: 'Conjunto moderno em alfaiataria composto por colete estruturado e shorts confortável.',
    details: ['Tecido alfaiataria', 'Colete com botões', 'Shorts com bolsos', 'Corte moderno']
  },
  { 
    id: 6, 
    slug: 'conjunto-feminino-alfaiataria-primavera-verao',
    name: 'Conjunto Feminino De Alfaiataria Primavera/verão Ano Novo', 
    price: 112.30, 
    image: '/ai-site2/products/vestido-midi-evase-2.webp', 
    category: 'Conjuntos',
    categorySlug: 'conjuntos',
    description: 'Conjunto de alfaiataria leve para as estações quentes. Elegância garantida para o seu Réveillon.',
    details: ['Cores vibrantes', 'Corte reto', 'Tecido respirável', 'Acabamento premium']
  },
  { 
    id: 7, 
    slug: 'conjunto-elegante-skine-calca-colete',
    name: 'Conjunto Elegante Skine Calça E Colete', 
    price: 99.09, 
    image: '/ai-site2/products/conjunto-skine.webp', 
    category: 'Conjuntos',
    categorySlug: 'conjuntos',
    description: 'Conjunto sofisticado com calça skine e colete combinando. Ideal para um visual profissional e chic.',
    details: ['Calça skine', 'Colete acinturado', 'Tecido com elastano', 'Versátil']
  },
  { 
    id: 8, 
    slug: 'conjunto-feminino-mulheres-elegantes-festas',
    name: 'Conjunto Feminino Para Mulheres Elegantes Em Alta Festas', 
    price: 123.40, 
    image: '/ai-site2/products/conjunto-elegante-festas.webp', 
    category: 'Conjuntos',
    categorySlug: 'conjuntos',
    description: 'Conjunto luxuoso para ocasiões especiais. Design exclusivo que valoriza a silhueta feminina.',
    details: ['Brilho sutil', 'Modelagem festa', 'Tecido encorpado', 'Exclusivo']
  },
  { 
    id: 9, 
    slug: 'conjunto-feminino-saia-colete-plissado',
    name: 'Conjunto Feminino Saia E Colete Plissado Lançamento Em Alta', 
    price: 126.34, 
    image: '/ai-site2/products/conjunto-saia-plissada.webp', 
    category: 'Conjuntos',
    categorySlug: 'conjuntos',
    description: 'Conjunto tendência com saia plissada e colete. Um visual romântico e moderno ao mesmo tempo.',
    details: ['Saia plissada', 'Colete estruturado', 'Movimento fluido', 'Lançamento']
  },
];

export const CATEGORIES = [
  { name: 'Vestidos', slug: 'vestidos', image: '/ai-site2/products/vestido-midi-jeans.webp' },
  { name: 'Conjuntos', slug: 'conjuntos', image: '/ai-site2/products/conjunto-alfaiataria-short.webp' },
  { name: 'Novidades', slug: 'novidades', image: '/ai-site2/products/vestido-longo-elastex.webp' },
];

export const fetchWordPressCategories = async () => {
  try {
    const res = await fetch('https://llmodas.shop/wp-json/site/v1/anuncios', {
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('Erro ao buscar anúncios');

    const anuncios = await res.json();
    if (!Array.isArray(anuncios)) return CATEGORIES; // fallback to static categories

    // Extract unique categories from WordPress products
    const wpCategories = new Map();

    anuncios.forEach((anuncio: any) => {
      if (anuncio.categoria && anuncio.categoria.slug) {
        const slug = anuncio.categoria.slug;
        const name = anuncio.categoria.name || slug;
        if (!wpCategories.has(slug)) {
          wpCategories.set(slug, {
            name: name,
            slug: slug,
            image: anuncio.imagem || '/ai-site2/products/default.webp'
          });
        }
      }
    });

    // Convert to array and merge with static categories
    const dynamicCategories = Array.from(wpCategories.values());
    return [...CATEGORIES, ...dynamicCategories];
  } catch (error) {
    console.error('Erro ao buscar categorias WordPress:', error);
    return CATEGORIES; // fallback to static categories
  }
};

