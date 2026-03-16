/**
 * Tipos alineados con los DTOs del backend (checkout-retail).
 */

export interface PromotionSummaryDto {
  type: string;
  description: string;
}

export interface ProductCatalogEntryDto {
  sku: string;
  name: string;
  price: number | string;
  promotions: PromotionSummaryDto[];
}

export interface CartItemRequest {
  sku: string;
  quantity: number;
}

export interface ShippingAddressRequest {
  street: string;
  city: string;
  zoneId: string;
}

export interface CartCheckoutRequest {
  cartId: string;
  items: CartItemRequest[];
  shippingAddress: ShippingAddressRequest;
  paymentMethod: string;
}

export interface DiscountAppliedDto {
  type: string;
  description: string;
  amount: number;
  sku?: string;
}

export interface PaymentConfirmationDto {
  paymentConfirmed: boolean;
  transactionId: string;
}

export interface CheckoutResponse {
  cartId: string;
  subtotal: number;
  discounts: DiscountAppliedDto[];
  total: number;
  payment: PaymentConfirmationDto;
}

export type CartItem = CartItemRequest;
