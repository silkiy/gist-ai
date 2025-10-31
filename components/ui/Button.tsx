import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 disabled:pointer-events-none";

    // ✅ Type-safe record of variants
    const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
      default: "bg-primary text-white hover:bg-primary/90",
      secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
      outline: "border border-gray-300 hover:bg-gray-50",
      ghost: "hover:bg-gray-100 text-gray-800",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant ?? "default"], className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
