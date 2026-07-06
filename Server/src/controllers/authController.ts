import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Otp from "../models/Otp.js";
import { normalizeEmail } from "../utils/email.ts";
import { sendOtpEmail } from "../utils/emailService.ts";

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
      return res.status(400).json({
        success: false,
        message: "Enter a valid email address",
      });
    }

    const recent = await Otp.findOne({ email }).sort({ createdAt: -1 });

    if (
      recent &&
      Date.now() - recent.createdAt!.getTime() < RESEND_COOLDOWN_MS
    ) {
      const wait = Math.ceil(
        (RESEND_COOLDOWN_MS - (Date.now() - recent.createdAt!.getTime())) / 1000
      );

      return res.status(429).json({
        success: false,
        message: `Please wait ${wait} seconds before requesting another OTP.`,
        resendAfter: wait,
      });
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
      return res.status(500).json({
        success: false,
        message: "Unable to send OTP email. Please try again.",
      });
    }

    const existingUser = await User.findOne({ email });

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully.",
      email,
      isNewUser: !existingUser,
      expiresIn: 300,
      resendAfter: 60,
      ...(devMode && { devOtp: otp }),
    });
  } catch (error) {
    console.error("===== SEND OTP ERROR =====");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const email = normalizeEmail(req.body.email || "");
    const { otp, name } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required.",
      });
    }

    const record = await Otp.findOne({ email }).sort({ createdAt: -1 });

    if (!record) {
      return res.status(400).json({
        success: false,
        message: "OTP expired or not found. Please request a new OTP.",
      });
    }

    if (record.expiresAt < new Date()) {
      await Otp.deleteMany({ email });

      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new OTP.",
      });
    }

    if (record.attempts >= MAX_VERIFY_ATTEMPTS) {
      await Otp.deleteMany({ email });

      return res.status(429).json({
        success: false,
        message: "Too many incorrect attempts. Please request a new OTP.",
      });
    }

    const valid = await bcrypt.compare(String(otp), record.otpHash);

    if (!valid) {
      record.attempts += 1;
      await record.save();

      return res.status(400).json({
        success: false,
        message: `Invalid OTP. ${
          MAX_VERIFY_ATTEMPTS - record.attempts
        } attempts remaining.`,
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      if (!name?.trim()) {
        return res.status(200).json({
          success: true,
          isNewUser: true,
          email,
          needsName: true,
        });
      }

      user = await User.create({
        name: name.trim(),
        email,
      });
    }

    await Otp.deleteMany({ email });

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully.",
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id.toString()),
    });
  } catch (error) {
    console.error("===== VERIFY OTP ERROR =====");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};