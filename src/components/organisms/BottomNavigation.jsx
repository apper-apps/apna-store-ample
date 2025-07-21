import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import { useCart } from "@/hooks/useCart";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    {
      id: "home",
      label: "Home",
      icon: "Home",
      path: "/",
      badge: null
    },
    {
      id: "categories",
      label: "Categories",
      icon: "Grid3X3",
      path: "/categories",
      badge: null
    },
    {
      id: "cart",
      label: "Cart",
      icon: "ShoppingCart",
      path: "/cart",
      badge: totalItems > 0 ? totalItems : null
    },
    {
      id: "orders",
      label: "Orders",
      icon: "Package",
      path: "/orders",
      badge: null
    },
    {
      id: "store",
      label: "Store",
      icon: "Store",
      path: "/store",
      badge: null
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigation(item.path)}
            className={cn(
              "flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200",
              isActive(item.path)
                ? "text-primary-600 bg-primary-50"
                : "text-gray-600 hover:text-primary-600"
            )}
          >
            <div className="relative">
              <ApperIcon 
                name={item.icon} 
                className={cn(
                  "w-6 h-6",
                  isActive(item.path) ? "text-primary-600" : "text-gray-600"
                )} 
              />
              {item.badge && (
                <Badge 
                  variant="danger" 
                  size="sm"
                  className="absolute -top-2 -right-2 min-w-[16px] h-4 flex items-center justify-center text-xs"
                >
                  {item.badge > 99 ? "99+" : item.badge}
                </Badge>
              )}
            </div>
            <span className={cn(
              "text-xs font-medium",
              isActive(item.path) ? "text-primary-600" : "text-gray-600"
            )}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;