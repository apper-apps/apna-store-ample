import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import CategoryGrid from "@/components/organisms/CategoryGrid";
import ProductGrid from "@/components/organisms/ProductGrid";
import ApperIcon from "@/components/ApperIcon";

const Home = () => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const searchTerm = searchParams.get("search") || "";

  const handleCategorySelect = (category) => {
    setSelectedCategory(selectedCategory?.Id === category.Id ? null : category);
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      {!searchTerm && (
        <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome to RL Apna Store
              </h1>
              <p className="text-primary-100 text-lg">
                आसान ऑनलाइन शॉपिंग - Everything you need, just a click away!
              </p>
            </div>
            <div className="hidden md:block">
              <ApperIcon name="ShoppingBag" className="w-24 h-24 text-white/20" />
            </div>
          </div>
        </div>
      )}

      {/* Search Results Header */}
      {searchTerm && (
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900">
            Search Results for "{searchTerm}"
          </h2>
          <p className="text-gray-600 mt-2">
            Showing products matching your search
          </p>
        </div>
      )}

      {/* Categories */}
      {!searchTerm && (
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Shop by Category
            </h2>
            <span className="text-sm text-gray-500">
              Choose what you need
            </span>
          </div>
          <CategoryGrid 
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
          />
        </div>
      )}

      {/* Products */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {searchTerm ? "Search Results" :
             selectedCategory ? `${selectedCategory.name} Products` : 
             "Featured Products"}
          </h2>
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2"
            >
              <ApperIcon name="X" className="w-4 h-4" />
              Clear Filter
            </button>
          )}
        </div>
        
        <ProductGrid 
          category={selectedCategory?.name}
          searchTerm={searchTerm}
          limit={searchTerm ? undefined : 12}
        />
      </div>

      {/* Features */}
      {!searchTerm && !selectedCategory && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="Truck" className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Fast Delivery</h3>
            <p className="text-gray-600 text-sm">Quick and reliable delivery to your doorstep</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="Shield" className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Secure Payment</h3>
            <p className="text-gray-600 text-sm">Safe and secure payment options</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="Headphones" className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">24/7 Support</h3>
            <p className="text-gray-600 text-sm">Round the clock customer support</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;