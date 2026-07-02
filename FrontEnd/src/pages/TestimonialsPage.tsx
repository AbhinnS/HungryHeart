import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchTestimonials } from "../store/slices/testimonialsSlice";
import Button from "../components/ui/Button";

export default function TestimonialsPage() {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((s) => s.testimonials);

  useEffect(() => {
    dispatch(fetchTestimonials());
  }, [dispatch]);

  return (
    <div>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="font-serif text-4xl md:text-5xl text-maroon font-bold">
          Hearts Full of Flavor.
        </h1>
        <div className="flex justify-center gap-3 mt-6 flex-wrap">
          {["Fresh Daily", "Pure Ingredients", "Happy Customers"].map((tag) => (
            <span
              key={tag}
              className="bg-green/10 text-green text-xs font-bold px-4 py-1.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {loading ? (
          <p className="text-center text-gray-500">Loading testimonials...</p>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {items.map((t) => {
              const isDark = t.bgColor === "#5D4037";
              return (
                <div
                  key={t._id}
                  className="break-inside-avoid rounded-2xl p-6 shadow-md"
                  style={{ backgroundColor: t.bgColor }}
                >
                  {t.imageUrl && (
                    <img
                      src={t.imageUrl}
                      alt=""
                      className="w-full h-40 object-cover rounded-xl mb-4"
                    />
                  )}
                  <p
                    className={`italic leading-relaxed ${
                      isDark ? "text-white" : "text-gray-700"
                    }`}
                  >
                    "{t.quote}"
                  </p>
                  <p
                    className={`mt-4 font-semibold text-sm ${
                      isDark ? "text-white/80" : "text-maroon"
                    }`}
                  >
                    — {t.name}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className="max-w-xl mx-auto px-4 pb-16 text-center">
        <h2 className="font-serif text-2xl text-maroon font-bold">
          Ready to taste the love?
        </h2>
        <div className="flex justify-center gap-4 mt-6">
          <a
            href="https://wa.me/919315551874"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button>Order Now</Button>
          </a>
          <Link to="/batters">
            <Button variant="green">View Menu</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
