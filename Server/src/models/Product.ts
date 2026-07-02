import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  tagline?: string;
  price: number;
  imageUrl: string;
  category: "batters" | "cakes" | "biscuits" | "combos";
  features: string[];
  isVeg: boolean;
  iisNewProduct?: boolean;
  banner?: string;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    tagline: { type: String },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    category: {
      type: String,
      enum: ["batters", "cakes", "biscuits", "combos"],
      required: true,
    },
    features: [{ type: String }],
    isVeg: { type: Boolean, default: true },
    iisNewProduct: { type: Boolean, default: false },
    banner: { type: String },
  },
  { timestamps: true, suppressReservedKeysWarning: true }
);

export default mongoose.model<IProduct>("Product", productSchema);
