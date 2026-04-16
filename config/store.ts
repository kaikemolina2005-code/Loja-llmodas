export const stores = [
  {
    key: "llmodas",
    match: ["llmodas", "llmodas.shop"],
    name: "LL Modas",
    primaryColor: "#d89aa0",
    whatsapp: "5512996222287",
    ecwidUrl: "https://llmodas.shop/store",
    hero: {
      title: "Mais estilo pro seu dia",
      button: "Ver coleção"
    }
  },
  {
    key: "modabela",
    match: ["modabela"],
    name: "Moda Bela",
    primaryColor: "#000000",
    whatsapp: "5511999999999",
    ecwidUrl: "https://modabela.com/store", // Adjust if different
    hero: {
      title: "Tendências em Alta",
      button: "Explorar"
    }
  }
];

const getStoreConfig = () => {
  if (typeof window === "undefined") {
    // Fallback for build time / server-side
    return stores[0];
  }

  const host = window.location.hostname;
  const store = stores.find(s => s.match.some(m => host.includes(m)));

  return store || stores[0];
};

export const storeConfig = getStoreConfig();
