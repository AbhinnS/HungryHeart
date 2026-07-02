export interface Product {
  _id: string;
  name: string;
  description: string;
  tagline?: string;
  price: number;
  imageUrl: string;
  category: "batters" | "cakes" | "biscuits" | "combos";
  features: string[];
  isVeg: boolean;
  isNew?: boolean;
  banner?: string;
}

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  token: string;
}

export interface SendOtpResponse {
  message: string;
  email: string;
  isNewUser: boolean;
  devOtp?: string;
}

export interface VerifyOtpResponse {
  _id?: string;
  name?: string;
  email?: string;
  token?: string;
  isNewUser?: boolean;
  needsName?: boolean;
}

export interface Testimonial {
  _id: string;
  name: string;
  quote: string;
  imageUrl?: string;
  bgColor: string;
}

export interface OrderPayload {
  items: {
    product: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
  }[];
  subtotal: number;
  tax: number;
  deliveryCharge: number;
  total: number;
  deliveryAddress: string;
  deliveryTime: string;
  paymentMethod: string;
  specialInstructions?: string;
}
