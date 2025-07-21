import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import CategoryGrid from "@/components/organisms/CategoryGrid";
import ProductGrid from "@/components/organisms/ProductGrid";
import ApperIcon from "@/components/ApperIcon";

const Categories = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const categoryParam = searchParams.get("category");

  const handleCategorySelect = (category) => {
    if (selectedCategory?.Id === category.Id) {
      setSelectedCategory(null);
      setSearchParams({});
    } else {
      setSelectedCategory(category);
      setSearchParams({ category: category.Id });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
            <ApperIcon name="Grid3X3" className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">All Categories</h1>
            <p className="text-gray-600">Browse products by category</p>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Choose Category
        </h2>
        <CategoryGrid 
          showAll={true}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />
      </div>

      {/* Products */}
      {selectedCategory && (
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {selectedCategory.name} Products
            </h2>
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSearchParams({});
              }}
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2"
            >
              <ApperIcon name="X" className="w-4 h-4" />
              Clear Filter
            </button>
          </div>
          
          <ProductGrid category={selectedCategory.name} />
        </div>
      )}

      {!selectedCategory && (
        <div className="bg-white rounded-xl p-12 shadow-sm text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <ApperIcon name="Mouse" className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Select a Category
          </h3>
          <p className="text-gray-600">
            Choose a category above to view products
          </p>
        </div>
      )}
    </div>
  );
};

export default Categories;