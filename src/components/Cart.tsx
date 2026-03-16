import { getTotalPromotionDiscount } from '../utils/cartDiscounts';
import type { CartItem, ProductCatalogEntryDto } from '../types/api';

interface CartProps {
  items: CartItem[];
  products: ProductCatalogEntryDto[];
  getImageUrl?: (index: number) => string | undefined;
  onUpdateQuantity: (sku: string, quantity: number) => void;
  onRemove: (sku: string) => void;
  subtotal: number;
}

const formatPrice = (n: number): string =>
  new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);

const price = (product: ProductCatalogEntryDto): number =>
  typeof product.price === 'string'
    ? parseFloat(product.price)
    : product.price;

export const Cart = ({
  items,
  products,
  getImageUrl,
  onUpdateQuantity,
  onRemove,
  subtotal,
}: CartProps) => {
  const bySku = new Map(products.map((p) => [p.sku, p]));
  const productList = products;
  const skuToIndex = new Map(productList.map((p, i) => [p.sku, i]));
  const promotionDiscount = getTotalPromotionDiscount(items, products);
  const total = subtotal - promotionDiscount;

  if (items.length === 0) {
    return (
      <div className="w-full py-8 text-center text-walmart-bentonville-blue">
        <p>Tu carrito está vacío.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <ul className="list-none p-0 m-0 flex flex-col gap-4">
        {items.map((item) => {
          const product = bySku.get(item.sku);
          if (!product) return null;
          const idx = skuToIndex.get(item.sku) ?? 0;
          const imageUrl = getImageUrl?.(idx);
          const lineTotal = price(product) * item.quantity;
          return (
            <li
              key={item.sku}
              className="flex gap-4 p-4 border border-walmart-secondary-blue rounded-lg bg-walmart-white"
            >
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt=""
                  className="w-12 h-12 object-contain shrink-0 bg-[#f5f5f5] rounded"
                  width={48}
                  height={48}
                />
              )}
              <div className="flex-1 flex flex-col gap-1">
                <span className="font-semibold text-walmart-bentonville-blue">
                  {product.name}
                </span>
                <span className="text-sm text-[#555]">
                  {formatPrice(price(product))} × {item.quantity} ={' '}
                  {formatPrice(lineTotal)}
                </span>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    type="button"
                    className="w-7 h-7 p-0 border border-walmart-true-blue bg-walmart-white text-walmart-true-blue rounded text-base leading-none hover:bg-walmart-secondary-blue hover:text-walmart-white"
                    onClick={() =>
                      onUpdateQuantity(item.sku, item.quantity - 1)
                    }
                    aria-label="Reducir cantidad"
                  >
                    −
                  </button>
                  <span className="min-w-[1.5rem] text-center font-semibold">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    className="w-7 h-7 p-0 border border-walmart-true-blue bg-walmart-white text-walmart-true-blue rounded text-base leading-none hover:bg-walmart-secondary-blue hover:text-walmart-white"
                    onClick={() =>
                      onUpdateQuantity(item.sku, item.quantity + 1)
                    }
                    aria-label="Aumentar cantidad"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    className="ml-2 py-1 px-2 text-xs border-none bg-transparent text-[#c00] hover:underline"
                    onClick={() => onRemove(item.sku)}
                    aria-label="Quitar del carrito"
                  >
                    Quitar
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="mt-4 pt-4 border-t-2 border-walmart-true-blue space-y-1.5 text-lg text-walmart-bentonville-blue">
        <div className="flex justify-between">
          <strong>Subtotal</strong>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Descuento por productos</span>
          <span className="text-[#0a0]">−{formatPrice(promotionDiscount)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Costo de envío</span>
          <span>{formatPrice(0)}</span>
        </div>
        <div className="flex justify-between pt-2 border-t border-walmart-true-blue font-semibold">
          <strong>Total</strong>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
};
