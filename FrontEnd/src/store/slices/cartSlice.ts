import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, Product } from "../../types";

interface CartState {
  items: CartItem[];
  specialInstructions: string;
}

const stored = localStorage.getItem("cart");
const initialState: CartState = {
  items: stored ? JSON.parse(stored) : [],
  specialInstructions: "",
};

const saveCart = (items: CartItem[]) => {
  localStorage.setItem("cart", JSON.stringify(items));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existing = state.items.find((i) => i._id === action.payload._id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          _id: action.payload._id,
          name: action.payload.name,
          price: action.payload.price,
          imageUrl: action.payload.imageUrl,
          quantity: 1,
        });
      }
      saveCart(state.items);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i._id !== action.payload);
      saveCart(state.items);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find((i) => i._id === action.payload.id);
      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter((i) => i._id !== action.payload.id);
        } else {
          item.quantity = action.payload.quantity;
        }
      }
      saveCart(state.items);
    },
    setSpecialInstructions: (state, action: PayloadAction<string>) => {
      state.specialInstructions = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
      state.specialInstructions = "";
      saveCart([]);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  setSpecialInstructions,
  clearCart,
} = cartSlice.actions;

export const selectCartTotal = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export const selectCartCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export default cartSlice.reducer;
