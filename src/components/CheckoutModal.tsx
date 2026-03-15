import { useState } from 'react';
import { postCheckout } from '../api/client';
import { CHILEAN_REGIONS } from '../data/chileanRegions';
import type {
  CartCheckoutRequest,
  CartItem,
  CheckoutResponse,
} from '../types/api';

interface CheckoutModalProps {
  cartId: string;
  items: CartItem[];
  onSuccess: (result: CheckoutResponse) => void;
  onCancel: () => void;
}

export const CheckoutModal = ({
  cartId,
  items,
  onSuccess,
  onCancel,
}: CheckoutModalProps) => {
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [zoneId, setZoneId] = useState(CHILEAN_REGIONS[0].value);
  const [paymentMethod, setPaymentMethod] = useState('DEBIT');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const request: CartCheckoutRequest = {
      cartId,
      items,
      shippingAddress: { street, city, zoneId },
      paymentMethod,
    };

    postCheckout(request)
      .then(onSuccess)
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Error al procesar');
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div
      className="fixed inset-0 bg-[rgba(0,48,135,0.4)] flex items-center justify-center z-1000 p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-walmart-white rounded-xl p-6 max-w-[420px] w-full shadow-modal">
        <h2 className="m-0 mb-5 text-[1.35rem] text-walmart-bentonville-blue">
          Completar compra
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <fieldset className="border border-walmart-secondary-blue rounded-lg p-4 m-0">
            <legend className="px-2 font-semibold text-walmart-bentonville-blue">
              Dirección de envío
            </legend>
            <label className="flex flex-col gap-1 mt-0 text-sm text-[#333] first:mt-0">
              Calle y número
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                required
                placeholder="Av. Falsa 123"
                className="py-2 px-2 border border-[#ccc] rounded"
              />
            </label>
            <label className="flex flex-col gap-1 mt-3 text-sm text-[#333]">
              Ciudad
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                placeholder="Ciudad"
                className="py-2 px-2 border border-[#ccc] rounded"
              />
            </label>
            <label className="flex flex-col gap-1 mt-3 text-sm text-[#333]">
              Región
              <select
                value={zoneId}
                onChange={(e) => setZoneId(e.target.value)}
                required
                className="py-2 px-2 border border-[#ccc] rounded"
              >
                {CHILEAN_REGIONS.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </label>
          </fieldset>
          <fieldset className="border border-walmart-secondary-blue rounded-lg p-4 m-0">
            <legend className="px-2 font-semibold text-walmart-bentonville-blue">
              Medio de pago
            </legend>
            <label className="flex flex-col gap-1 mt-0 text-sm text-[#333]">
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="py-2 px-2 border border-[#ccc] rounded"
              >
                <option value="DEBITO">Débito</option>
              </select>
            </label>
          </fieldset>
          {error && (
            <p className="m-0 text-[#c00] text-sm">{error}</p>
          )}
          <div className="flex gap-3 justify-end mt-2">
            <button
              type="button"
              className="py-2 px-4 rounded-md font-semibold border-none bg-walmart-white text-walmart-true-blue border-2 border-walmart-true-blue hover:bg-walmart-secondary-blue hover:text-walmart-white hover:border-walmart-secondary-blue disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={onCancel}
              disabled={submitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="py-2 px-4 rounded-md font-semibold border-none bg-walmart-spark-yellow text-walmart-bentonville-blue hover:bg-yellow-hover disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={submitting}
            >
              {submitting ? 'Procesando...' : 'Confirmar compra'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
