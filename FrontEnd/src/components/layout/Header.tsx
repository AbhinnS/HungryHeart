import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User, MessageCircle } from "lucide-react";
import { useAppSelector } from "../../store/hooks";
import { selectCartCount } from "../../store/slices/cartSlice";

const navLinks = [
  { to: "/batters", label: "Our Batters" },
  { to: "/combos", label: "Combo Meals" },
  { to: "/cakes", label: "Cakes & Biscuits" },
  { to: "/testimonials", label: "Testimonials" },
];

export default function Header() {
  const location = useLocation();
  const cartCount = useAppSelector(selectCartCount);
  const user = useAppSelector((s) => s.auth.user);

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-maroon/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="font-serif text-xl md:text-2xl text-maroon tracking-wider font-bold">
            HUNGRY HEARTS
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors hover:text-maroon ${
                  location.pathname === link.to
                    ? "text-maroon border-b-2 border-maroon pb-0.5"
                    : "text-gray-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/919315551874"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 bg-maroon text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-maroon-dark transition-colors"
            >
              <MessageCircle size={16} />
              Order via WhatsApp
            </a>

            <Link
              to={user ? "/cart" : "/login"}
              className="p-2 text-gray-700 hover:text-maroon"
              title={user ? "Account" : "Login"}
            >
              <User size={22} />
            </Link>

            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-maroon">
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-green text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        <nav className="lg:hidden flex overflow-x-auto gap-4 pb-3 -mx-1 px-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`whitespace-nowrap text-xs font-medium px-3 py-1 rounded-full ${
                location.pathname === link.to
                  ? "bg-maroon text-white"
                  : "bg-white text-gray-700 border"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
