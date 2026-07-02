import { Link } from "react-router-dom";
import OtpAuthForm from "../components/auth/OtpAuthForm";

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-5rem)] grid md:grid-cols-2">
      <div className="hidden md:block">
        <img
          src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=900&fit=crop"
          alt="Fresh bread"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <p className="font-serif text-maroon text-xl font-bold tracking-wider mb-2">
            HUNGRY HEARTS
          </p>
          <h1 className="font-serif text-3xl text-maroon font-bold mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-500 text-sm mb-6">
            Login with your email. We'll send you a one-time password.
          </p>
          <OtpAuthForm mode="login" redirectTo="/" />
          <p className="text-sm text-gray-600 mt-6 text-center">
            New here?{" "}
            <Link to="/signup" className="text-maroon font-medium hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
