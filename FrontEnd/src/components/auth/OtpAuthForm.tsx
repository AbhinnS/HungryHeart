import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, ShieldCheck } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  sendOtp,
  verifyOtp,
  resetOtpFlow,
} from "../../store/slices/authSlice";
import Button from "../ui/Button";

interface OtpAuthFormProps {
  mode: "login" | "signup";
  redirectTo?: string;
}

export default function OtpAuthForm({
  mode,
  redirectTo = "/",
}: OtpAuthFormProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    loading,
    error,
    otpSent,
    email: storedEmail,
    devOtp,
    needsName,
  } = useAppSelector((s) => s.auth);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");

  const handleSendOtp = async (e: FormEvent) => {
    e.preventDefault();
    if (mode === "signup" && !name.trim()) return;
    await dispatch(sendOtp(email));
  };

  const handleVerifyOtp = async (e: FormEvent) => {
    e.preventDefault();
    const result = await dispatch(
      verifyOtp({
        email: storedEmail || email,
        otp,
        name: mode === "signup" || needsName ? name : undefined,
      })
    );

    if (verifyOtp.fulfilled.match(result) && result.payload.token) {
      navigate(redirectTo);
    }
  };

  const handleChangeEmail = () => {
    dispatch(resetOtpFlow());
    setOtp("");
  };

  if (!otpSent) {
    return (
      <form onSubmit={handleSendOtp} className="space-y-4">
        {mode === "signup" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-maroon/30"
              placeholder="Your name"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-maroon/30"
            placeholder="you@example.com"
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <Button type="submit" className="w-full flex items-center justify-center gap-2" disabled={loading}>
          <Mail size={16} />
          {loading ? "Sending OTP..." : "Send OTP to Email"}
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={handleVerifyOtp} className="space-y-4">
      <div className="bg-green/10 rounded-xl p-4 text-sm">
        <p className="text-gray-700">
          OTP sent to{" "}
          <strong className="text-maroon">{storedEmail || email}</strong>
        </p>
        {devOtp && (
          <p className="mt-2 text-xs text-gray-500">
            Dev mode OTP: <strong className="text-green">{devOtp}</strong>
          </p>
        )}
        <button
          type="button"
          onClick={handleChangeEmail}
          className="text-maroon text-xs mt-2 hover:underline"
        >
          Change email
        </button>
      </div>

      {(needsName || (mode === "signup" && !name)) && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-maroon/30"
            placeholder="Enter your name to continue"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Enter OTP
        </label>
        <input
          type="text"
          required
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
          className="w-full border rounded-xl px-4 py-3 text-sm tracking-[0.5em] text-center text-lg focus:outline-none focus:ring-2 focus:ring-maroon/30"
          placeholder="• • • • • •"
          autoFocus
        />
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <Button type="submit" className="w-full flex items-center justify-center gap-2" disabled={loading}>
        <ShieldCheck size={16} />
        {loading ? "Verifying..." : "Verify & Continue"}
      </Button>

      <button
        type="button"
        onClick={() => dispatch(sendOtp(storedEmail || email))}
        disabled={loading}
        className="w-full text-sm text-maroon hover:underline disabled:opacity-50"
      >
        Resend OTP
      </button>
    </form>
  );
}
