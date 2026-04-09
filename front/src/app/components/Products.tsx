import { useState } from "react";
import { ShoppingCart, Heart } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const products = [
  {
    id: 1,
    name: "Красные розы",
    description: "Классический букет из 11 бархатистых красных роз",
    price: "2 490 ₽",
    image:
      "https://images.unsplash.com/photo-1730749387748-79e6d50a269c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb3NlJTIwYm91cXVldCUyMHJlZCUyMGZsb3dlcnMlMjBnaWZ0fGVufDF8fHx8MTc3NTUwMjkyM3ww&ixlib=rb-4.1.0&q=80&w=400",
    tag: "Хит",
  },
  {
    id: 2,
    name: "Пионы",
    description: "Нежный букет из свежих розовых пионов",
    price: "3 200 ₽",
    image:
      "https://images.unsplash.com/photo-1581279073686-b450423d8b7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW9ueSUyMHBpbmslMjBmbG93ZXIlMjBib3VxdWV0JTIwd2VkZGluZ3xlbnwxfHx8fDE3NzU1MDI5Mjd8MA&ixlib=rb-4.1.0&q=80&w=400",
    tag: "Новинка",
  },
  {
    id: 3,
    name: "Орхидея белая",
    description: "Элегантная орхидея в декоративном горшке",
    price: "1 890 ₽",
    image:
      "https://images.unsplash.com/photo-1548014251-6c4f4b6055d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmNoaWQlMjB3aGl0ZSUyMGVsZWdhbnQlMjBmbG93ZXIlMjBwb3R8ZW58MXx8fHwxNzc1NTAyOTI0fDA&ixlib=rb-4.1.0&q=80&w=400",
    tag: "",
  },
  {
    id: 4,
    name: "Лаванда Прованс",
    description: "Ароматный букет из свежесрезанной лаванды",
    price: "1 350 ₽",
    image:
      "https://images.unsplash.com/photo-1719264493104-62c8f920e6b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXZlbmRlciUyMHB1cnBsZSUyMGZsb3dlciUyMGZpZWxkfGVufDF8fHx8MTc3NTUwMjkyNHww&ixlib=rb-4.1.0&q=80&w=400",
    tag: "",
  },
  {
    id: 5,
    name: "Суккулент микс",
    description: "Набор из 5 суккулентов в керамических горшках",
    price: "990 ₽",
    image:
      "https://images.unsplash.com/photo-1763784436630-629fd9a4e0e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWNjdWxlbnQlMjBjYWN0dXMlMjBwb3R0ZWQlMjBwbGFudHxlbnwxfHx8fDE3NzU1MDI5MjN8MA&ixlib=rb-4.1.0&q=80&w=400",
    tag: "Акция",
  },
  {
    id: 6,
    name: "Монстера",
    description: "Крупнолистная монстера — украшение любого интерьера",
    price: "2 100 ₽",
    image:
      "https://images.unsplash.com/photo-1711039131661-b1e336cdda75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25zdGVyYSUyMGxlYWYlMjBncmVlbiUyMGhvdXNlcGxhbnR8ZW58MXx8fHwxNzc1NTAyOTI3fDA&ixlib=rb-4.1.0&q=80&w=400",
    tag: "",
  },
];

const tagColors: Record<string, { bg: string; color: string }> = {
  Хит: { bg: "#588157", color: "#DAD7CD" },
  Новинка: { bg: "#3A5A40", color: "#DAD7CD" },
  Акция: { bg: "#A3B18A", color: "#3A5A40" },
};

export function Products() {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [added, setAdded] = useState<number[]>([]);

  const toggleWish = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleAdd = (id: number) => {
    setAdded((prev) => [...prev, id]);
    setTimeout(() => setAdded((prev) => prev.filter((x) => x !== id)), 1500);
  };

  const { ref, style } = useScrollReveal();

  return (
    <section
      ref={ref}
      id="products"
      className="py-20 px-6"
      style={{ backgroundColor: "#DAD7CD", ...style }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-14">
          <span
            className="text-sm tracking-widest uppercase"
            style={{ color: "#588157", fontFamily: "'Lato', sans-serif" }}
          >
            Наш ассортимент
          </span>
          <h2
            className="mt-2"
            style={{
              color: "#3A5A40",
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 700,
              lineHeight: 1.3,
            }}
          >
            Популярные товары
          </h2>
          <div
            className="mx-auto mt-4 rounded-full"
            style={{ width: 64, height: 3, backgroundColor: "#A3B18A" }}
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group rounded-2xl overflow-hidden flex flex-col"
              style={{
                backgroundColor: "#fff",
                boxShadow: "0 4px 24px rgba(58,90,64,0.1)",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 12px 32px rgba(58,90,64,0.18)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 4px 24px rgba(58,90,64,0.1)";
              }}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ height: 260 }}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Tag */}
                {product.tag && (
                  <span
                    className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs"
                    style={{
                      backgroundColor: tagColors[product.tag]?.bg,
                      color: tagColors[product.tag]?.color,
                      fontFamily: "'Lato', sans-serif",
                      fontWeight: 700,
                    }}
                  >
                    {product.tag}
                  </span>
                )}
                {/* Wishlist */}
                <button
                  onClick={() => toggleWish(product.id)}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.85)",
                  }}
                  aria-label="В избранное"
                >
                  <Heart
                    className="w-5 h-5"
                    style={{
                      color: wishlist.includes(product.id) ? "#588157" : "#A3B18A",
                      fill: wishlist.includes(product.id) ? "#588157" : "none",
                    }}
                  />
                </button>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3
                  className="mb-1"
                  style={{
                    color: "#3A5A40",
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.15rem",
                    fontWeight: 600,
                  }}
                >
                  {product.name}
                </h3>
                <p
                  className="text-sm flex-1"
                  style={{ color: "#588157", fontFamily: "'Lato', sans-serif", lineHeight: 1.6 }}
                >
                  {product.description}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span
                    style={{
                      color: "#3A5A40",
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.25rem",
                      fontWeight: 700,
                    }}
                  >
                    {product.price}
                  </span>
                  <button
                    onClick={() => handleAdd(product.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-200 hover:scale-105 active:scale-95"
                    style={{
                      backgroundColor: added.includes(product.id) ? "#A3B18A" : "#588157",
                      color: "#DAD7CD",
                      fontFamily: "'Lato', sans-serif",
                      fontWeight: 700,
                    }}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {added.includes(product.id) ? "Добавлено" : "В корзину"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all button */}
        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-block px-10 py-3 rounded-full text-sm tracking-wide transition-all duration-300 hover:scale-105"
            style={{
              border: "2px solid #3A5A40",
              color: "#3A5A40",
              fontFamily: "'Lato', sans-serif",
              fontWeight: 700,
            }}
          >
            Весь каталог
          </a>
        </div>
      </div>
    </section>
  );
}
