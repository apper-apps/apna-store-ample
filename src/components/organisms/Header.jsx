import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import Badge from "@/components/atoms/Badge";
import { useCart } from "@/hooks/useCart";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim()) {
      navigate(`/?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const isHomePage = location.pathname === "/";

  return (
    <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            onClick={() => navigate("/")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
              <ApperIcon name="Store" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                RL Apna Store
              </h1>
              <p className="text-xs text-gray-500">आसान ऑनलाइन शॉपिंग</p>
            </div>
          </div>

          {/* Search Bar - Only on home page */}
          {isHomePage && (
            <div className="flex-1 max-w-2xl mx-8 hidden md:block">
              <SearchBar 
                placeholder="Search for products, brands and more..."
                onSearch={handleSearch}
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Mobile Search Toggle */}
            {isHomePage && (
              <button className="md:hidden p-2 text-gray-600 hover:text-primary-600">
                <ApperIcon name="Search" className="w-6 h-6" />
              </button>
            )}

            {/* Cart */}
            <button
              onClick={() => navigate("/cart")}
              className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <ApperIcon name="ShoppingCart" className="w-6 h-6" />
              {totalItems > 0 && (
                <Badge 
                  variant="danger" 
                  size="sm"
                  className="absolute -top-1 -right-1 min-w-[20px] h-5 flex items-center justify-center text-xs"
                >
                  {totalItems > 99 ? "99+" : totalItems}
                </Badge>
              )}
            </button>

            {/* Store Management */}
            <button
              onClick={() => navigate("/store")}
              className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <ApperIcon name="Settings" className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isHomePage && (
          <div className="md:hidden pb-4">
            <SearchBar 
              placeholder="Search products..."
              onSearch={handleSearch}
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;