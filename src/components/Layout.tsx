import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

export const Layout = () => (
  <>
    <Navbar />
    <main className="flex-1 py-6 px-6 max-w-[1400px] mx-auto w-full">
      <Outlet />
    </main>
    <Footer />
  </>
);
