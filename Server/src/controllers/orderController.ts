import { Response } from "express";
import Order from "../models/Order.js";
import { AuthRequest } from "../middleware/authMiddleware.js";

export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const {
      items,
      subtotal,
      tax,
      deliveryCharge,
      total,
      deliveryAddress,
      deliveryTime,
      paymentMethod,
      specialInstructions,
    } = req.body;

    if (!items?.length || !deliveryAddress || !paymentMethod) {
      res.status(400).json({ message: "Missing required order fields" });
      return;
    }

    const order = await Order.create({
      user: req.userId,
      items,
      subtotal,
      tax,
      deliveryCharge,
      total,
      deliveryAddress,
      deliveryTime: deliveryTime || "ASAP",
      paymentMethod,
      specialInstructions,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getMyOrders = async (req: AuthRequest, res: Response) => {
  try {
    const orders = await Order.find({ user: req.userId }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
