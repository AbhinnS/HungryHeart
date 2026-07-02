import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Otp from "../models/Otp.js";
import { normalizeEmail } from "../utils/email.js";
import { sendOtpEmail } from "../utils/emailService.js";

const OTP_EXPIRY_MS = 5 * 60 * 1000;
const MAX_VERIFY_ATTEMPTS = 5;
const RESEND_COOLDOWN_MS = 60 * 1000;

const generateToken = (id: string) =>
  jwt.sign({ id }, process.env.JWT_SECRET || "hungryhearts_secret", {
    expiresIn: "30d",
  });

const generateOtp = () =>
  String(Math.floor(100000 + Math.random() * 900000));

export const sendOtp = async (req: Request, res: Response) => {
  try {
    const email = normalizeEmail(req.body.email || "");

    if (!email) {
      res.status(400).json({ message: "Enter a valid email address" });
      return;
    }

    const recent = await Otp.findOne({ email }).sort({ createdAt: -1 });
    if (
      recent &&
      Date.now() - recent.createdAt!.getTime() < RESEND_COOLDOWN_MS
    ) {
      const wait = Math.ceil(
        (RESEND_COOLDOWN_MS - (Date.now() - recent.createdAt!.getTime())) / 1000
      );
      res.status(429).json({
        message: `Please wait ${wait}s before requesting another OTP`,
      });
      return;
    }

    const otp = generateOtp();
    const otpHash = await bcrypt.hash(otp, 10);

    await Otp.deleteMany({ email });
    await Otp.create({
      email,
      otpHash,
      expiresAt: new Date(Date.now() + OTP_EXPIRY_MS),
      attempts: 0,
    });

    const { sent, devMode } = await sendOtpEmail(email, otp);

    if (!sent) {
      res.status(500).json({ message: "Failed to send OTP. Try again." });
      return;
    }

    const existingUser = await User.findOne({ email });

    res.json({
      message: "OTP sent successfully",
      email,
      isNewUser: !existingUser,
      ...(devMode && { devOtp: otp }),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const email = normalizeEmail(req.body.email || "");
    const { otp, name } = req.body;

    if (!email || !otp) {
      res.status(400).json({ message: "Email and OTP are required" });
      return;
    }

    const record = await Otp.findOne({ email }).sort({ createdAt: -1 });

    if (!record) {
      res.status(400).json({ message: "OTP expired or not found. Request a new one." });
      return;
    }

    if (record.expiresAt < new Date()) {
      await Otp.deleteMany({ email });
      res.status(400).json({ message: "OTP expired. Request a new one." });
      return;
    }

    if (record.attempts >= MAX_VERIFY_ATTEMPTS) {
      await Otp.deleteMany({ email });
      res.status(429).json({ message: "Too many attempts. Request a new OTP." });
      return;
    }

    const valid = await bcrypt.compare(String(otp), record.otpHash);

    if (!valid) {
      record.attempts += 1;
      await record.save();
      res.status(400).json({
        message: `Invalid OTP. ${MAX_VERIFY_ATTEMPTS - record.attempts} attempts left.`,
      });
      return;
    }

    let user = await User.findOne({ email });

    if (!user) {
      if (!name?.trim()) {
        res.status(200).json({ isNewUser: true, email, needsName: true });
        return;
      }

      user = await User.create({ name: name.trim(), email });
    }

    await Otp.deleteMany({ email });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id.toString()),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
