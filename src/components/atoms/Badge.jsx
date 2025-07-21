import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ 
  children, 
  className, 
  variant = "primary",
  size = "md",
  ...props 
}, ref) => {
  const variants = {
    primary: "bg-gradient-to-r from-primary-500 to-accent-500 text-white",
    secondary: "bg-gradient-to-r from-secondary-500 to-secondary-600 text-white",
    success: "bg-gradient-to-r from-green-500 to-green-600 text-white",
    warning: "bg-gradient-to-r from-yellow-500 to-orange-500 text-white",
    danger: "bg-gradient-to-r from-red-500 to-red-600 text-white",
    info: "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
    gray: "bg-gray-100 text-gray-800"
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base"
  };

  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;