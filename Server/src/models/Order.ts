import mongoose, { Schema, Document, Types } from "mongoose";

export interface IOrderItem {
  product: Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface IOrder extends Document {
  user?: Types.ObjectId;
  items: IOrderItem[];
  subtotal: number;
  tax: number;
  deliveryCharge: number;
  total: number;
  deliveryAddress: string;
  deliveryTime: string;
  paymentMethod: string;
  specialInstructions?: string;
  status: "pending" | "confirmed" | "delivered" | "cancelled";
}

const orderItemSchema = new Schema<IOrderItem>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  imageUrl: { type: String, required: true },
});

const orderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    items: [orderItemSchema],
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    deliveryCharge: { type: Number, required: true },
    total: { type: Number, required: true },
    deliveryAddress: { type: String, required: true },
    deliveryTime: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    specialInstructions: { type: String },
    status: {
      type: String,
      enum: ["pending", "confirmed", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>("Order", orderSchema);
