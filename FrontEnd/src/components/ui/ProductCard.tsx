import { Check } from "lucide-react";
import type { Product } from "../../types";
import { useAppDispatch } from "../../store/hooks";
import { addToCart } from "../../store/slices/cartSlice";
import Button from "./Button";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "compact";
}

export default function ProductCard({
  product,
  variant = "default",
}: ProductCardProps) {
  const dispatch = useAppDispatch();

  if (variant === "compact") {
    return (
      <div className="group">
        <div className="overflow-hidden rounded-2xl mb-3">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h3 className="font-serif text-maroon font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-1">{product.description}</p>
        <p className="text-maroon font-bold mt-2">₹{product.price}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-maroon text-white text-xs px-2 py-1 rounded">
            NEW
          </span>
        )}
        {product.isVeg && (
          <span className="absolute top-3 right-3 bg-green text-white text-xs px-2 py-0.5 rounded">
            Veg
          </span>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-serif text-lg text-maroon font-semibold">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mt-1 flex-1">{product.description}</p>
        {product.features?.length > 0 && (
          <ul className="mt-3 space-y-1">
            {product.features.slice(0, 2).map((f) => (
              <li key={f} className="flex items-center gap-2 text-xs text-gray-600">
                <Check size={14} className="text-green shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        )}
        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <span className="text-maroon font-bold text-lg">₹{product.price}</span>
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
  );
}
