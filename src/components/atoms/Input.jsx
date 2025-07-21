import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ 
  className, 
  type = "text",
  error,
  ...props 
}, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white",
        error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-200",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;