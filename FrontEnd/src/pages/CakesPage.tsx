import { useEffect } from "react";
import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchProducts } from "../store/slices/productsSlice";
import { addToCart } from "../store/slices/cartSlice";
import Button from "../components/ui/Button";
import ProductCard from "../components/ui/ProductCard";

export default function CakesPage() {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((s) => s.products);

  useEffect(() => {
    dispatch(fetchProducts(undefined));
  }, [dispatch]);

  const cakes = items.filter((p) => p.category === "cakes");
  const biscuits = items.filter((p) => p.category === "biscuits");
  const featuredBiscuit = biscuits.find((b) => b.name.includes("Nankhatai"));
  const otherBiscuits = biscuits.filter((b) => !b.name.includes("Nankhatai"));

  return (
    <div>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="font-serif text-3xl md:text-5xl text-maroon font-bold max-w-3xl mx-auto leading-tight">
          The sweetest gift is something made fresh with love.
        </h1>
        <div className="flex justify-center gap-3 mt-6">
          <span className="bg-green/10 text-green text-xs font-bold px-4 py-1.5 rounded-full">
            Freshly Prepared
          </span>
          <span className="bg-green/10 text-green text-xs font-bold px-4 py-1.5 rounded-full">
            No Preservatives
          </span>
        </div>
        <img
          src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=900&h=400&fit=crop"
          alt="Cakes and cookies"
          className="mt-8 rounded-3xl shadow-xl w-full max-w-4xl mx-auto h-64 md:h-80 object-cover"
        />
        <a
          href="https://wa.me/919315551874"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-8"
        >
          <Button>Order on WhatsApp</Button>
        </a>
      </section>

      {/* Cakes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="font-serif text-3xl text-maroon font-bold text-center mb-10">
          Our Delicious Cakes
        </h2>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {cakes.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Biscuits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="font-serif text-3xl text-maroon font-bold text-center mb-10">
          Our Wholesome Biscuits
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {featuredBiscuit && (
            
            <div className="relative rounded-2xl overflow-hidden shadow-lg">

              <img
                src={featuredBiscuit.imageUrl}
                alt={featuredBiscuit.name}
                className="w-full h-80 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                <h3 className="font-serif text-2xl font-bold">
                  {featuredBiscuit.name}
                </h3>
                <p className="text-sm mt-1 text-white/80">
                  {featuredBiscuit.description}
                </p>
                <Button
                  className="mt-3 !px-4 !py-2 text-xs"
                  onClick={() => dispatch(addToCart(featuredBiscuit))}
                >
                  Order Now — ₹{featuredBiscuit.price}
                </Button>
              </div>
            </div>
          )}
          <div className="space-y-6">
            {otherBiscuits.map((product) => (
              <div
                key={product._id}
                className="flex gap-4 bg-white rounded-2xl shadow-md overflow-hidden"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-32 h-32 object-cover shrink-0"
                />
                <div className="p-4 flex flex-col justify-center">
                  <h3 className="font-serif text-maroon font-semibold">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-maroon font-bold">
                      ₹{product.price}
                    </span>
                    <Button
                      className="!px-4 !py-1.5 text-xs"
                      onClick={() => dispatch(addToCart(product))}
                    >
                      Order Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo banner */}
      <section className="bg-orange-100 py-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl text-maroon font-bold">
              Homemade Combo Meals @ ₹199 each
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              Pair your bakes with our comfort meals
            </p>
          </div>
          <Link to="/combos">
            <Button>View All Combos</Button>
          </Link>
        </div>
      </section>

      {/* Values */}
      <section className="bg-brown py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="font-serif text-2xl font-bold mb-10">
            Why Choose Hungry Hearts?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Pure Ingredients", "Fresh Daily", "No Preservatives", "Made with Love"].map(
              (v) => (
                <div key={v}>
                  <div className="w-16 h-16 bg-white/10 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <MessageCircle size={24} />
                  </div>
                  <p className="text-sm font-medium">{v}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
