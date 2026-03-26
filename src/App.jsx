import Navbar from './components/NavBar';
import Hero from './components/Hero';
import TrendingProducts from './components/TrendingProducts';
import NewCollection from './components/NewCollection';
import NewArrivals from './components/NewArrivals';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function App() {
  return (
    <div className="font-sans">
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
  );
}

export default App;

