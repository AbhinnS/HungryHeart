import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "green" | "outline";
  children: ReactNode;
}

const variants = {
  primary: "bg-maroon text-white hover:bg-maroon-dark",
  secondary: "bg-white text-maroon border-2 border-maroon hover:bg-maroon/5",
  green: "bg-green text-white hover:bg-green-dark",
  outline: "bg-transparent text-white border-2 border-white hover:bg-white/10",
};

export default function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`px-6 py-2.5 rounded-full font-medium text-sm transition-colors disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
