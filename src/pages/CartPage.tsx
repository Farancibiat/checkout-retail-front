import { useEffect, useState } from 'react';
import { getProducts } from '../api/client';
import {
  fetchProductImageUrls,
  getImageUrlForIndex,
} from '../api/productImages';
import { useCart } from '../context/useCart';
import { Cart } from '../components/Cart';
import { CartSidebar } from '../components/CartSidebar';
import { CheckoutModal } from '../components/CheckoutModal';
import { ReceiptView } from '../components/ReceiptView';
import type {
  CartItem,
  CheckoutResponse,
  ProductCatalogEntryDto,
} from '../types/api';

const CART_ID = 'cart-retail-1';

export const CartPage = () => {
  const { items, updateQuantity, removeItem, getSubtotal, clearCart } =
    useCart();
  const [products, setProducts] = useState<ProductCatalogEntryDto[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [checkoutResult, setCheckoutResult] =
    useState<CheckoutResponse | null>(null);
  const [receiptItems, setReceiptItems] = useState<CartItem[]>([]);
  const [receiptProducts, setReceiptProducts] = useState<
    ProductCatalogEntryDto[]
  >([]);

  useEffect(() => {
    let cancelled = false;
    Promise.all([getProducts(), fetchProductImageUrls()])
      .then(([prods, urls]) => {
        if (!cancelled) {
          setProducts(prods);
          setImageUrls(urls);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const subtotal = getSubtotal(products);

  const handleCheckoutSuccess = (result: CheckoutResponse) => {
    setReceiptItems([...items]);
    setReceiptProducts([...products]);
    setCheckoutResult(result);
    setModalOpen(false);
    clearCart();
  };

  const handleCloseReceipt = () => {
    setCheckoutResult(null);
    setReceiptItems([]);
    setReceiptProducts([]);
  };

  if (loading) {
    return (
      <div className="w-full text-center py-8 text-walmart-bentonville-blue">
        <p>Cargando...</p>
      </div>
    );
  }

  if (checkoutResult) {
    return (
      <ReceiptView
        result={checkoutResult}
        purchasedItems={receiptItems}
        products={receiptProducts}
        onClose={handleCloseReceipt}
      />
    );
  }

  return (
    <div className="w-full">
      <h1 className="m-0 mb-6 text-[1.75rem] text-walmart-bentonville-blue">
        Carrito
      </h1>
      <div className="flex gap-8 items-start flex-wrap">
        <div className="flex-1 min-w-[280px]">
          <Cart
            items={items}
            products={products}
            getImageUrl={(idx) => getImageUrlForIndex(imageUrls, idx)}
            onUpdateQuantity={updateQuantity}
            onRemove={removeItem}
            subtotal={subtotal}
          />
          {items.length > 0 && (
            <button
              type="button"
              className="mt-4 py-3 px-6 bg-walmart-spark-yellow text-walmart-bentonville-blue border-none rounded-lg font-bold text-base hover:bg-yellow-hover"
              onClick={() => setModalOpen(true)}
            >
              Comprar
            </button>
          )}
        </div>
        {items.length > 0 && (
          <CartSidebar
            items={items}
            products={products}
            subtotal={subtotal}
          />
        )}
      </div>
      {modalOpen && (
        <CheckoutModal
          cartId={CART_ID}
          items={items}
          onSuccess={handleCheckoutSuccess}
          onCancel={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};
