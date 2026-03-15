import type { ProductCatalogEntryDto } from '../types/api';

interface ProductCardProps {
  product: ProductCatalogEntryDto;
  imageUrl?: string;
  onAddToCart: (sku: string, quantity?: number) => void;
}

const formatPrice = (price: number | string): string => {
  const n = typeof price === 'string' ? parseFloat(price) : price;
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
};

export const ProductCard = ({ product, imageUrl, onAddToCart }: ProductCardProps) => (
  <article className="border border-walmart-secondary-blue rounded-lg overflow-hidden bg-walmart-white shadow-card flex flex-col w-full h-full min-h-[320px]">
    <div className="w-full h-[180px] shrink-0 bg-[#f5f5f5] flex items-center justify-center">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      ) : (
        <div className="text-[#999] text-[0.85rem]" aria-hidden>
          Sin imagen
        </div>
      )}
    </div>
    <div className="p-4 flex flex-col gap-2 flex-1 min-h-0 h-[140px] shrink-0">
      <div className="flex-1 min-h-0 flex flex-col gap-2 overflow-hidden">
        <h3 className="m-0 text-base font-semibold text-walmart-bentonville-blue leading-snug line-clamp-2 shrink-0">
          {product.name}
        </h3>
        <p className="m-0 text-[1.1rem] font-bold text-walmart-true-blue shrink-0">
          {formatPrice(product.price)}
        </p>
        {product.promotions?.length > 0 && (
          <p
            className="m-0 text-xs text-[#555] min-h-0 overflow-hidden line-clamp-1"
            aria-label="Promociones"
          >
            {product.promotions[0].description}
          </p>
        )}
      </div>
      <button
        type="button"
        className="shrink-0 mt-auto py-2 px-4 bg-walmart-spark-yellow text-walmart-bentonville-blue border-none rounded-md font-semibold text-[0.9rem] hover:bg-yellow-hover"
        onClick={() => onAddToCart(product.sku, 1)}
      >
        Agregar al carrito
      </button>
    </div>
  </article>
);
