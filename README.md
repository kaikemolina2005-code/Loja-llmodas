# 🛍️ Template de Loja — White Label Next.js + Ecwid + Clerk

Projeto pronto para ser usado como base de loja virtual. Basta trocar as variáveis de ambiente e personalizar o visual.

---

## 🚀 Como usar este template

### 1. Criar o seu repositório

No GitHub, clique em **"Use this template"** → **"Create a new repository"**.

---

### 2. Clonar e instalar

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
npm install
```

---

### 3. Configurar as variáveis de ambiente

Copie o arquivo de exemplo e preencha com seus dados:

```bash
cp .env.example .env.local
```

Edite o `.env.local` com as chaves da **sua conta**:

| Variável | Onde encontrar |
|---|---|
| `NEXT_PUBLIC_STORE_URL` | URL do seu domínio (ex: https://sujaloja.com.br) |
| `NEXT_PUBLIC_ECWID_STORE_ID` | Ecwid > Configurações > Geral |
| `ECWID_API_TOKEN` | Ecwid > Apps > API |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | clerk.com > seu projeto > API Keys |
| `CLERK_SECRET_KEY` | clerk.com > seu projeto > API Keys |

---

### 4. Rodar localmente

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

---

## 🎨 O que personalizar

### Visual (cores, fontes)
- `app/globals.css` — variáveis CSS de cores e fontes
- `config/store.ts` — nome da loja, cor primária, número do WhatsApp

### Conteúdo
- `app/sobre/page.tsx` — informações da sua loja
- `components/Footer.tsx` — links sociais (Instagram, Mercado Livre)
- `public/logo.jpg` — substitua pela sua logo (imagem quadrada)

### Produtos e categorias
Gerenciados 100% pelo Ecwid. Basta adicionar seus produtos lá e eles aparecem automaticamente no site quando o token da API estiver configurado.

---

## 📁 Estrutura do projeto

```
├── lib/              ← Motor do sistema (não altere)
│   ├── ecwid.ts      ← Integração com API Ecwid
│   └── products.ts   ← Tipos e utilitários de produto
│
├── app/              ← Páginas da loja (personalize aqui)
│   ├── page.tsx      ← Home
│   ├── store/        ← Loja completa
│   ├── promocoes/    ← Página de promoções
│   ├── novidades/    ← Página de novidades
│   └── sobre/        ← Sobre a loja
│
├── components/       ← Componentes visuais (personalize aqui)
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ProductCard.tsx
│
├── config/
│   └── store.ts      ← Nome da loja, WhatsApp, cores
│
└── public/           ← Imagens estáticas (logo, produtos)
```

---

## 🔐 Modelos de uso

### Cada cliente com sua própria loja
Cada um cria conta no Ecwid e no Clerk e coloca suas próprias chaves no `.env.local`.

### Cliente usando o seu estoque (franquia)
O cliente usa o **seu** `NEXT_PUBLIC_ECWID_STORE_ID`, mas cria a **própria conta no Clerk** para ter seus usuários separados.

---

## ☁️ Deploy na Vercel

1. Importe o repositório na [vercel.com](https://vercel.com)
2. Em **Settings > Environment Variables**, adicione todas as variáveis do `.env.example`
3. Clique em **Deploy**

---

## 🛠️ Tecnologias

- [Next.js 15](https://nextjs.org) — Framework React
- [Ecwid](https://ecwid.com) — Plataforma de e-commerce (produtos, carrinho, checkout)
- [Clerk](https://clerk.com) — Autenticação de usuários
- [Tailwind CSS](https://tailwindcss.com) — Estilo
- [Vercel](https://vercel.com) — Hospedagem


## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
