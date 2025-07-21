import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Error = ({ 
  message = "Something went wrong!", 
  onRetry,
  className = ""
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
      <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name="AlertTriangle" className="w-12 h-12 text-red-500" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Oops! Something went wrong
      </h3>
      
      <p className="text-gray-600 text-center mb-6 max-w-md">
        {message}
      </p>
      
      {onRetry && (
        <Button 
          onClick={onRetry}
          icon="RefreshCw"
          variant="primary"
        >
          Try Again
        </Button>
      )}
    </div>
  );
};

export default Error;