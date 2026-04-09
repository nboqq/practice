import { Header } from "./components/Header";
import { HeroCarousel } from "./components/HeroCarousel";
import { Products } from "./components/Products";
import { AboutUs } from "./components/AboutUs";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#DAD7CD" }}>
      <Header />
      <HeroCarousel />
      <Products />
      <AboutUs />
      <Footer />
    </div>
  );
}
