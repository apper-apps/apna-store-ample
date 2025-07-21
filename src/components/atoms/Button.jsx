import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Button = forwardRef(({ 
  children, 
  className, 
  variant = "primary", 
  size = "md", 
  loading = false,
  icon,
  iconPosition = "left",
  ...props 
}, ref) => {
  const variants = {
    primary: "bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:from-primary-600 hover:to-accent-600 shadow-lg",
    secondary: "bg-gradient-to-r from-secondary-500 to-secondary-600 text-white hover:from-secondary-600 hover:to-secondary-700 shadow-lg",
    outline: "border-2 border-primary-500 text-primary-500 hover:bg-primary-50 bg-white",
    ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
    success: "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg",
    danger: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl"
  };

  return (
    <button
      ref={ref}
      className={cn(
        "font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2",
        variants[variant],
        sizes[size],
        loading && "cursor-not-allowed",
        className
      )}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <>
          <ApperIcon name="Loader2" className="w-4 h-4 animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {icon && iconPosition === "left" && <ApperIcon name={icon} className="w-4 h-4" />}
          {children}
          {icon && iconPosition === "right" && <ApperIcon name={icon} className="w-4 h-4" />}
        </>
      )}
    </button>
  );
});

Button.displayName = "Button";

export default Button;