import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Navbar from './components/NavBar';
import Hero from './components/Hero';
import TrendingProducts from './components/TrendingProducts';
import NewCollection from './components/NewCollection';
import NewArrivals from './components/NewArrivals';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <>
      <Navbar />
      <Hero />
      <TrendingProducts />
      <NewCollection />
      <NewArrivals />
      <Testimonials />
      <Footer />
    </>
  </React.StrictMode>
);