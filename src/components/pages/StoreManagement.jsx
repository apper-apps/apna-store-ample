import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "@/components/molecules/ProductCard";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { productService } from "@/services/api/productService";
import { orderService } from "@/services/api/orderService";
import { toast } from "react-toastify";

const StoreManagement = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      const [productsData, ordersData] = await Promise.all([
        productService.getAll(),
        orderService.getAll()
      ]);
      setProducts(productsData);
      setOrders(ordersData);
    } catch (err) {
      setError("Failed to load store data. Please try again.");
      console.error("Error loading store data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await productService.delete(productId);
        setProducts(products.filter(p => p.Id !== productId));
        toast.success("Product deleted successfully");
      } catch (error) {
        toast.error("Failed to delete product");
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleToggleProductStatus = async (product) => {
    try {
      const updatedProduct = { ...product, isActive: !product.isActive };
      await productService.update(product.Id, updatedProduct);
      setProducts(products.map(p => p.Id === product.Id ? updatedProduct : p));
      toast.success(`Product ${updatedProduct.isActive ? 'activated' : 'deactivated'} successfully`);
    } catch (error) {
      toast.error("Failed to update product status");
      console.error("Error updating product:", error);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStats = () => {
    const totalProducts = products.length;
    const activeProducts = products.filter(p => p.isActive).length;
    const lowStockProducts = products.filter(p => p.stock < 10 && p.stock > 0).length;
    const outOfStockProducts = products.filter(p => p.stock === 0).length;
    
    const pendingOrders = orders.filter(o => o.status === "pending").length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    
    return {
      totalProducts,
      activeProducts,
      lowStockProducts,
      outOfStockProducts,
      pendingOrders,
      totalRevenue
    };
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;

  const stats = getStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
              <ApperIcon name="Store" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Store Management</h1>
              <p className="text-gray-600">Manage your products and orders</p>
            </div>
          </div>
          
          <Button
            onClick={() => navigate("/store/add-product")}
            icon="Plus"
          >
            Add Product
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: "overview", label: "Overview", icon: "BarChart3" },
              { id: "products", label: "Products", icon: "Package" },
              { id: "orders", label: "Orders", icon: "ShoppingCart" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <ApperIcon name={tab.icon} className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 text-sm font-medium">Total Products</p>
                      <p className="text-3xl font-bold text-blue-900">{stats.totalProducts}</p>
                    </div>
                    <ApperIcon name="Package" className="w-8 h-8 text-blue-600" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 text-sm font-medium">Active Products</p>
                      <p className="text-3xl font-bold text-green-900">{stats.activeProducts}</p>
                    </div>
                    <ApperIcon name="CheckCircle" className="w-8 h-8 text-green-600" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-amber-600 text-sm font-medium">Low Stock</p>
                      <p className="text-3xl font-bold text-amber-900">{stats.lowStockProducts}</p>
                    </div>
                    <ApperIcon name="AlertTriangle" className="w-8 h-8 text-amber-600" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-red-600 text-sm font-medium">Out of Stock</p>
                      <p className="text-3xl font-bold text-red-900">{stats.outOfStockProducts}</p>
                    </div>
                    <ApperIcon name="XCircle" className="w-8 h-8 text-red-600" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-600 text-sm font-medium">Pending Orders</p>
                      <p className="text-3xl font-bold text-purple-900">{stats.pendingOrders}</p>
                    </div>
                    <ApperIcon name="Clock" className="w-8 h-8 text-purple-600" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-primary-50 to-accent-100 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-primary-600 text-sm font-medium">Total Revenue</p>
                      <p className="text-2xl font-bold text-primary-900">{formatPrice(stats.totalRevenue)}</p>
                    </div>
                    <ApperIcon name="TrendingUp" className="w-8 h-8 text-primary-600" />
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button
                      onClick={() => navigate("/store/add-product")}
                      icon="Plus"
                      className="w-full"
                      variant="outline"
                    >
                      Add New Product
                    </Button>
                    <Button
                      onClick={() => setActiveTab("products")}
                      icon="Package"
                      className="w-full"
                      variant="outline"
                    >
                      Manage Products
                    </Button>
                    <Button
                      onClick={() => setActiveTab("orders")}
                      icon="ShoppingCart"
                      className="w-full"
                      variant="outline"
                    >
                      View Orders
                    </Button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {orders.slice(0, 3).map((order) => (
                      <div key={order.Id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Order #{order.Id}</p>
                          <p className="text-sm text-gray-600">{formatPrice(order.totalAmount)}</p>
                        </div>
                        <Badge variant="warning" size="sm">
                          {order.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === "products" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  All Products ({products.length})
                </h3>
                <Button
                  onClick={() => navigate("/store/add-product")}
                  icon="Plus"
                  size="sm"
                >
                  Add Product
                </Button>
              </div>

              {products.length === 0 ? (
                <Empty 
                  message="No products in your store"
                  action="Add Your First Product"
                  onAction={() => navigate("/store/add-product")}
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <div key={product.Id} className="relative">
                      <ProductCard product={product} />
                      
                      {/* Action Buttons */}
                      <div className="absolute top-2 right-2 flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => navigate(`/store/edit-product/${product.Id}`)}
                          icon="Edit"
                          className="w-8 h-8 p-0 bg-white shadow-md"
                        />
                        <Button
                          size="sm"
                          variant={product.isActive ? "outline" : "success"}
                          onClick={() => handleToggleProductStatus(product)}
                          icon={product.isActive ? "EyeOff" : "Eye"}
                          className="w-8 h-8 p-0 bg-white shadow-md"
                        />
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleDeleteProduct(product.Id)}
                          icon="Trash2"
                          className="w-8 h-8 p-0 bg-white shadow-md"
                        />
                      </div>

                      {/* Status Badge */}
                      {!product.isActive && (
                        <Badge 
                          variant="gray" 
                          className="absolute top-2 left-2"
                        >
                          Inactive
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Orders ({orders.length})
              </h3>

              {orders.length === 0 ? (
                <Empty 
                  message="No orders received yet"
                  action="View Products"
                  onAction={() => setActiveTab("products")}
                />
              ) : (
                <div className="space-y-4">
                  {orders.slice(0, 10).map((order) => (
                    <div key={order.Id} className="border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            Order #{order.Id}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {order.deliveryAddress.name} • {order.deliveryAddress.phone}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-primary-600">
                            {formatPrice(order.totalAmount)}
                          </div>
                          <Badge variant="warning" size="sm">
                            {order.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Items: {order.items.length}</p>
                          <p className="text-gray-600">Payment: {order.paymentMethod === "cod" ? "Cash on Delivery" : "Online"}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Address: {order.deliveryAddress.city}</p>
                          <p className="text-gray-600">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreManagement;