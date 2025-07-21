import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CategoryCard from "@/components/molecules/CategoryCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { categoryService } from "@/services/api/categoryService";

const CategoryGrid = ({ selectedCategory, onCategorySelect, showAll = false }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (err) {
      setError("Failed to load categories. Please try again.");
      console.error("Error loading categories:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category) => {
    if (onCategorySelect) {
      onCategorySelect(category);
    } else {
      navigate(`/categories?category=${category.id}`);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadCategories} />;
  if (!categories.length) return <Empty message="No categories available" />;

  const displayCategories = showAll ? categories : categories.slice(0, 8);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
      {displayCategories.map((category) => (
        <CategoryCard
          key={category.Id}
          category={category}
          onClick={() => handleCategoryClick(category)}
          isActive={selectedCategory?.Id === category.Id}
        />
      ))}
      
      {!showAll && categories.length > 8 && (
        <CategoryCard
          category={{
            name: "View All",
            icon: "Grid3X3"
          }}
          onClick={() => navigate("/categories")}
          className="border-2 border-dashed border-primary-300 bg-primary-50"
        />
      )}
    </div>
  );
};

export default CategoryGrid;