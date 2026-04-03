import React from 'react';
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


ReactDOM.createRoot(document.getElementById('root')).render(
  <ShopProvider>
    <BrowserRouter>
      <React.StrictMode>
        <>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <TrendingProducts />
                  <NewCollection />
                  <NewArrivals />
                  <Testimonials />
                </>
              }
            />
            <Route path="/all-products" element={<AllProducts />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
          <Footer />
        </>
      </React.StrictMode>
    </BrowserRouter>
  </ShopProvider>
);