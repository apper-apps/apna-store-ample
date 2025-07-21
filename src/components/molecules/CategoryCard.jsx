import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const CategoryCard = ({ 
  category, 
  onClick, 
  className,
  isActive = false 
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex flex-col items-center p-4 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105",
        isActive 
          ? "bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-lg" 
          : "bg-white hover:shadow-md border border-gray-100",
        className
      )}
    >
      <div className={cn(
        "w-12 h-12 rounded-full flex items-center justify-center mb-2",
        isActive ? "bg-white/20" : "bg-gradient-to-br from-primary-100 to-accent-100"
      )}>
        <ApperIcon 
          name={category.icon} 
          className={cn(
            "w-6 h-6",
            isActive ? "text-white" : "text-primary-600"
          )} 
        />
      </div>
      <span className={cn(
        "text-sm font-medium text-center",
        isActive ? "text-white" : "text-gray-700"
      )}>
        {category.name}
      </span>
    </div>
  );
};

export default CategoryCard;