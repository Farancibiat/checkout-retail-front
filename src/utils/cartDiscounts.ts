import type { CartItem, ProductCatalogEntryDto, PromotionSummaryDto } from '../types/api';

const QUANTITY_DISCOUNT_TYPE = 'quantity_discount';

function toPrice(product: ProductCatalogEntryDto): number {
  return typeof product.price === 'string'
    ? parseFloat(product.price)
    : product.price;
}

/**
 * Calcula el total de descuentos por promociones de producto en el carrito
 * (misma lógica que el backend: quantity_discount con minQuantity y percent).
 */
export function getTotalPromotionDiscount(
  items: CartItem[],
  products: ProductCatalogEntryDto[]
): number {
  const bySku = new Map(products.map((p) => [p.sku, p]));
  let total = 0;
  for (const item of items) {
    const product = bySku.get(item.sku);
    if (!product) continue;
    const promotions: PromotionSummaryDto[] = product.promotions ?? [];
    const lineTotal = toPrice(product) * item.quantity;
    for (const promo of promotions) {
      if (
        promo.type === QUANTITY_DISCOUNT_TYPE &&
        promo.minQuantity != null &&
        item.quantity >= promo.minQuantity
      ) {
        const pct = Number(promo.percent) || 0;
        total += lineTotal * (pct / 100);
      }
    }
  }
  return Math.round(total * 100) / 100;
}

/**
 * Calcula el monto de descuento por promociones para una sola línea (ítem + producto).
 * Misma lógica: quantity_discount con quantity >= minQuantity → lineTotal * percent / 100.
 */
export function getLinePromotionDiscount(
  item: CartItem,
  product: ProductCatalogEntryDto
): number {
  const promotions: PromotionSummaryDto[] = product.promotions ?? [];
  const lineTotal = toPrice(product) * item.quantity;
  let total = 0;
  for (const promo of promotions) {
    if (
      promo.type === QUANTITY_DISCOUNT_TYPE &&
      promo.minQuantity != null &&
      item.quantity >= promo.minQuantity
    ) {
      const pct = Number(promo.percent) || 0;
      total += lineTotal * (pct / 100);
    }
  }
  return Math.round(total * 100) / 100;
}
