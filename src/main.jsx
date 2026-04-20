import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';
import Hero from './components/Hero';
import TrendingProducts from './components/TrendingProducts';
import NewCollection from './components/NewCollection';
import NewArrivals from './components/NewArrivals';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import AllProducts from './pages/AllProducts';
import Cart from './pages/Cart';
import Favorites from './pages/Favorites';
import { ShopProvider } from './context/ShopContext';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import { AuthProvider } from './context/AuthContext';
import AuthModal from './components/AuthModal';
import PageWrapper from './components/PageWrapper';
import FloatingButtons from './components/FloatingButtons';
import HomeProductDetail from './pages/HomeProductDetail';
import LoadingScreen from './components/LoadingScreen';
import SummerSpring from './components/summer&spring';
import MenProducts from './pages/MenProducts';
import WomenProducts from './pages/WomenProducts';

// eslint-disable-next-line react-refresh/only-export-components
const App = () => {
  const [authOpen, setAuthOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <React.StrictMode>
      <AuthProvider>
        <ShopProvider>
          {/* Loading Screen */}
          <LoadingScreen onDone={() => setLoading(false)} />

          {/* Main App */}
          <div
            className="transition-opacity duration-500"
            style={{ opacity: loading ? 0 : 1 }}
          >
            <BrowserRouter>
              <Navbar onAuthOpen={() => setAuthOpen(true)} />
              <Routes>
                <Route path="/" element={
                  <PageWrapper>
                    <>
                      <Hero />
                      <TrendingProducts />
                      <SummerSpring />
                      <NewArrivals />
                      <Testimonials />
                    </>
                  </PageWrapper>
                } />
                <Route path="/all-products" element={<PageWrapper><AllProducts /></PageWrapper>} />
                <Route path="/cart" element={<PageWrapper><Cart /></PageWrapper>} />
                <Route path="/favorites" element={<PageWrapper><Favorites /></PageWrapper>} />
                <Route path="/product/:id" element={<PageWrapper><ProductDetail /></PageWrapper>} />
                <Route path="/checkout" element={<PageWrapper><Checkout /></PageWrapper>} />
                <Route path="/home-product/:id" element={<PageWrapper><HomeProductDetail /></PageWrapper>} />
                <Route path="/men" element={<PageWrapper><MenProducts /></PageWrapper>} />
                <Route path="/women" element={<PageWrapper><WomenProducts /></PageWrapper>} />
              </Routes>
              <Footer />
              <FloatingButtons />
              <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
            </BrowserRouter>
          </div>
        </ShopProvider>
      </AuthProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
