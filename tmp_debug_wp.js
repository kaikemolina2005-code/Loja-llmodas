const fetch = globalThis.fetch || require('node-fetch');
const WP_API_URL = 'https://llmodas.shop/wp-json/site/v1/anuncios';
(async () => {
  const res = await fetch(WP_API_URL);
  const data = await res.json();
  console.log('count', Array.isArray(data) ? data.length : data);
  data.forEach((item) => {
    console.log('item', item.id, typeof item.id, 'id_ecwid', JSON.stringify(item.id_ecwid), typeof item.id_ecwid, 'slug', (item.id_ecwid?.trim() || String(item.id)).toString());
  });
})();
