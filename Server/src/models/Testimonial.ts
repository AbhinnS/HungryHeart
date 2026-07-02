import mongoose, { Schema, Document } from "mongoose";

export interface ITestimonial extends Document {
  name: string;
  quote: string;
  imageUrl?: string;
  bgColor: string;
}

const testimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true },
    quote: { type: String, required: true },
    imageUrl: { type: String },
    bgColor: { type: String, default: "#FDF8F1" },
  },
  { timestamps: true }
);

export default mongoose.model<ITestimonial>("Testimonial", testimonialSchema);
