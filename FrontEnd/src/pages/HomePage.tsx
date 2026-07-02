import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Leaf,
  ChefHat,
  Truck,
  Flame,
  Check,
  UtensilsCrossed,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchProducts } from "../store/slices/productsSlice";
import { addToCart } from "../store/slices/cartSlice";
import Button from "../components/ui/Button";
import ProductCard from "../components/ui/ProductCard";
import image1 from "../../public/SouthIndianBreakfast.png";

const features = [
  { icon: Leaf, label: "NATURALLY FERMENTED" },
  { icon: Flame, label: "FRESHLY PREPARED" },
  { icon: ChefHat, label: "HYGIENIC KITCHEN" },
  { icon: Truck, label: "QUICK DELIVERY" },
];

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((s) => s.products);

  useEffect(() => {
    dispatch(fetchProducts(undefined));
  }, [dispatch]);

  const batters = items.filter((p) => p.category === "batters").slice(0, 3);
  const cakes = items.filter((p) => p.category === "cakes").slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block bg-green/10 text-green text-xs font-bold px-4 py-1.5 rounded-full tracking-wider mb-4">
              HOMEMADE GOODNESS
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-maroon leading-tight font-bold">
              Freshly Prepared Naturally Fermented.
            </h1>
            <p className="text-gray-600 mt-5 leading-relaxed max-w-lg">
              Naturally fermented, hygienically prepared, and made with love.
              Quality and freshness you can trust, delivered straight to your
              kitchen.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link to="/batters">
                <Button>Browse Menu</Button>
              </Link>
              <Button variant="secondary" className="flex items-center gap-2">
                <Check size={18} className="text-green" />
                Fresh Daily
              </Button>
            </div>
          </div>
          <div className="relative">
            <img
              src={image1}
              alt="South Indian breakfast"
              className="rounded-3xl shadow-xl w-full h-72 md:h-96 object-cover"
            />
            <span className="absolute top-4 right-4 bg-amber-400 text-maroon font-bold text-sm px-4 py-2 rounded-full shadow">
              Starting at ₹120
            </span>
          </div>
        </div>
      </section>

      {/* Feature bar */}
      <section className="bg-green py-6">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center text-white text-center">
              <Icon size={28} className="mb-2" />
              <span className="text-xs font-bold tracking-wider">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Specialty Batters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-serif text-3xl md:text-4xl text-maroon text-center font-bold mb-10">
          Our Specialty Batters
        </h2>
        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {batters.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h3 className="font-serif text-xl text-maroon font-semibold">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">{product.description}</p>
                  <ul className="mt-3 space-y-1">
                    {product.features.slice(0, 2).map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                        <Check size={14} className="text-green" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-maroon font-bold text-lg">
                      ₹{product.price}
                    </span>
                    <Button
                      variant="green"
                      className="!px-4 !py-2 text-xs"
                      onClick={() => dispatch(addToCart(product))}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="text-center mt-8">
          <Link to="/batters" className="text-maroon font-medium hover:underline">
            View All Batters →
          </Link>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="border-4 border-maroon rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=500&fit=crop"
              alt="Cooking together"
              className="w-full h-80 object-cover"
            />
          </div>
          <div>
            <h2 className="font-serif text-3xl text-maroon font-bold mb-4">
              The Hungry Hearts Story
            </h2>
            <p className="text-gray-600 leading-relaxed">
              What started as a teacher's passion for healthy, homemade food has
              grown into a kitchen that serves hundreds of families across
              Gurugram. Every batter is stone-ground, naturally fermented, and
              prepared in our hygienic kitchen with zero preservatives.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4 italic">
              "From nurturing the minds to nurturing the soul"
            </p>
            <div className="flex gap-4 mt-6">
              <div className="bg-white border rounded-xl px-4 py-3 text-sm">
                <span className="text-gray-500">Born:</span>{" "}
                <strong className="text-maroon">NATURAL PROCESS</strong>
              </div>
              <div className="bg-white border rounded-xl px-4 py-3 text-sm">
                <span className="text-gray-500">Fresh:</span>{" "}
                <strong className="text-maroon">MADE BY US</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cakes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-serif text-3xl text-maroon font-bold">
            Artisanal Cakes & Biscuits(Price for 500g, Can be Customized)
          </h2>
          <Link to="/cakes" className="text-maroon text-sm font-medium hover:underline">
            View Full Bakery Menu →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {cakes.map((product) => (
            <ProductCard key={product._id} product={product} variant="compact" />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 py-16 text-center">
        <UtensilsCrossed className="mx-auto text-maroon mb-4" size={40} />
        <h2 className="font-serif text-3xl text-maroon font-bold">
          Good Food. Pure Ingredients. Happy Life.
        </h2>
        <p className="text-gray-600 mt-4">
          Ready to taste the love? Order fresh batters, combo meals, and
          artisanal bakes delivered to your doorstep.
        </p>
        <p className="mt-4 font-medium">
          Order on WhatsApp:{" "}
          <a href="tel:9315551874" className="text-maroon">
            9315551874
          </a>
        </p>
        <div className="mt-6 bg-white border rounded-2xl p-6 text-sm text-gray-600 shadow-sm">
          <p>📍 Gurugram, Haryana</p>
          <p>🕐 Mon–Sat: 7 AM – 8 PM</p>
          <p>🚚 Free delivery on orders above ₹500</p>
        </div>
      </section>
    </div>
  );
}
