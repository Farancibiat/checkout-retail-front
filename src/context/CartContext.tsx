import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { CartItem, ProductCatalogEntryDto } from '../types/api';

interface CartContextValue {
  items: CartItem[];
  addItem: (sku: string, quantity?: number) => void;
  removeItem: (sku: string) => void;
  updateQuantity: (sku: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  getSubtotal: (products: ProductCatalogEntryDto[]) => number;
}

export const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((sku: string, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.sku === sku);
      if (existing) {
        return prev.map((i) =>
          i.sku === sku ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { sku, quantity }];
    });
  }, []);

  const removeItem = useCallback((sku: string) => {
    setItems((prev) => prev.filter((i) => i.sku !== sku));
  }, []);

  const updateQuantity = useCallback((sku: string, quantity: number) => {
    if (quantity < 1) {
      setItems((prev) => prev.filter((i) => i.sku !== sku));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.sku === sku ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = useMemo(
    () => items.reduce((acc, i) => acc + i.quantity, 0),
    [items]
  );

  const getSubtotal = useCallback(
    (products: ProductCatalogEntryDto[]) => {
      const price = (p: ProductCatalogEntryDto) =>
        typeof p.price === 'string' ? parseFloat(p.price) : p.price;
      const bySku = new Map(products.map((p) => [p.sku, p]));
      return items.reduce((acc, item) => {
        const product = bySku.get(item.sku);
        if (!product) return acc;
        return acc + price(product) * item.quantity;
      }, 0);
    },
    [items]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      itemCount,
      getSubtotal,
    }),
    [items, addItem, removeItem, updateQuantity, clearCart, itemCount, getSubtotal]
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
};
