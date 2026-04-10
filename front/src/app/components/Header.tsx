import { useState } from "react";
import { Menu, X, Leaf, ShoppingCart } from "lucide-react";
import { Link } from "react-router";
import { useCart } from "../context/CartContext";

const navLinks = [
  { label: "О нас", href: "#about" },
  { label: "Доставка и самовывоз", href: "#delivery" },
  { label: "Статьи", href: "#articles" },
  { label: "Контакты", href: "#contacts" },
  { label: "График работы", href: "#schedule" },
];

const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault();
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useCart();

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{ backgroundColor: "#3A5A40", fontFamily: "'Lato', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo + Name */}
        <a href="#" onClick={scrollToTop} className="flex items-center gap-3 group">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "#588157" }}
          >
            <Leaf className="w-5 h-5" style={{ color: "#DAD7CD" }} />
          </div>
          <span
            className="text-xl tracking-wide"
            style={{
              color: "#DAD7CD",
              fontFamily: "'Playfair Display', serif",
              fontWeight: 600,
            }}
          >
            Зелёный Лепесток
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm transition-colors duration-200 hover:opacity-70"
              style={{ color: "#A3B18A" }}
            >
              {link.label}
            </a>
          ))}

          {/* Cart icon */}
          <Link
            to="/cart"
            className="relative flex items-center justify-center transition-colors duration-200 hover:opacity-70"
            style={{ color: "#A3B18A" }}
          >
            <ShoppingCart className="w-5 h-5" />
            {count > 0 && (
              <span
                className="absolute -top-2 -right-3 flex items-center justify-center rounded-full text-xs font-bold"
                style={{
                  backgroundColor: "#DAD7CD",
                  color: "#3A5A40",
                  width: 18,
                  height: 18,
                }}
              >
                {count}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile: cart + hamburger */}
        <div className="lg:hidden flex items-center gap-3">
          <Link
            to="/cart"
            className="relative flex items-center justify-center"
            style={{ color: "#DAD7CD" }}
          >
            <ShoppingCart className="w-5 h-5" />
            {count > 0 && (
              <span
                className="absolute -top-2 -right-3 flex items-center justify-center rounded-full text-xs font-bold"
                style={{
                  backgroundColor: "#DAD7CD",
                  color: "#3A5A40",
                  width: 18,
                  height: 18,
                }}
              >
                {count}
              </span>
            )}
          </Link>
          <button
            className="p-2 rounded-md transition"
            style={{ color: "#DAD7CD" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="lg:hidden px-6 pb-5 flex flex-col gap-4"
          style={{ backgroundColor: "#3A5A40" }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm py-1 border-b transition-colors duration-200 hover:opacity-70"
              style={{ color: "#A3B18A", borderColor: "#588157" }}
              onClick={(e) => {
                handleNavClick(e, link.href);
                setMenuOpen(false);
              }}
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/cart"
            className="text-sm py-1 border-b transition-colors duration-200 hover:opacity-70 flex items-center gap-2"
            style={{ color: "#A3B18A", borderColor: "#588157" }}
            onClick={() => setMenuOpen(false)}
          >
            <ShoppingCart className="w-4 h-4" />
            Корзина ({count})
          </Link>
        </div>
      )}
    </header>
  );
}
