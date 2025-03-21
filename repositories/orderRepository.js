import prisma from "../config/client.js";
import { paginate, getPaginationInfo } from "../utils/pagenation.js";
export class OrderRepository {
  async createOrder({ userId }) {
    return await prisma.order.create({
      data: {
        userId,
        quantity: 0,
        totalPrice: 0,
      },
    });
  }
  async getOrders(page, limit) {
    return await paginate(prisma.order, page, limit);
  }
  async getPaginationInfo(page, limit) {
    return await getPaginationInfo(prisma.order, page, limit);
  }
  async getOneOrder({ id }) {
    return await prisma.order.findUnique({
      where: { id: Number(id) },
      include: { user: true },
    });
  }
  async updateOrder({ id }, updateFildes) {
    return await prisma.order.update({
      where: { id: Number(id) },
      data: updateFildes,
    });
  }
  async deleteOrder({ id }) {
    return await prisma.order.delete({ where: { id: Number(id) } });
  }
  async OrderProperty({ orderId, price, quantity }) {
    return await prisma.order.update({
      where: { id: Number(orderId) },
      data: {
        quantity: { increment: quantity },
        totalPrice: { increment: price * quantity },
      },
    });
  }
  async updateOrderProperty({ orderId, price, quantity }) {
    await prisma.order.update({
      where: { id: Number(orderId) },
      data: {
        quantity,
        totalPrice: price,
      },
    });
  }
  
}
