import { useEffect } from "react";
import { Check, Phone } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchProducts } from "../store/slices/productsSlice";
import BatterCard from "../components/ui/BatterCard";

const whyChoose = [
  { label: "Naturally Fermented", desc: "Traditional process" },
  { label: "Stone Ground", desc: "Authentic texture" },
  { label: "No Preservatives", desc: "Pure ingredients" },
  { label: "Hygienic Kitchen", desc: "FSSAI certified" },
];

const howToUse = [
  "Take batter out of fridge 30 mins before use.",
  "Stir gently — do not over-mix.",
  "Cook on medium heat for best results.",
];

const perfectFor = [
  {
    label: "Soft Idlis",
    img: "https://images.unsplash.com/photo-1589301760012-d265a3720a8?w=100&h=100&fit=crop",
  },
  {
    label: "Crispy Dosa",
    img: "https://images.unsplash.com/photo-1630384060421-cb20d6617650?w=100&h=100&fit=crop",
  },
  {
    label: "Millet Dosa",
    img: "https://images.unsplash.com/photo-1606491956689-2ea866880f84?w=100&h=100&fit=crop",
  },
  {
    label: "Uttapam",
    img: "https://images.unsplash.com/photo-1601050690597-df0565f50f9e?w=100&h=100&fit=crop",
  },
];

export default function BattersPage() {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((s) => s.products);

  useEffect(() => {
    dispatch(fetchProducts("batters"));
  }, [dispatch]);

  return (
    <div>
      {/* Hero */}
      <section className="relative py-16 md:py-24 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-50/60 to-cream -z-10" />
        <span className="inline-block bg-green/10 text-green text-xs font-bold px-4 py-1.5 rounded-full tracking-wider mb-4">
          FRESHLY FERMENTED ONLY
        </span>
        <h1 className="font-serif text-4xl md:text-5xl text-maroon font-bold max-w-2xl mx-auto">
          Healthy Batters for Happy Families
        </h1>
        <p className="text-gray-600 mt-4 max-w-xl mx-auto leading-relaxed">
          Naturally fermented, hygienically prepared, and made with love.
          Quality and freshness you can trust, delivered straight to your
          kitchen.
        </p>
      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {loading ? (
          <p className="text-center text-gray-500">Loading batters...</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {items.map((product) => (
              <BatterCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Why Choose + How to Use */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-100 rounded-2xl p-8">
            <h2 className="flex items-center gap-2 font-serif text-xl text-maroon font-bold mb-6">
              <Check className="text-green" />
              Why Choose Our Batters?
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {whyChoose.map((item) => (
                <div key={item.label} className="text-center">
                  <div className="w-12 h-12 bg-white rounded-full mx-auto flex items-center justify-center shadow-sm mb-2">
                    <Check size={20} className="text-green" />
                  </div>
                  <p className="font-bold text-sm">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-brown rounded-2xl p-8 text-white">
            <h2 className="font-serif text-xl font-bold mb-6">How to Use</h2>
            <ol className="space-y-4">
              {howToUse.map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className="text-2xl font-bold text-white/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-relaxed pt-1">{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 italic text-white/80 text-sm">
              "Good food leads to a better life"
            </p>
          </div>
        </div>
      </section>

      {/* Perfect For + Order */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-serif text-2xl text-maroon font-bold mb-6">
              Perfect For Making...
            </h2>
            <div className="flex gap-6 flex-wrap">
              {perfectFor.map((item) => (
                <div key={item.label} className="text-center">
                  <img
                    src={item.img}
                    alt={item.label}
                    className="w-16 h-16 rounded-full object-cover mx-auto border-2 border-maroon/20"
                  />
                  <p className="text-xs mt-2 font-medium">{item.label}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-sm mt-4 italic">
              ...and many more breakfast delights!
            </p>
          </div>

          <div className="bg-maroon rounded-2xl p-8 text-white text-center">
            <p className="text-sm tracking-widest font-bold mb-2">ORDER NOW!</p>
            <p className="text-4xl font-bold mb-6">9315551874</p>
            <a
              href="tel:9315551874"
              className="inline-flex items-center gap-2 bg-white text-maroon px-6 py-3 rounded-full font-medium hover:bg-cream transition-colors"
            >
              <Phone size={18} />
              Call to Order
            </a>
            <p className="text-xs mt-6 text-white/70 tracking-wider">
              FAST • SAFE • ON TIME DELIVERY
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
