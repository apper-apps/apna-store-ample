import categoriesData from "@/services/mockData/categories.json";

class CategoryService {
  constructor() {
    this.categories = [...categoriesData];
  }

  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 200));
    return [...this.categories].sort((a, b) => a.displayOrder - b.displayOrder);
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 150));
    return this.categories.find(category => category.Id === id) || null;
  }

  async create(categoryData) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const newId = Math.max(...this.categories.map(c => c.Id)) + 1;
    const newCategory = {
      Id: newId,
      ...categoryData,
      displayOrder: this.categories.length + 1
    };
    
    this.categories.push(newCategory);
    return newCategory;
  }

  async update(id, updateData) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = this.categories.findIndex(category => category.Id === id);
    if (index === -1) {
      throw new Error("Category not found");
    }
    
    this.categories[index] = {
      ...this.categories[index],
      ...updateData
    };
    
    return this.categories[index];
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 250));
    
    const index = this.categories.findIndex(category => category.Id === id);
    if (index === -1) {
      throw new Error("Category not found");
    }
    
    this.categories.splice(index, 1);
    return true;
  }
}

export const categoryService = new CategoryService();