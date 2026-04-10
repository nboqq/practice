import { BrowserRouter, Routes, Route } from "react-router";
import { CartProvider } from "./context/CartContext";
import { Header } from "./components/Header";
import { HeroCarousel } from "./components/HeroCarousel";
import { Products } from "./components/Products";
import { AboutUs } from "./components/AboutUs";
import { Footer } from "./components/Footer";
import { Cart } from "./pages/Cart";

function HomePage() {
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

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}
