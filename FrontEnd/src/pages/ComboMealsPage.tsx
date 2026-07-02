import { useEffect } from "react";
import { MessageCircle, Shield, Clock, Leaf } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchProducts } from "../store/slices/productsSlice";
import { addToCart } from "../store/slices/cartSlice";
import Button from "../components/ui/Button";
import ProductCard from "../components/ui/ProductCard";

const trustItems = [
  { icon: Clock, label: "Freshly made" },
  { icon: Leaf, label: "No preservatives" },
  { icon: Shield, label: "Hygienic kitchen" },
  { icon: MessageCircle, label: "Easy ordering" },
];

export default function ComboMealsPage() {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((s) => s.products);

  useEffect(() => {
    dispatch(fetchProducts("combos"));
  }, [dispatch]);

  const featured = items.find((p) => p.name.includes("Festive"));
  const regular = items.filter((p) => !p.name.includes("Festive"));

  return (
    <div>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl text-maroon font-bold">
              Handcrafted Combo Meals
            </h1>
            <p className="text-gray-600 mt-5 leading-relaxed">
              Wholesome, homestyle meals prepared fresh daily. Perfect for busy
              weekdays or lazy weekends — comfort food that tastes like home.
            </p>
            <a
              href="https://wa.me/919315551874"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6"
            >
              <Button variant="green">ORDER ON WHATSAPP</Button>
            </a>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=700&h=500&fit=crop"
              alt="Combo meal"
              className="rounded-3xl shadow-xl w-full h-72 md:h-96 object-cover"
            />
            <span className="absolute top-4 right-4 bg-maroon text-white font-bold text-sm w-16 h-16 rounded-full flex items-center justify-center shadow">
              @₹199
            </span>
          </div>
        </div>
      </section>

      {/* Product grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl text-maroon font-bold">
            Choose Your Comfort
          </h2>
          <p className="text-gray-500 mt-2">
            Homemade combo meals starting at ₹199
          </p>
        </div>
        {loading ? (
          <p className="text-center text-gray-500">Loading meals...</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {regular.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Featured Thali */}
      {featured && (
        <section className="bg-brown py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-center">
            <div className="text-white">
              <h2 className="font-serif text-3xl font-bold mb-4">
                The Ultimate Festive Thali
              </h2>
              <p className="text-white/80 leading-relaxed mb-6">
                {featured.description}. A complete festive spread with rice, dal,
                sabzi, roti, raita, and dessert — perfect for celebrations.
              </p>
              <Button
                onClick={() => dispatch(addToCart(featured))}
                className="!bg-maroon"
              >
                Order Now — ₹{featured.price}
              </Button>
            </div>
            <img
              src={featured.imageUrl}
              alt={featured.name}
              className="rounded-2xl shadow-xl h-72 object-cover w-full"
            />
          </div>
        </section>
      )}

      {/* Trust */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="font-serif text-2xl text-maroon text-center font-bold mb-10">
          Why Neighbors Love Us
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {trustItems.map(({ icon: Icon, label }) => (
            <div key={label} className="text-center">
              <div className="w-14 h-14 bg-green/10 rounded-full mx-auto flex items-center justify-center mb-3">
                <Icon className="text-green" size={24} />
              </div>
              <p className="text-sm font-medium">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-2xl mx-auto px-4 pb-16">
        <div className="bg-green/10 rounded-2xl p-8 text-center">
          <MessageCircle className="mx-auto text-green mb-3" size={32} />
          <h3 className="font-serif text-xl text-maroon font-bold">
            Have a Special Request?
          </h3>
          <p className="text-gray-600 text-sm mt-2 mb-4">
            Custom orders, bulk bookings, or dietary preferences — we're happy
            to help.
          </p>
          <a
            href="https://wa.me/919315551874"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="green">WHATSAPP US NOW</Button>
          </a>
        </div>
      </section>
    </div>
  );
}
