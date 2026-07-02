import type { Request, Response } from "express";
import Product from "../models/Product.js";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const category = req.query.category as
      | "batters"
      | "cakes"
      | "biscuits"
      | "combos"
      | undefined;

    const filter = category ? { category } : {};

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
