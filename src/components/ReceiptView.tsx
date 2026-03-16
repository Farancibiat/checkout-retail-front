import { Link } from 'react-router-dom';
import type {
  CartItem,
  CheckoutResponse,
  DiscountAppliedDto,
  ProductCatalogEntryDto,
} from '../types/api';

interface ReceiptViewProps {
  result: CheckoutResponse;
  purchasedItems?: CartItem[];
  products?: ProductCatalogEntryDto[];
  onClose: () => void;
}

const toPrice = (p: ProductCatalogEntryDto): number =>
  typeof p.price === 'string' ? parseFloat(p.price) : p.price;

const formatPrice = (n: number): string =>
  new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);

function getPromotionDiscountsForSku(
  discounts: DiscountAppliedDto[],
  sku: string
): DiscountAppliedDto[] {
  return discounts.filter(
    (d) =>
      d.type === 'PROMOTION' &&
      (d.description.includes(`unidades de ${sku}`) || d.description.endsWith(` ${sku}`))
  );
}

function hasPromotionDiscountForItem(
  discounts: DiscountAppliedDto[],
  sku: string
): boolean {
  return getPromotionDiscountsForSku(discounts, sku).length > 0;
}

export const ReceiptView = ({
  result,
  purchasedItems = [],
  products = [],
  onClose,
}: ReceiptViewProps) => {
  const bySku = new Map(products.map((p) => [p.sku, p]));
  const promotionDiscounts = result.discounts.filter(
    (d) => d.type === 'PROMOTION'
  );
  const paymentDiscounts = result.discounts.filter(
    (d) => d.type === 'PAYMENT'
  );
  const totalPromotionAmount = promotionDiscounts.reduce(
    (sum, d) => sum + d.amount,
    0
  );

  return (
    <div className="w-full max-w-[520px] mx-auto p-6">
      <div className="bg-walmart-white border-2 border-walmart-true-blue rounded-xl p-8 shadow-receipt">
        <h1 className="m-0 mb-2 text-2xl text-walmart-bentonville-blue">
          Boleta de compra
        </h1>
        <p className="m-0 mb-6 text-sm text-[#666]">Carrito: {result.cartId}</p>

        {purchasedItems.length > 0 && products.length > 0 && (
          <section className="mb-6">
            <h2 className="m-0 mb-3 text-[1.1rem] text-walmart-bentonville-blue">
              Detalle
            </h2>
            <ul className="list-none p-0 m-0 space-y-3">
              {purchasedItems.map((item, index) => {
                const product = bySku.get(item.sku);
                if (!product) return null;
                const priceVal = toPrice(product);
                const hasDiscount = hasPromotionDiscountForItem(
                  result.discounts,
                  item.sku
                );
                const itemPromotionDiscounts = getPromotionDiscountsForSku(
                  result.discounts,
                  item.sku
                );
                return (
                  <li
                    key={`${item.sku}-${index}`}
                    className="border-b border-[#eee] last:border-0 pb-2 last:pb-0"
                  >
                    <div className="flex justify-between items-baseline gap-2 py-1">
                      <span className="text-[#333]">
                        {product.name} × {item.quantity}
                      </span>
                      <span
                        className={
                          hasDiscount
                            ? 'line-through text-[#888]'
                            : 'text-walmart-bentonville-blue'
                        }
                      >
                        {formatPrice(priceVal * item.quantity)}
                      </span>
                    </div>
                    {itemPromotionDiscounts.length > 0 && (
                      <ul className="list-none p-0 m-0 pl-3 mt-0.5 text-sm">
                        {itemPromotionDiscounts.map((d, i) => (
                          <li
                            key={`${item.sku}-${index}-${i}`}
                            className="flex justify-between text-[#555]"
                          >
                            <span>{d.description}</span>
                            <span className="text-[#0a0]">
                              −{formatPrice(d.amount)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        <section className="mb-6">
          <h2 className="m-0 mb-3 text-[1.1rem] text-walmart-bentonville-blue">
            Resumen
          </h2>
          <div className="flex justify-between py-1.5">
            <span>Subtotal</span>
            <span>{formatPrice(result.subtotal)}</span>
          </div>
          {totalPromotionAmount > 0 && (
            <div className="flex justify-between py-1.5 text-sm">
              <span>Total descuentos por productos</span>
              <span className="text-[#0a0]">
                −{formatPrice(totalPromotionAmount)}
              </span>
            </div>
          )}
          <div className="flex justify-between py-1.5">
            <span>Costo de envío</span>
            <span>{formatPrice(0)}</span>
          </div>
          {paymentDiscounts.map((d, i) => (
            <div
              key={i}
              className="flex justify-between py-1 text-sm text-[#555]"
            >
              <span>{d.description}</span>
              <span className="text-[#0a0]">−{formatPrice(d.amount)}</span>
            </div>
          ))}
          <div className="mt-3 pt-3 border-t-2 border-walmart-spark-yellow flex justify-between text-[1.15rem] text-walmart-bentonville-blue">
            <strong>Total</strong>
            <strong>{formatPrice(result.total)}</strong>
          </div>
        </section>

      <section className="mb-6">
        <h2 className="m-0 mb-3 text-[1.1rem] text-walmart-bentonville-blue">
          Pago
        </h2>
        <p className="m-0">
          {result.payment.paymentConfirmed
            ? 'Pago confirmado'
            : 'Pago no confirmado'}
        </p>
        <p className="mt-2 mb-0 text-[0.85rem] text-[#666] break-all">
          ID de transacción: {result.payment.transactionId}
        </p>
      </section>

      <div className="flex gap-3 mt-6 flex-wrap">
        <Link
          to="/"
          className="py-2.5 px-5 rounded-lg font-semibold no-underline border-none cursor-pointer text-[0.95rem] bg-walmart-spark-yellow text-walmart-bentonville-blue hover:bg-yellow-hover"
          onClick={onClose}
        >
          Volver al inicio
        </Link>
        <button
          type="button"
          className="py-2.5 px-5 rounded-lg font-semibold no-underline border-2 border-walmart-true-blue cursor-pointer text-[0.95rem] bg-walmart-white text-walmart-true-blue hover:bg-walmart-secondary-blue hover:text-walmart-white hover:border-walmart-secondary-blue"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
  );
};
