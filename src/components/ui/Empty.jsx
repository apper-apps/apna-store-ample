import React from "react";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ 
  message = "No items found", 
  action = "Add items",
  onAction,
  icon = "Package",
  className = ""
}) => {
  const navigate = useNavigate();

  const handleAction = () => {
    if (onAction) {
      onAction();
    } else {
      navigate("/store/add-product");
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
      <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name={icon} className="w-12 h-12 text-primary-500" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Nothing here yet
      </h3>
      
      <p className="text-gray-600 text-center mb-6 max-w-md">
        {message}
      </p>
      
      <Button 
        onClick={handleAction}
        icon="Plus"
        variant="primary"
      >
        {action}
      </Button>
    </div>
  );
};

export default Empty;