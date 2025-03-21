import { OrderRepository } from "../repositories/orderRepository.js";
export class OrderService {
  constructor() {
    this.orderRepository = new OrderRepository();
  }
  async createOrder({ userId }) {
    return this.orderRepository.createOrder({ userId });
  }
  async getOrders(page, limit) {
    return await this.orderRepository.getOrders(page, limit);
  }
  async getPaginationInfo(page, limit) {
    return await this.orderRepository.getPaginationInfo(page, limit);
  }
  async getOneOrder({ id }) {
    return await this.orderRepository.getOneOrder({ id });
  }
  async updateOrder({ id, status }) {
    const updateFildes = {};
    if (status) updateFildes.status = status;
    return await this.orderRepository.updateOrder({ id }, updateFildes);
  }
  async deleteOrder({id}){
    return await this.orderRepository.deleteOrder({id})
    
  }
 
}
