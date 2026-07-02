import { Request, Response } from "express";
import Testimonial from "../models/Testimonial.js";

export const getTestimonials = async (_req: Request, res: Response) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
