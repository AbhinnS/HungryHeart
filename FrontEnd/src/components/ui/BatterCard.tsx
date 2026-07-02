import { Check } from "lucide-react";
import type { Product } from "../../types";
import { useAppDispatch } from "../../store/hooks";
import { addToCart } from "../../store/slices/cartSlice";

interface BatterCardProps {
  product: Product;
}

export default function BatterCard({ product }: BatterCardProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-52 object-cover"
        />
        <span className="absolute top-3 right-3 bg-maroon text-white text-xs px-3 py-1 rounded font-medium">
          ₹{product.price}/- + Delivery
        </span>
      </div>
      {product.banner && (
        <div className="bg-green text-white text-center text-xs py-1.5 tracking-wider font-medium">
          {product.banner}
        </div>
      )}
      <div className="p-5">
        <h3 className="font-serif text-xl text-maroon font-bold tracking-wide uppercase">
          {product.name}
        </h3>
        {product.tagline && (
          <p className="text-green text-sm mt-1 font-medium">{product.tagline}</p>
        )}
        <ul className="mt-4 space-y-2">
          {product.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
              <Check size={16} className="text-green shrink-0" />
              {f}
            </li>
          ))}
        </ul>
        <button
          onClick={() => dispatch(addToCart(product))}
          className="w-full mt-5 bg-maroon text-white py-3 rounded-full font-medium hover:bg-maroon-dark transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
