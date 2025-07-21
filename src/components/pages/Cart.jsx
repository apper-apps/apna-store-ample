import React from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "@/components/molecules/CartItem";
import Button from "@/components/atoms/Button";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { useCart } from "@/hooks/useCart";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (cartItems.length === 0) {
    return (
      <Empty 
        message="Your cart is empty"
        action="Start Shopping"
        icon="ShoppingCart"
        onAction={() => navigate("/")}
      />
    );
  }

  const total = calculateTotal();
  const deliveryCharge = total < 499 ? 50 : 0;
  const finalTotal = total + deliveryCharge;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
              <ApperIcon name="ShoppingCart" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
              <p className="text-gray-600">{cartItems.length} items in your cart</p>
            </div>
          </div>
          
          <Button
            variant="outline"
            onClick={clearCart}
            icon="Trash2"
            size="sm"
          >
            Clear Cart
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <CartItem key={`${item.productId}-${item.name}`} item={item} />
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl p-6 shadow-sm h-fit sticky top-24">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Order Summary
          </h2>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
              <span className="font-semibold">{formatPrice(total)}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Charges</span>
              <span className="font-semibold">
                {deliveryCharge === 0 ? (
                  <span className="text-green-600">FREE</span>
                ) : (
                  formatPrice(deliveryCharge)
                )}
              </span>
            </div>
            
            {total < 499 && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-amber-800 text-sm">
                  Add {formatPrice(499 - total)} more for free delivery!
                </p>
              </div>
            )}
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total Amount</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                  {formatPrice(finalTotal)}
                </span>
              </div>
            </div>
            
            <Button
              onClick={() => navigate("/checkout")}
              className="w-full"
              size="lg"
              icon="CreditCard"
            >
              Proceed to Checkout
            </Button>
            
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="w-full"
              icon="ShoppingBag"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="Shield" className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Secure Checkout</h3>
          <p className="text-gray-600 text-sm">Your payment information is protected</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="Truck" className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Fast Delivery</h3>
          <p className="text-gray-600 text-sm">Quick delivery to your location</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="RotateCcw" className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Easy Returns</h3>
          <p className="text-gray-600 text-sm">Hassle-free return policy</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;