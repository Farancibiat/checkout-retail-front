import { Link } from 'react-router-dom';
import type { CheckoutResponse } from '../types/api';

interface ReceiptViewProps {
  result: CheckoutResponse;
  onClose: () => void;
}

const formatPrice = (n: number): string =>
  new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);

export const ReceiptView = ({ result, onClose }: ReceiptViewProps) => (
  <div className="w-full max-w-[520px] mx-auto p-6">
    <div className="bg-walmart-white border-2 border-walmart-true-blue rounded-xl p-8 shadow-receipt">
      <h1 className="m-0 mb-2 text-2xl text-walmart-bentonville-blue">
        Boleta de compra
      </h1>
      <p className="m-0 mb-6 text-sm text-[#666]">Carrito: {result.cartId}</p>

      <section className="mb-6">
        <h2 className="m-0 mb-3 text-[1.1rem] text-walmart-bentonville-blue">
          Resumen
        </h2>
        <div className="flex justify-between py-1.5">
          <span>Subtotal</span>
          <span>{formatPrice(result.subtotal)}</span>
        </div>
        {result.discounts.length > 0 && (
          <>
            <h3 className="mt-3 mb-1.5 text-[0.95rem] text-[#555]">
              Descuentos
            </h3>
            <ul className="list-none p-0 m-0">
              {result.discounts.map((d, i) => (
                <li key={i} className="flex justify-between py-1 text-sm">
                  <span className="text-[#555]">{d.description}</span>
                  <span className="text-[#0a0]">−{formatPrice(d.amount)}</span>
                </li>
              ))}
            </ul>
          </>
        )}
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
