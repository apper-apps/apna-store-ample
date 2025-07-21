import React, { useState, useEffect } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { orderService } from "@/services/api/orderService";
import { format } from "date-fns";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await orderService.getAll();
      // Sort by newest first
      const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setOrders(sortedData);
    } catch (err) {
      setError("Failed to load orders. Please try again.");
      console.error("Error loading orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { variant: "warning", icon: "Clock", label: "Pending" },
      confirmed: { variant: "info", icon: "CheckCircle", label: "Confirmed" },
      shipped: { variant: "primary", icon: "Truck", label: "Shipped" },
      delivered: { variant: "success", icon: "Package", label: "Delivered" },
      cancelled: { variant: "danger", icon: "X", label: "Cancelled" }
    };

    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <ApperIcon name={config.icon} className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  const filteredOrders = orders.filter(order => {
    if (filter === "all") return true;
    return order.status === filter;
  });

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadOrders} />;
  if (!orders.length) {
    return (
      <Empty 
        message="No orders found"
        action="Start Shopping"
        icon="Package"
        onAction={() => window.location.href = "/"}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
              <ApperIcon name="Package" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
              <p className="text-gray-600">{orders.length} total orders</p>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            {["all", "pending", "confirmed", "shipped", "delivered"].map((status) => (
              <Button
                key={status}
                variant={filter === status ? "primary" : "outline"}
                size="sm"
                onClick={() => setFilter(status)}
              >
                {status === "all" ? "All" : status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.Id} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-gray-900">
                    Order #{order.Id}
                  </h3>
                  {getStatusBadge(order.status)}
                </div>
                <p className="text-sm text-gray-600">
                  Placed on {format(new Date(order.createdAt), "dd MMM yyyy, hh:mm a")}
                </p>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                  {formatPrice(order.totalAmount)}
                </div>
                <p className="text-sm text-gray-600">
                  {order.items.length} item{order.items.length > 1 ? "s" : ""}
                </p>
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-3 mb-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <img
                    src={item.imageUrl || "/api/placeholder/60/60"}
                    alt={item.name}
                    className="w-15 h-15 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <div className="font-semibold text-gray-900">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery Address */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                <ApperIcon name="MapPin" className="w-4 h-4" />
                Delivery Address
              </h4>
              <div className="text-sm text-gray-600">
                <p className="font-medium">{order.deliveryAddress.name}</p>
                <p>{order.deliveryAddress.address}</p>
                <p>{order.deliveryAddress.city}, {order.deliveryAddress.pincode}</p>
                <p>Phone: {order.deliveryAddress.phone}</p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <ApperIcon name="Banknote" className="w-4 h-4" />
                Payment: {order.paymentMethod === "cod" ? "Cash on Delivery" : "Online"}
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" icon="Eye">
                  View Details
                </Button>
                {order.status === "delivered" && (
                  <Button variant="outline" size="sm" icon="MessageSquare">
                    Review
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <Empty 
          message={`No ${filter} orders found`}
          action="View All Orders"
          onAction={() => setFilter("all")}
        />
      )}
    </div>
  );
};

export default Orders;