import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { CartPage } from './pages/CartPage';

const App = () => (
  <BrowserRouter>
    <CartProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="cart" element={<CartPage />} />
        </Route>
      </Routes>
    </CartProvider>
  </BrowserRouter>
);

export default App;
