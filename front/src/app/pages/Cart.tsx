import { Link } from "react-router";
import { ArrowLeft, Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useState } from "react";

export function Cart() {
  const { items, removeItem, updateQty, clearCart, total, count, user, isLoggedIn, topupBalance } = useCart();
  const { ref, style } = useScrollReveal();
  const [showTopupModal, setShowTopupModal] = useState(false);
  const [topupAmount, setTopupAmount] = useState("1000");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTopup = async () => {
    try {
      setError("");
      setLoading(true);
      const amount = parseFloat(topupAmount);
      if (amount <= 0) {
        setError("Сумма должна быть больше 0");
        return;
      }
      await topupBalance(amount);
      setShowTopupModal(false);
      setTopupAmount("1000");
    } catch (err: any) {
      setError(err.message || "Ошибка при пополнении баланса");
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ backgroundColor: "#DAD7CD" }}>
        <div className="text-center">
          <h1
            className="mb-3"
            style={{
              color: "#3A5A40",
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 700,
            }}
          >
            Пожалуйста, войдите
          </h1>
          <p className="mb-8" style={{ color: "#588157", fontFamily: "'Lato', sans-serif", fontSize: "1.1rem" }}>
            Для доступа к корзине необходимо авторизоваться
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
            На главную
          </Link>
        </div>
      </div>
    );
  }

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
                  onClick={() => updateQty(item.productId, item.qty - 1)}
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
                  onClick={() => updateQty(item.productId, item.qty + 1)}
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
                onClick={() => removeItem(item.productId)}
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
          {/* User Balance */}
          {user && (
            <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: "#588157" }}>
              <div className="flex items-center justify-between">
                <span style={{ color: "#DAD7CD", fontFamily: "'Lato', sans-serif" }}>
                  Ваш баланс:
                </span>
                <span
                  className="text-lg font-bold"
                  style={{ color: "#DAD7CD", fontFamily: "'Playfair Display', serif" }}
                >
                  ₽{user.balance.toFixed(2)}
                </span>
              </div>
              <button
                onClick={() => setShowTopupModal(true)}
                className="w-full mt-3 py-2 rounded-full text-sm transition-all duration-300 hover:scale-[1.02]"
                style={{
                  backgroundColor: "#3A5A40",
                  color: "#DAD7CD",
                  fontFamily: "'Lato', sans-serif",
                  fontWeight: 700,
                }}
              >
                Пополнить баланс
              </button>
            </div>
          )}

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

      {/* Topup Modal */}
      {showTopupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-96 p-6 relative">
            <button 
              onClick={() => setShowTopupModal(false)} 
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <h2
              className="text-xl font-bold mb-4"
              style={{ color: "#3A5A40", fontFamily: "'Playfair Display', serif" }}
            >
              Пополнение баланса
            </h2>

            {error && <div className="mb-3 p-2 bg-red-100 text-red-700 rounded text-sm">{error}</div>}

            <div className="mb-4">
              <label
                className="block text-sm mb-2"
                style={{ color: "#588157", fontFamily: "'Lato', sans-serif" }}
              >
                Выберите сумму:
              </label>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {["500", "1000", "2000", "5000", "10000"].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setTopupAmount(amount)}
                    className="py-2 rounded border-2 transition-all duration-200"
                    style={{
                      borderColor: topupAmount === amount ? "#588157" : "#ccc",
                      backgroundColor: topupAmount === amount ? "#588157" : "transparent",
                      color: topupAmount === amount ? "#DAD7CD" : "#3A5A40",
                      fontWeight: topupAmount === amount ? "bold" : "normal",
                    }}
                  >
                    ₽{amount}
                  </button>
                ))}
              </div>
              <div>
                <label
                  className="block text-sm mb-2"
                  style={{ color: "#588157", fontFamily: "'Lato', sans-serif" }}
                >
                  Или введите свою сумму:
                </label>
                <input
                  type="number"
                  min="1"
                  value={topupAmount}
                  onChange={(e) => setTopupAmount(e.target.value)}
                  className="w-full border-2 px-3 py-2 rounded"
                  style={{ borderColor: "#588157" }}
                  placeholder="Введите сумму"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowTopupModal(false)}
                className="flex-1 py-2 rounded-lg border-2 transition-all duration-200"
                style={{ borderColor: "#588157", color: "#588157" }}
              >
                Отмена
              </button>
              <button
                onClick={handleTopup}
                disabled={loading}
                className="flex-1 py-2 rounded-lg text-white transition-all duration-200 disabled:opacity-50"
                style={{ backgroundColor: "#588157" }}
              >
                {loading ? "Загрузка..." : `Пополнить на ₽${topupAmount}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
