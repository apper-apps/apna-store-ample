class OrderService {
  constructor() {
    this.orders = [];
    this.loadFromStorage();
  }

  loadFromStorage() {
    try {
      const savedOrders = localStorage.getItem("rl-apna-store-orders");
      if (savedOrders) {
        this.orders = JSON.parse(savedOrders);
      }
    } catch (error) {
      console.error("Error loading orders from localStorage:", error);
      this.orders = [];
    }
  }

  saveToStorage() {
    try {
      localStorage.setItem("rl-apna-store-orders", JSON.stringify(this.orders));
    } catch (error) {
      console.error("Error saving orders to localStorage:", error);
    }
  }

  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...this.orders];
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return this.orders.find(order => order.Id === id) || null;
  }

  async create(orderData) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newId = this.orders.length > 0 ? Math.max(...this.orders.map(o => o.Id)) + 1 : 1;
    const newOrder = {
      Id: newId,
      ...orderData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.orders.push(newOrder);
    this.saveToStorage();
    return newOrder;
  }

  async update(id, updateData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const index = this.orders.findIndex(order => order.Id === id);
    if (index === -1) {
      throw new Error("Order not found");
    }
    
    this.orders[index] = {
      ...this.orders[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    
    this.saveToStorage();
    return this.orders[index];
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = this.orders.findIndex(order => order.Id === id);
    if (index === -1) {
      throw new Error("Order not found");
    }
    
    this.orders.splice(index, 1);
    this.saveToStorage();
    return true;
  }

  async updateStatus(id, status) {
    return this.update(id, { status });
  }
}

export const orderService = new OrderService();