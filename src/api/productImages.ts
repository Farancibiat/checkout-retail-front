const FAKE_STORE_API = 'https://fakestoreapi.com/products';

interface FakeStoreProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

let cachedUrls: string[] | null = null;

/**
 * Obtiene las URLs de imágenes de Fake Store API para usar en las cards.
 * Cache en memoria para no repetir la petición.
 */
export const fetchProductImageUrls = async (): Promise<string[]> => {
  if (cachedUrls?.length) return cachedUrls;
  try {
    const res = await fetch(FAKE_STORE_API);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as FakeStoreProduct[];
    cachedUrls = data.map((p) => p.image).filter(Boolean);
    return cachedUrls;
  } catch {
    return [];
  }
};

/**
 * Asigna una URL de imagen a un producto por índice (cíclico).
 */
export const getImageUrlForIndex = (
  imageUrls: string[],
  productIndex: number
): string | undefined => {
  if (!imageUrls.length) return undefined;
  return imageUrls[productIndex % imageUrls.length];
};
