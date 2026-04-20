import { useState } from 'react';
import Navbar from './components/NavBar';
import Hero from './components/Hero';
import TrendingProducts from './components/TrendingProducts';
import NewCollection from './components/NewCollection';
import NewArrivals from './components/NewArrivals';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <LoadingScreen onDone={() => setLoading(false)} />

      {/* Main app fades in after loading */}
      <div
        className="font-sans transition-opacity duration-500"
        style={{ opacity: loading ? 0 : 1 }}
      >
        <Navbar />
        <main>
          <Hero />
          <TrendingProducts />
          <NewCollection />
          <NewArrivals />
          <Testimonials />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
