import { Link } from "react-router-dom";
import OtpAuthForm from "../components/auth/OtpAuthForm";

export default function SignupPage() {
  return (
    <div className="min-h-[calc(100vh-5rem)] grid md:grid-cols-2">
      <div className="hidden md:flex items-center justify-center bg-cream p-8">
        <div className="text-center">
          <img
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=400&fit=crop"
            alt="Join our kitchen"
            className="w-64 h-64 rounded-full object-cover mx-auto border-4 border-maroon shadow-xl"
          />
          <p className="font-serif text-maroon text-xl mt-6 italic">
            Join our family kitchen.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <p className="font-serif text-maroon text-xl font-bold tracking-wider mb-2">
            HUNGRY HEARTS
          </p>
          <h1 className="font-serif text-3xl text-maroon font-bold mb-2">
            Create an Account
          </h1>
          <p className="text-gray-500 text-sm mb-6">
            Sign up with your email. Verify with OTP to get started.
          </p>
          <OtpAuthForm mode="signup" redirectTo="/" />
          <p className="text-sm text-gray-600 mt-6 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-maroon font-medium hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
