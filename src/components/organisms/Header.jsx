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
      {/* Contact Information Bar */}
      <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="text-center md:text-left"
            style={{ lineHeight: '1.8em', fontSize: '16px' }}
          >
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6">
              {/* Phone / WhatsApp */}
              <a 
                href="tel:+919876543210" 
                className="flex items-center gap-2 hover:text-white/80 transition-colors"
              >
                <span>📞</span>
                <strong>Call / WhatsApp:</strong>
                <span>+91-9876543210</span>
              </a>
              
              {/* Email */}
              <a 
                href="mailto:rl.apnastore@gmail.com" 
                className="flex items-center gap-2 hover:text-white/80 transition-colors"
              >
                <span>📧</span>
                <strong>Email:</strong>
                <span className="underline">rl.apnastore@gmail.com</span>
              </a>
              
              {/* Location */}
              <div className="flex items-center gap-2">
                <span>📍</span>
                <strong>Location:</strong>
                <span>Pune, Maharashtra, India</span>
              </div>
            </div>
            
            {/* Second row for social media */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6 mt-1">
              {/* Instagram */}
              <a 
                href="https://instagram.com/rlapnastore" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white/80 transition-colors"
              >
                <span>📱</span>
                <strong>Instagram:</strong>
                <span className="underline">instagram.com/rlapnastore</span>
              </a>
              
              {/* Facebook */}
              <a 
                href="https://facebook.com/rlapnastore" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white/80 transition-colors"
              >
                <span>💬</span>
                <strong>Facebook:</strong>
                <span className="underline">facebook.com/rlapnastore</span>
              </a>
              
              {/* Telegram */}
              <a 
                href="https://t.me/rlapnastore" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white/80 transition-colors"
              >
                <span>✉️</span>
                <strong>Telegram:</strong>
                <span className="underline">t.me/rlapnastore</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Header */}
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
      
      {/* Footer Links Bar */}
      <div className="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm">
            <a 
              href="/contact" 
              className="flex items-center gap-1 hover:text-white/80 transition-colors"
            >
              <span>📞</span>
              <span>Contact Us</span>
            </a>
            
            <span className="hidden md:inline text-white/60">|</span>
            
            <a 
              href="/return-policy" 
              className="flex items-center gap-1 hover:text-white/80 transition-colors"
            >
              <span>📦</span>
              <span>Return Policy</span>
            </a>
            
            <span className="hidden md:inline text-white/60">|</span>
            
            <a 
              href="/shipping-policy" 
              className="flex items-center gap-1 hover:text-white/80 transition-colors"
            >
              <span>🚚</span>
              <span>Shipping Policy</span>
            </a>
            
            <span className="hidden md:inline text-white/60">|</span>
            
            <a 
              href="/terms-conditions" 
              className="flex items-center gap-1 hover:text-white/80 transition-colors"
            >
              <span>⚖️</span>
              <span>Terms & Conditions</span>
            </a>
            
            <span className="hidden md:inline text-white/60">|</span>
            
            <a 
              href="/privacy-policy" 
              className="flex items-center gap-1 hover:text-white/80 transition-colors"
            >
              <span>🔒</span>
              <span>Privacy Policy</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;