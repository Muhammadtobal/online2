import prisma from "../config/client.js";
import { paginate, getPaginationInfo } from "../utils/pagenation.js";

export class OrderItemRepository {
  async createOrderItem({ orderId, productId, quantity, price }) {
    return await prisma.orderItem.create({
      data: {
        orderId: Number(orderId),
        productId: Number(productId),
        quantity: Number(quantity),
        price: Number(price),
      },
    });
  }
  async getOrderItems(page, limit) {
    return await paginate(prisma.orderItem, page, limit);
  }
  async getPaginationInfo(page, limit) {
    return await getPaginationInfo(prisma.orderItem, page, limit);
  }
  async getOneOrderItem({ id }) {
    return await prisma.orderItem.findFirst({
      where: { id: Number(id) },
      include: { order: true, product: true },
    });
  }
  async updateOrderItem(updateFildes, { id }) {
    return prisma.orderItem.update({
      where: { id: Number(id) },
      data: updateFildes,
    });
  }
  async deleteOrderItem({ id }) {
    return await prisma.orderItem.delete({ where: { id: Number(id) } });
  }
  async findProductAndOrder({productId,orderId}){
    const orderItem = await prisma.orderItem.findFirst({
      where: {
        productId: Number(productId),
        orderId: Number(orderId)
      }
    });
  
    return orderItem; 
  }
  async updateQunatity({id},updateFildes){
    return await prisma.orderItem.update({where:{id:Number(id)},
  data:updateFildes})
  }
async getMany({id}){
  return await prisma.orderItem.findMany({where:{orderId:id},include:{product:true}})
}
}
