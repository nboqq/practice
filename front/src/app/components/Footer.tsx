import { Leaf, MapPin, Phone, Mail, Instagram, Clock } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const schedule = [
  { day: "Понедельник – Пятница", time: "08:00 – 21:00" },
  { day: "Суббота", time: "09:00 – 20:00" },
  { day: "Воскресенье", time: "10:00 – 18:00" },
];

const navLinks = [
  { label: "О нас", href: "#about" },
  { label: "Доставка и самовывоз", href: "#delivery" },
  { label: "Статьи", href: "#articles" },
  { label: "Контакты", href: "#contacts" },
  { label: "График работы", href: "#schedule" },
];

export function Footer() {
  const { ref, style } = useScrollReveal();

  return (
    <footer ref={ref} id="contacts" style={{ backgroundColor: "#1e3526", fontFamily: "'Lato', sans-serif", ...style }}>
      {/* Delivery banner */}
      <div id="delivery" style={{ backgroundColor: "#588157" }} className="py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3
              style={{
                color: "#DAD7CD",
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.5rem",
                fontWeight: 700,
              }}
            >
              Доставка и самовывоз
            </h3>
            <p className="mt-1 text-sm" style={{ color: "#DAD7CD", opacity: 0.85 }}>
              Бесплатная доставка при заказе от 3 000 ₽ · Самовывоз из наших магазинов
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div
              className="px-6 py-3 rounded-xl text-sm text-center"
              style={{ backgroundColor: "rgba(58,90,64,0.5)", color: "#DAD7CD" }}
            >
              <p style={{ fontWeight: 700 }}>Доставка по городу</p>
              <p className="mt-1 text-xs opacity-80">от 350 ₽ · 2–3 часа</p>
            </div>
            <div
              className="px-6 py-3 rounded-xl text-sm text-center"
              style={{ backgroundColor: "rgba(58,90,64,0.5)", color: "#DAD7CD" }}
            >
              <p style={{ fontWeight: 700 }}>Самовывоз</p>
              <p className="mt-1 text-xs opacity-80">Бесплатно · 2 адреса</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#588157" }}
              >
                <Leaf className="w-5 h-5" style={{ color: "#DAD7CD" }} />
              </div>
              <span
                style={{
                  color: "#DAD7CD",
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                }}
              >
                Зелёный Лепесток
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#A3B18A" }}>
              Свежие цветы и растения с доставкой по всему городу. Делаем каждый повод
              незабываемым.
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:opacity-75"
                style={{ backgroundColor: "#3A5A40", color: "#DAD7CD" }}
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:opacity-75"
                style={{ backgroundColor: "#3A5A40", color: "#DAD7CD" }}
                aria-label="VK"
              >
                <span style={{ fontSize: "0.85rem", fontWeight: 700 }}>VK</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:opacity-75"
                style={{ backgroundColor: "#3A5A40", color: "#DAD7CD" }}
                aria-label="Telegram"
              >
                <span style={{ fontSize: "0.75rem", fontWeight: 700 }}>TG</span>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="mb-5 text-sm tracking-widest uppercase"
              style={{ color: "#A3B18A" }}
            >
              Навигация
            </h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors hover:opacity-70"
                    style={{ color: "#DAD7CD" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Schedule */}
          <div id="schedule">
            <h4
              className="mb-5 text-sm tracking-widest uppercase"
              style={{ color: "#A3B18A" }}
            >
              График работы
            </h4>
            <ul className="flex flex-col gap-3">
              {schedule.map((s) => (
                <li key={s.day} className="flex items-start gap-2">
                  <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#588157" }} />
                  <div>
                    <p className="text-sm" style={{ color: "#DAD7CD" }}>
                      {s.day}
                    </p>
                    <p className="text-xs" style={{ color: "#A3B18A" }}>
                      {s.time}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4
              className="mb-5 text-sm tracking-widest uppercase"
              style={{ color: "#A3B18A" }}
            >
              Контакты
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#588157" }} />
                <span className="text-sm" style={{ color: "#DAD7CD" }}>
                  ул. Цветочная, 12, г. Москва
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#588157" }} />
                <span className="text-sm" style={{ color: "#DAD7CD" }}>
                  пр. Садовый, 45, г. Москва
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 flex-shrink-0" style={{ color: "#588157" }} />
                <a
                  href="tel:+74951234567"
                  className="text-sm hover:opacity-70"
                  style={{ color: "#DAD7CD" }}
                >
                  +7 (495) 123-45-67
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 flex-shrink-0" style={{ color: "#588157" }} />
                <a
                  href="mailto:hello@zelenyi-lepestok.ru"
                  className="text-sm hover:opacity-70"
                  style={{ color: "#DAD7CD" }}
                >
                  hello@zelenyi-lepestok.ru
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="py-5 px-6 border-t text-center"
        style={{ borderColor: "rgba(88,129,87,0.3)" }}
      >
        <p className="text-xs" style={{ color: "#A3B18A", opacity: 0.7 }}>
          © 2026 Зелёный Лепесток. Все права защищены.
        </p>
      </div>
    </footer>
  );
}
