import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import cvetiImg from "@/img/cveti.png";

const scrollToProducts = () => {
  const el = document.getElementById("products");
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

const slides = [
  {
    id: 1,
    image: cvetiImg,
    title: "Букеты для особых моментов",
    subtitle: "Изысканные цветочные композиции ручной работы",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1588174829800-aaddd659be9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG9yYWwlMjBnYXJkZW4lMjBzcHJpbmclMjBjb2xvcmZ1bCUyMGZsb3dlcnN8ZW58MXx8fHwxNzc1NTAyOTE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Весенняя коллекция",
    subtitle: "Свежие цветы, наполненные ароматом весны",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1552160793-cbaf3ebcba72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5mbG93ZXIlMjBicmlnaHQlMjB5ZWxsb3clMjBzdW1tZXIlMjBmaWVsZHxlbnwxfHx8fDE3NzU1MDI5Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Подсолнухи — символ радости",
    subtitle: "Яркие букеты, которые поднимают настроение",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1605036017401-a119c069c319?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMHBsYW50cyUyMGluZG9vciUyMHRyb3BpY2FsfGVufDF8fHx8MTc3NTUwMjkxOXww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Комнатные растения",
    subtitle: "Зелень, которая оживит ваш дом или офис",
  },
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (transitioning) return;
      setTransitioning(true);
      setTimeout(() => {
        setCurrent((index + slides.length) % slides.length);
        setTransitioning(false);
      }, 400);
    },
    [transitioning]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative w-full overflow-hidden" style={{ height: "92vh", minHeight: 480 }}>
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: index === current ? 1 : 0, zIndex: index === current ? 1 : 0 }}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(58,90,64,0.35) 0%, rgba(58,90,64,0.6) 100%)" }}
          />
          {/* Text */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
            style={{ zIndex: 2 }}
          >
            <span
              className="inline-block px-4 py-1 rounded-full text-sm mb-5 tracking-widest uppercase"
              style={{
                backgroundColor: "rgba(88,129,87,0.7)",
                color: "#DAD7CD",
                fontFamily: "'Lato', sans-serif",
              }}
            >
              Цветочный магазин
            </span>
            <h1
              className="mb-4 max-w-3xl"
              style={{
                color: "#DAD7CD",
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 700,
                lineHeight: 1.2,
                textShadow: "0 2px 12px rgba(0,0,0,0.3)",
              }}
            >
              {slide.title}
            </h1>
            <p
              className="max-w-xl"
              style={{
                color: "#A3B18A",
                fontFamily: "'Lato', sans-serif",
                fontSize: "clamp(1rem, 2vw, 1.25rem)",
                textShadow: "0 1px 6px rgba(0,0,0,0.3)",
              }}
            >
              {slide.subtitle}
            </p>
            <button
              onClick={scrollToProducts}
              className="mt-8 px-8 py-3 rounded-full text-sm tracking-wide transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: "#588157",
                color: "#DAD7CD",
                fontFamily: "'Lato', sans-serif",
                fontWeight: 700,
                letterSpacing: "0.08em",
              }}
            >
              Смотреть каталог
            </button>
          </div>
        </div>
      ))}

      {/* Prev/Next Buttons */}
      <button
        onClick={prev}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
        style={{ backgroundColor: "rgba(58,90,64,0.7)", color: "#DAD7CD" }}
        aria-label="Предыдущий слайд"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
        style={{ backgroundColor: "rgba(58,90,64,0.7)", color: "#DAD7CD" }}
        aria-label="Следующий слайд"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? 28 : 10,
              height: 10,
              backgroundColor: i === current ? "#DAD7CD" : "rgba(210,215,205,0.5)",
            }}
            aria-label={`Слайд ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
