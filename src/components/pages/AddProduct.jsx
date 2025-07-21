import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";
import { productService } from "@/services/api/productService";
import { categoryService } from "@/services/api/categoryService";
import { toast } from "react-toastify";

const AddProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    imageUrl: "",
    isActive: true
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock)
      };

      await productService.create(productData);
      toast.success("Product added successfully!");
      navigate("/store");
    } catch (error) {
      toast.error("Failed to add product. Please try again.");
      console.error("Error adding product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/store")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ApperIcon name="ArrowLeft" className="w-5 h-5 text-gray-600" />
          </button>
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
            <ApperIcon name="Plus" className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
            <p className="text-gray-600">Add a product to your store</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white"
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.Id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (₹) *
              </label>
              <Input
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Enter price"
                required
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock Quantity *
              </label>
              <Input
                name="stock"
                type="number"
                min="0"
                value={formData.stock}
                onChange={handleInputChange}
                placeholder="Enter stock quantity"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter product description"
              rows="4"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 resize-none"
              required
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Image URL
            </label>
            <Input
              name="imageUrl"
              type="url"
              value={formData.imageUrl}
              onChange={handleInputChange}
              placeholder="Enter image URL (optional)"
            />
            <p className="text-sm text-gray-500 mt-1">
              Leave empty to use a placeholder image
            </p>
          </div>

          {/* Active Status */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="isActive"
              id="isActive"
              checked={formData.isActive}
              onChange={handleInputChange}
              className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
              Make product active (visible to customers)
            </label>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/store")}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={loading}
              icon="Plus"
              className="flex-1"
            >
              Add Product
            </Button>
          </div>
        </form>
      </div>

      {/* Preview */}
      {(formData.name || formData.price) && (
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
          <div className="max-w-sm">
            <div className="border border-gray-200 rounded-xl p-4">
              <img
                src={formData.imageUrl || "/api/placeholder/300/300"}
                alt={formData.name || "Product"}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h4 className="font-semibold text-gray-900 mb-2">
                {formData.name || "Product Name"}
              </h4>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                {formData.description || "Product description"}
              </p>
              <div className="flex items-center justify-between">
                <div className="price-tag">
                  ₹{formData.price || "0"}
                </div>
                <div className="text-sm text-gray-500">
                  Stock: {formData.stock || "0"}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;