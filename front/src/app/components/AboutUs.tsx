import { Leaf, Truck, Clock, Award } from "lucide-react";

const features = [
  {
    icon: <Leaf className="w-6 h-6" />,
    title: "Свежие цветы",
    desc: "Поставляем цветы напрямую с плантаций Нидерландов и Эквадора каждые 3 дня",
  },
  {
    icon: <Truck className="w-6 h-6" />,
    title: "Быстрая доставка",
    desc: "Доставим ваш букет в течение 2–3 часов по всему городу",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Работаем без выходных",
    desc: "Открыты с 8:00 до 21:00 ежедневно, включая праздники",
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Гарантия качества",
    desc: "Если цветы завянут в течение суток — заменим букет бесплатно",
  },
];

export function AboutUs() {
  return (
    <section id="about" className="py-20 px-6" style={{ backgroundColor: "#3A5A40" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text side */}
          <div>
            <span
              className="text-sm tracking-widest uppercase"
              style={{ color: "#A3B18A", fontFamily: "'Lato', sans-serif" }}
            >
              Наша история
            </span>
            <h2
              className="mt-3 mb-6"
              style={{
                color: "#DAD7CD",
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 700,
                lineHeight: 1.3,
              }}
            >
              О нас
            </h2>
            <div
              className="rounded-full mb-8"
              style={{ width: 64, height: 3, backgroundColor: "#588157" }}
            />
            <p
              className="mb-5 leading-relaxed"
              style={{ color: "#DAD7CD", fontFamily: "'Lato', sans-serif", opacity: 0.9 }}
            >
              «Зелёный Лепесток» — это семейный цветочный магазин с более чем 10-летней историей.
              Мы начинали с небольшого киоска на городском рынке, а сегодня у нас два полноценных
              магазина и собственная служба доставки.
            </p>
            <p
              className="mb-8 leading-relaxed"
              style={{ color: "#DAD7CD", fontFamily: "'Lato', sans-serif", opacity: 0.9 }}
            >
              Наша команда — это флористы с опытом более 5 лет, которые с любовью создают
              каждый букет. Мы верим, что цветы — это язык, на котором можно сказать всё, что
              слова передать не в силах.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: "10+", label: "лет на рынке" },
                { value: "5 000+", label: "довольных клиентов" },
                { value: "200+", label: "видов цветов" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p
                    style={{
                      color: "#A3B18A",
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "clamp(1.4rem, 3vw, 2rem)",
                      fontWeight: 700,
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="text-xs mt-1"
                    style={{ color: "#DAD7CD", fontFamily: "'Lato', sans-serif", opacity: 0.7 }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Features grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl p-6 transition-transform duration-200 hover:-translate-y-1"
                style={{ backgroundColor: "rgba(88,129,87,0.35)" }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: "#588157", color: "#DAD7CD" }}
                >
                  {f.icon}
                </div>
                <h3
                  className="mb-2"
                  style={{
                    color: "#DAD7CD",
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.05rem",
                    fontWeight: 600,
                  }}
                >
                  {f.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#A3B18A", fontFamily: "'Lato', sans-serif" }}
                >
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
