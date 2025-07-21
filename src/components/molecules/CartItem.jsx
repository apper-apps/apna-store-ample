import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { useCart } from "@/hooks/useCart";

const CartItem = ({ item, className }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(item.productId);
    } else {
      updateQuantity(item.productId, newQuantity);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className={cn("flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm", className)}>
      <img
        src={item.imageUrl || "/api/placeholder/80/80"}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-lg"
      />
      
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
        <p className="text-gray-600 text-sm">{item.category}</p>
        <div className="price-tag text-lg">
          {formatPrice(item.price * item.quantity)}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuantityChange(item.quantity - 1)}
          icon="Minus"
          className="w-8 h-8 p-0"
        />
        
        <span className="w-12 text-center font-semibold">
          {item.quantity}
        </span>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuantityChange(item.quantity + 1)}
          icon="Plus"
          className="w-8 h-8 p-0"
        />
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => removeFromCart(item.productId)}
        icon="Trash2"
        className="text-red-500 hover:text-red-700 w-8 h-8 p-0"
      />
    </div>
  );
};

export default CartItem;