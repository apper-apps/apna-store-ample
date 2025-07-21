import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { productService } from "@/services/api/productService";
import { useCart } from "@/hooks/useCart";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await productService.getById(parseInt(id));
      if (!data) {
        setError("Product not found");
        return;
      }
      setProduct(data);
    } catch (err) {
      setError("Failed to load product details");
      console.error("Error loading product:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadProduct} />;
  if (!product) return <Error message="Product not found" />;

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <button 
          onClick={() => navigate("/")}
          className="hover:text-primary-600"
        >
          Home
        </button>
        <ApperIcon name="ChevronRight" className="w-4 h-4" />
        <button 
          onClick={() => navigate("/categories")}
          className="hover:text-primary-600"
        >
          Categories
        </button>
        <ApperIcon name="ChevronRight" className="w-4 h-4" />
        <span className="text-gray-900">{product.category}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <img
            src={product.imageUrl || "/api/placeholder/500/500"}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-3">
                <Badge variant="secondary">{product.category}</Badge>
                {product.stock < 10 && product.stock > 0 && (
                  <Badge variant="warning">
                    Only {product.stock} left
                  </Badge>
                )}
                {product.stock === 0 && (
                  <Badge variant="danger">Out of Stock</Badge>
                )}
              </div>
            </div>

            <div className="price-tag text-4xl">
              {formatPrice(product.price)}
            </div>

            <p className="text-gray-600 text-lg leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center gap-4 py-4 border-t border-gray-200">
              <span className="font-semibold text-gray-900">Stock:</span>
              <span className="flex items-center gap-2">
                <ApperIcon name="Package" className="w-5 h-5 text-gray-600" />
                {product.stock} units available
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="font-semibold text-gray-900">Quantity:</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  icon="Minus"
                  disabled={quantity <= 1}
                />
                <span className="w-12 text-center font-semibold text-lg">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  icon="Plus"
                  disabled={quantity >= product.stock}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <Button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                icon="ShoppingCart"
                className="flex-1"
              >
                Add to Cart
              </Button>
              <Button
                variant="secondary"
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                icon="Zap"
                className="flex-1"
              >
                Buy Now
              </Button>
            </div>

            {product.stock === 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-red-700">
                  <ApperIcon name="AlertCircle" className="w-5 h-5" />
                  <span className="font-medium">Out of Stock</span>
                </div>
                <p className="text-red-600 text-sm mt-1">
                  This product is currently out of stock. Please check back later.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="Truck" className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Free Delivery</h3>
          <p className="text-gray-600 text-sm">Free delivery on orders above ₹499</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="RotateCcw" className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Easy Returns</h3>
          <p className="text-gray-600 text-sm">7-day return policy</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="Shield" className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Warranty</h3>
          <p className="text-gray-600 text-sm">1 year manufacturer warranty</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;