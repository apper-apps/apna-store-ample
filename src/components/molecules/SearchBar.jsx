import React, { useState } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";

const SearchBar = ({ 
  placeholder = "Search products...", 
  onSearch, 
  className,
  value,
  onChange
}) => {
  const [searchTerm, setSearchTerm] = useState(value || "");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className={cn("relative flex items-center", className)}>
      <div className="relative flex-1">
        <ApperIcon 
          name="Search" 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
        />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          className="pl-10 pr-4"
        />
      </div>
      <button
        onClick={handleSearch}
        className="ml-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white p-3 rounded-lg hover:from-primary-600 hover:to-accent-600 transition-all duration-200 transform hover:scale-105"
      >
        <ApperIcon name="Search" className="w-5 h-5" />
      </button>
    </div>
  );
};

export default SearchBar;