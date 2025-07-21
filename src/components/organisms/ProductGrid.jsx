import React, { useState, useEffect } from "react";
import ProductCard from "@/components/molecules/ProductCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { productService } from "@/services/api/productService";

const ProductGrid = ({ category, searchTerm, limit }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProducts();
  }, [category, searchTerm]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");
      let data = await productService.getAll();
      
      // Filter by category
      if (category) {
        data = data.filter(product => 
          product.category.toLowerCase() === category.toLowerCase()
        );
      }
      
      // Filter by search term
      if (searchTerm) {
        data = data.filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      // Filter only active products
      data = data.filter(product => product.isActive);
      
      // Apply limit if specified
      if (limit) {
        data = data.slice(0, limit);
      }
      
      setProducts(data);
    } catch (err) {
      setError("Failed to load products. Please try again.");
      console.error("Error loading products:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadProducts} />;
  if (!products.length) {
    return (
      <Empty 
        message={
          searchTerm 
            ? `No products found for "${searchTerm}"` 
            : category 
            ? `No products found in ${category} category`
            : "No products available"
        }
        action={searchTerm || category ? "Clear filters" : "Add products"}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.Id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;