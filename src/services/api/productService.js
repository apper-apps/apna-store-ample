import productsData from "@/services/mockData/products.json";

class ProductService {
  constructor() {
    this.products = [...productsData];
  }

  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...this.products];
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return this.products.find(product => product.Id === id) || null;
  }

  async create(productData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const newId = Math.max(...this.products.map(p => p.Id)) + 1;
    const newProduct = {
      Id: newId,
      ...productData,
      createdAt: new Date().toISOString()
    };
    
    this.products.push(newProduct);
    return newProduct;
  }

  async update(id, updateData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const index = this.products.findIndex(product => product.Id === id);
    if (index === -1) {
      throw new Error("Product not found");
    }
    
    this.products[index] = {
      ...this.products[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    
    return this.products[index];
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = this.products.findIndex(product => product.Id === id);
    if (index === -1) {
      throw new Error("Product not found");
    }
    
    this.products.splice(index, 1);
    return true;
  }
}

export const productService = new ProductService();