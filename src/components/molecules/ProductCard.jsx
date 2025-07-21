import React from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import { useCart } from "@/hooks/useCart";
import { toast } from "react-toastify";

const ProductCard = ({ product, className }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleCardClick = () => {
    navigate(`/product/${product.Id}`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div
      onClick={handleCardClick}
      className={cn(
        "card p-4 cursor-pointer group",
        className
      )}
    >
      <div className="relative mb-4">
        <img
          src={product.imageUrl || "/api/placeholder/300/300"}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg"
        />
        {product.stock < 10 && product.stock > 0 && (
          <Badge variant="warning" className="absolute top-2 left-2">
            Only {product.stock} left
          </Badge>
        )}
        {product.stock === 0 && (
          <Badge variant="danger" className="absolute top-2 left-2">
            Out of Stock
          </Badge>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="price-tag">
            {formatPrice(product.price)}
          </div>
          
          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            icon="ShoppingCart"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Add
          </Button>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <ApperIcon name="Package" className="w-4 h-4" />
            Stock: {product.stock}
          </span>
          <span className="flex items-center gap-1">
            <ApperIcon name="Tag" className="w-4 h-4" />
            {product.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;