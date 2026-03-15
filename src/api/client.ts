import type {
  ProductCatalogEntryDto,
  CartCheckoutRequest,
  CheckoutResponse,
} from '../types/api';

const rawBaseUrl =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api/v1';
// Asegurar URL absoluta: si falta protocolo, el navegador la trata como ruta relativa al origen.
const BASE_URL =
  rawBaseUrl.startsWith('http://') || rawBaseUrl.startsWith('https://')
    ? rawBaseUrl.replace(/\/$/, '') // quitar barra final si la tiene
    : `https://${rawBaseUrl.replace(/^\//, '')}`;

const fetchApi = async <T,>(
  path: string,
  options?: RequestInit
): Promise<T> => {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
};

export const getProducts = (): Promise<ProductCatalogEntryDto[]> =>
  fetchApi<ProductCatalogEntryDto[]>('/products');

export const postCheckout = (
  request: CartCheckoutRequest
): Promise<CheckoutResponse> =>
  fetchApi<CheckoutResponse>('/checkout', {
    method: 'POST',
    body: JSON.stringify(request),
  });
