import type { CartItem, ProductCatalogEntryDto } from '../types/api';

interface CartSidebarProps {
  items: CartItem[];
  products: ProductCatalogEntryDto[];
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

export const CartSidebar = ({
  items,
  products,
  subtotal,
}: CartSidebarProps) => {
  const bySku = new Map(products.map((p) => [p.sku, p]));

  return (
    <aside className="bg-[#f8f9fa] border border-walmart-secondary-blue rounded-lg p-5 min-w-[260px]">
      <h3 className="m-0 mb-4 text-[1.1rem] text-walmart-bentonville-blue">
        Carrito
      </h3>
      <ul className="list-none p-0 m-0 flex flex-col gap-2">
        {items.map((item) => {
          const product = bySku.get(item.sku);
          if (!product) return null;
          const lineTotal = price(product) * item.quantity;
          return (
            <li
              key={item.sku}
              className="flex flex-col gap-[0.15rem] py-2 border-b border-[#e0e0e0] last:border-b-0"
            >
              <span className="font-semibold text-sm text-[#333]">
                {product.name}
              </span>
              <span className="text-xs text-[#666]">
                {item.quantity} × {formatPrice(price(product))} ={' '}
                {formatPrice(lineTotal)}
              </span>
            </li>
          );
        })}
      </ul>
      <div className="mt-4 pt-4 border-t-2 border-walmart-true-blue flex justify-between items-center text-base text-walmart-bentonville-blue">
        <strong>Subtotal</strong>
        <span>{formatPrice(subtotal)}</span>
      </div>
    </aside>
  );
};
