import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  selectCartTotal,
  clearCart,
} from "../store/slices/cartSlice";
import { placeOrder, resetOrder } from "../store/slices/orderSlice";
import Button from "../components/ui/Button";

const DELIVERY_CHARGE = 40;
const TAX_RATE = 0.05;

export default function CheckoutPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, specialInstructions } = useAppSelector((s) => s.cart);
  const { loading, error, success } = useAppSelector((s) => s.order);
  const user = useAppSelector((s) => s.auth.user);

  const [address, setAddress] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("ASAP");
  const [paymentMethod, setPaymentMethod] = useState("UPI");

  const subtotal = useAppSelector(selectCartTotal);
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + tax + DELIVERY_CHARGE;

  if (!user) {
    navigate("/login");
    return null;
  }

  if (items.length === 0 && !success) {
    navigate("/cart");
    return null;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await dispatch(
      placeOrder({
        items: items.map((i) => ({
          product: i._id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          imageUrl: i.imageUrl,
        })),
        subtotal,
        tax,
        deliveryCharge: DELIVERY_CHARGE,
        total,
        deliveryAddress: address,
        deliveryTime,
        paymentMethod,
        specialInstructions,
      })
    );
    if (placeOrder.fulfilled.match(result)) {
      dispatch(clearCart());
    }
  };

  if (success) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="bg-green/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">✓</span>
        </div>
        <h1 className="font-serif text-3xl text-maroon font-bold mb-4">
          Order Placed!
        </h1>
        <p className="text-gray-600 mb-8">
          Thank you for your order. We'll prepare your food with love and deliver
          it soon.
        </p>
        <Button
          onClick={() => {
            dispatch(resetOrder());
            navigate("/");
          }}
        >
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-serif text-3xl text-maroon font-bold mb-8">
        Review & Checkout
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Address */}
            <section className="bg-white rounded-2xl shadow-sm p-6 border">
              <h2 className="font-serif text-lg text-maroon font-bold mb-4">
                Delivery Address
              </h2>
              <textarea
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
                className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-maroon/30"
                placeholder="Full address with pincode"
              />
            </section>

            {/* Delivery Time */}
            <section className="bg-white rounded-2xl shadow-sm p-6 border">
              <h2 className="font-serif text-lg text-maroon font-bold mb-4">
                Delivery Time
              </h2>
              <div className="flex gap-4">
                {["ASAP", "Schedule for later"].map((opt) => (
                  <label
                    key={opt}
                    className={`flex-1 border rounded-xl p-4 cursor-pointer text-center text-sm font-medium transition-colors ${
                      deliveryTime === opt
                        ? "border-maroon bg-maroon/5 text-maroon"
                        : "hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryTime"
                      value={opt}
                      checked={deliveryTime === opt}
                      onChange={() => setDeliveryTime(opt)}
                      className="sr-only"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </section>

            {/* Payment */}
            <section className="bg-white rounded-2xl shadow-sm p-6 border">
              <h2 className="font-serif text-lg text-maroon font-bold mb-4">
                Payment Method
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {["Credit/Debit Card", "UPI", "Net Banking"].map((method) => (
                  <label
                    key={method}
                    className={`border rounded-xl p-3 cursor-pointer text-center text-xs font-medium transition-colors ${
                      paymentMethod === method
                        ? "border-maroon bg-maroon/5 text-maroon"
                        : "hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={() => setPaymentMethod(method)}
                      className="sr-only"
                    />
                    {method}
                  </label>
                ))}
              </div>
            </section>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl shadow-md p-6 border h-fit sticky top-24">
            <h2 className="font-serif text-lg text-maroon font-bold mb-4">
              Order Summary
            </h2>
            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div key={item._id} className="flex gap-3 text-sm">
                  <img
                    src={item.imageUrl}
                    alt=""
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>
            <div className="space-y-2 text-sm border-t pt-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>₹{tax}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery</span>
                <span>₹{DELIVERY_CHARGE}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2">
                <span>Total</span>
                <span className="text-maroon">₹{total}</span>
              </div>
            </div>
            {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
            <Button type="submit" className="w-full mt-4" disabled={loading}>
              {loading ? "Placing Order..." : "Place Order"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
