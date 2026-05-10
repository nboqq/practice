import { Link } from "react-router";
import { ArrowLeft, Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useScrollReveal } from "../hooks/useScrollReveal";

export function Cart() {
  const { items, removeItem, updateQty, clearCart, total, count } = useCart();
  const { ref, style } = useScrollReveal();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ backgroundColor: "#DAD7CD" }}>
        <div className="text-center" style={{ ...style, opacity: 1, transform: "translateY(0)" }}>
          <ShoppingBag className="w-20 h-20 mx-auto mb-6" style={{ color: "#A3B18A" }} />
          <h1
            className="mb-3"
            style={{
              color: "#3A5A40",
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 700,
            }}
          >
            Корзина пуста
          </h1>
          <p className="mb-8" style={{ color: "#588157", fontFamily: "'Lato', sans-serif", fontSize: "1.1rem" }}>
            Добавьте товары из каталога, чтобы оформить заказ
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm tracking-wide transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: "#588157",
              color: "#DAD7CD",
              fontFamily: "'Lato', sans-serif",
              fontWeight: 700,
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            Перейти в каталог
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-6" style={{ backgroundColor: "#DAD7CD" }}>
      <div className="max-w-5xl mx-auto" ref={ref} style={style}>
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <Link
            to="/"
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 hover:scale-110"
            style={{ backgroundColor: "#588157", color: "#DAD7CD" }}
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1
              style={{
                color: "#3A5A40",
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                fontWeight: 700,
              }}
            >
              Корзина
            </h1>
            <p className="text-sm" style={{ color: "#588157", fontFamily: "'Lato', sans-serif" }}>
              {count} {count === 1 ? "товар" : count < 5 ? "товара" : "товаров"}
            </p>
          </div>
          <button
            onClick={clearCart}
            className="ml-auto text-sm px-4 py-2 rounded-full transition-all duration-200 hover:opacity-70"
            style={{ backgroundColor: "#588157", color: "#DAD7CD" }}
          >
            Очистить
          </button>
        </div>

        {/* Items list */}
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-2xl"
              style={{ backgroundColor: "#fff", boxShadow: "0 4px 24px rgba(58,90,64,0.1)" }}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-full sm:w-24 h-32 sm:h-24 object-cover rounded-xl flex-shrink-0"
              />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3
                  className="truncate"
                  style={{
                    color: "#3A5A40",
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                  }}
                >
                  {item.name}
                </h3>
                <p
                  className="text-sm mt-1 truncate"
                  style={{ color: "#588157", fontFamily: "'Lato', sans-serif" }}
                >
                  {item.description}
                </p>
                <p
                  className="mt-1 text-sm font-semibold"
                  style={{ color: "#3A5A40", fontFamily: "'Playfair Display', serif" }}
                >
                  {item.price} / шт.
                </p>
              </div>

              {/* Qty controls */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  onClick={() => updateQty(item.id, item.qty - 1)}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ backgroundColor: "#E8F0E8", color: "#3A5A40" }}
                  aria-label="Уменьшить количество"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span
                  className="w-8 text-center text-sm font-semibold"
                  style={{ color: "#3A5A40", fontFamily: "'Lato', sans-serif" }}
                >
                  {item.qty}
                </span>
                <button
                  onClick={() => updateQty(item.id, item.qty + 1)}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ backgroundColor: "#E8F0E8", color: "#3A5A40" }}
                  aria-label="Увеличить количество"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Subtotal */}
              <div className="text-right flex-shrink-0">
                <p
                  className="font-bold"
                  style={{
                    color: "#3A5A40",
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.15rem",
                  }}
                >
                  {(item.priceNum * item.qty).toLocaleString("ru-RU")} ₽
                </p>
              </div>

              {/* Remove */}
              <button
                onClick={() => removeItem(item.id)}
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 hover:scale-110"
                style={{ backgroundColor: "rgba(163,177,138,0.2)", color: "#A3B18A" }}
                aria-label="Удалить товар"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Total + Checkout */}
        <div
          className="mt-10 p-6 rounded-2xl"
          style={{ backgroundColor: "#3A5A40" }}
        >
          <div className="flex items-center justify-between mb-6">
            <span
              className="text-lg"
              style={{ color: "#A3B18A", fontFamily: "'Lato', sans-serif" }}
            >
              Итого:
            </span>
            <span
              className="text-2xl font-bold"
              style={{ color: "#DAD7CD", fontFamily: "'Playfair Display', serif" }}
            >
              {total.toLocaleString("ru-RU")} ₽
            </span>
          </div>
          <button
            className="w-full py-4 rounded-full text-base tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              backgroundColor: "#588157",
              color: "#DAD7CD",
              fontFamily: "'Lato', sans-serif",
              fontWeight: 700,
              letterSpacing: "0.05em",
            }}
          >
            Оформить заказ
          </button>
          <Link
            to="/"
            className="block text-center mt-4 text-sm transition-colors duration-200 hover:opacity-70"
            style={{ color: "#A3B18A", fontFamily: "'Lato', sans-serif" }}
          >
            ← Продолжить покупки
          </Link>
        </div>
      </div>
    </div>
  );
}
