import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  removeFromCart,
  updateQuantity,
  setSpecialInstructions,
  selectCartTotal,
} from "../store/slices/cartSlice";
import Button from "../components/ui/Button";

const DELIVERY_CHARGE = 40;
const TAX_RATE = 0.05;

export default function CartPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, specialInstructions } = useAppSelector((s) => s.cart);
  const user = useAppSelector((s) => s.auth.user);
  const subtotal = useAppSelector(selectCartTotal);
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + tax + (items.length ? DELIVERY_CHARGE : 0);

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="font-serif text-3xl text-maroon font-bold mb-4">
          Your Basket is Empty
        </h1>
        <p className="text-gray-500 mb-8">
          Add some delicious items from our menu!
        </p>
        <Link to="/batters">
          <Button>Browse Menu</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-serif text-3xl text-maroon font-bold mb-8">
        Your Shopping Basket
      </h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="flex gap-4 bg-white rounded-2xl shadow-sm p-4 border"
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-20 h-20 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1">
                <h3 className="font-serif text-maroon font-semibold">
                  {item.name}
                </h3>
                <p className="text-maroon font-bold mt-1">₹{item.price}</p>
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item._id,
                          quantity: item.quantity - 1,
                        })
                      )
                    }
                    className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="font-medium w-6 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item._id,
                          quantity: item.quantity + 1,
                        })
                      )
                    }
                    className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50"
                  >
                    <Plus size={14} />
                  </button>
                  <button
                    onClick={() => dispatch(removeFromCart(item._id))}
                    className="ml-auto text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <p className="font-bold text-maroon self-center">
                ₹{item.price * item.quantity}
              </p>
            </div>
          ))}

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Special Instructions
            </label>
            <textarea
              value={specialInstructions}
              onChange={(e) =>
                dispatch(setSpecialInstructions(e.target.value))
              }
              rows={3}
              className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-maroon/30"
              placeholder="Any allergies, delivery notes, etc."
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 border h-fit sticky top-24">
          <h2 className="font-serif text-xl text-maroon font-bold mb-4">
            Order Summary
          </h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax (5%)</span>
              <span>₹{tax}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Charge</span>
              <span>₹{DELIVERY_CHARGE}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-3 border-t">
              <span>Total</span>
              <span className="text-maroon">₹{total}</span>
            </div>
          </div>
          <input
            type="text"
            placeholder="Promo code"
            className="w-full border rounded-xl px-4 py-2 text-sm mt-4 focus:outline-none focus:ring-2 focus:ring-maroon/30"
          />
          <Button
            className="w-full mt-4"
            onClick={() => {
              if (!user) {
                navigate("/login");
              } else {
                navigate("/checkout");
              }
            }}
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
