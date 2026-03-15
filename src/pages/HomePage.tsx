import { useEffect, useState } from 'react';
import { getProducts } from '../api/client';
import {
  fetchProductImageUrls,
  getImageUrlForIndex,
} from '../api/productImages';
import { useCart } from '../context/useCart';
import { ProductCard } from '../components/ProductCard';
import type { ProductCatalogEntryDto } from '../types/api';

export const HomePage = () => {
  const [products, setProducts] = useState<ProductCatalogEntryDto[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addItem } = useCart();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    Promise.all([getProducts(), fetchProductImageUrls()])
      .then(([prods, urls]) => {
        if (!cancelled) {
          setProducts(prods);
          setImageUrls(urls);
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Error');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="w-full text-center py-8 text-walmart-bentonville-blue">
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full text-center py-8 text-walmart-bentonville-blue">
        <p className="text-[#c00]">No se pudieron cargar los productos: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h1 className="m-0 mb-6 text-[1.75rem] text-walmart-bentonville-blue">
        Productos
      </h1>
      <ul
        className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] auto-rows-[320px] gap-6 list-none p-0 m-0"
        role="list"
      >
        {products.map((product, index) => (
          <li key={product.sku} className="flex min-w-0 min-h-0" role="listitem">
            <ProductCard
              product={product}
              imageUrl={getImageUrlForIndex(imageUrls, index)}
              onAddToCart={addItem}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
