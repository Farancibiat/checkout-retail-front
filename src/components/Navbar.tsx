import { Link } from 'react-router-dom';
import { useCart } from '../context/useCart';

const CartIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

export const Navbar = () => {
  const { itemCount } = useCart();

  return (
    <nav className="flex items-center justify-between py-3 px-6 bg-walmart-bentonville-blue text-walmart-white">
      <Link to="/" className="font-bold text-xl text-walmart-white no-underline hover:text-walmart-spark-yellow">
        Walmart
      </Link>
      <div className="flex items-center gap-6">
        <Link to="/" className="text-walmart-white no-underline font-medium hover:text-walmart-spark-yellow">
          Inicio
        </Link>
        <Link
          to="/cart"
          className="group text-walmart-white no-underline font-medium p-1 hover:text-walmart-spark-yellow"
          aria-label={`Carrito${itemCount > 0 ? `, ${itemCount} ítems` : ''}`}
        >
          <span className="relative inline-block w-7 h-7">
            <CartIcon className="w-full h-full text-walmart-spark-yellow group-hover:text-walmart-white" />
            {itemCount > 0 && (
              <span
                className="absolute -right-1.5 -bottom-1.5 min-w-[18px] h-[18px] px-1 bg-walmart-spark-yellow text-walmart-bentonville-blue text-[0.7rem] font-bold rounded-full inline-flex items-center justify-center leading-none"
                aria-label={`${itemCount} ítems`}
              >
                {itemCount}
              </span>
            )}
          </span>
        </Link>
      </div>
    </nav>
  );
};
