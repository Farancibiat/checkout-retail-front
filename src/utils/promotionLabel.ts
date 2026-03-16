import type { PromotionSummaryDto } from '../types/api';

export function buildPromotionLabel(promo: PromotionSummaryDto): string {
  if (promo.type === 'quantity_discount') {
    return `${promo.percent}% dcto. por ${promo.minQuantity}+ unidades`;
  }
  return `${promo.percent}% dcto.`;
}
