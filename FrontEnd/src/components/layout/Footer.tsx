import { Link } from "react-router-dom";
import { Heart, Leaf, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif text-xl text-maroon font-bold mb-3">
              Hungry Hearts
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Naturally fermented batters, artisanal cakes, and homemade combo
              meals — prepared with love in a hygienic kitchen and delivered
              fresh to your door.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 bg-white px-3 py-2 rounded-lg border text-xs text-gray-600">
              <span className="font-bold text-green">FSSAI</span>
              Lic. No. 12345678901234
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm tracking-wider mb-4">
              QUICK LINKS
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link to="/batters" className="hover:text-maroon">
                  Our Batters
                </Link>
              </li>
              <li>
                <Link to="/combos" className="hover:text-maroon">
                  Combo Meals
                </Link>
              </li>
              <li>
                <Link to="/cakes" className="hover:text-maroon">
                  Cakes & Biscuits
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-maroon">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-maroon">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm tracking-wider mb-4">
              OUR PROMISE
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm">
                <Heart className="text-maroon" size={20} />
                <span className="text-sm font-medium">Homemade with Love</span>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm">
                <Leaf className="text-green" size={20} />
                <span className="text-sm font-medium">100% Pure Ingredients</span>
              </div>
            </div>
            <div className="mt-6 text-sm text-gray-600">
              <p className="font-medium text-gray-800">Contact & Delivery</p>
              <p>📞 9315551874</p>
              <p>📍 Gurugram, Haryana</p>
              <p>🕐 Mon–Sat: 7 AM – 8 PM</p>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Hungry Hearts. All rights reserved.
        </div>
      </div>

      <a
        href="https://wa.me/919315551874"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green text-white p-4 rounded-full shadow-lg hover:bg-green-dark transition-colors z-50"
        aria-label="WhatsApp"
      >
        <MessageCircle size={28} />
      </a>
    </footer>
  );
}
