# Checkout App (Frontend)

SPA del checkout retail: React 19, TypeScript, Vite 8 y Tailwind CSS 4. Consume la API del backend `checkout-retail` (catálogo y checkout) y usa Fake Store API para imágenes de productos. Diseño inspirado en la guía de marca Walmart.

**Enlaces:** [Demo en vivo](https://walmart.farancibiat.cl) · [Repositorio del backend](https://github.com/Farancibiat/checkout-retail)



## Uso rápido (solo frontend)

Requisitos: Node.js 18+ y backend corriendo en `http://localhost:8080`.

```bash
npm install
npm run dev
```

Abre **http://localhost:5173**.

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo (Vite) |
| `npm run build` | Build de producción → `dist/` |
| `npm run preview` | Vista previa del build |
| `npm run lint` | ESLint |

## Variables de entorno

| Variable | Por defecto |
|----------|-------------|
| `VITE_API_BASE_URL` | `http://localhost:8080/api/v1` |

Opcional: copia `.env.example` a `.env` y ajusta.

## Estructura relevante

- `src/api/` — Cliente HTTP (backend + imágenes)
- `src/components/` — Navbar, Footer, ProductCard, Cart, CartSidebar, CheckoutModal, ReceiptView, Layout
- `src/context/` — Estado del carrito (CartContext, useCart)
- `src/pages/` — HomePage, CartPage
