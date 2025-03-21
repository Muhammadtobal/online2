import prisma from "../config/client.js";
import { paginate, getPaginationInfo } from "../utils/pagenation.js";
export class CartItemRepository {
  async createCartItem({ productId, cartId, quantity }) {
    return await prisma.cartItem.create({
      data: {
        productId: Number(productId),
        cartId: Number(cartId),
        quantity: Number(quantity),
      },
    });
  }
  async getCartItems(page, limit) {
    return await paginate(prisma.cartItem, page, limit);
  }
  async getPaginationInfo(page, limit) {
    return await getPaginationInfo(prisma.cartItem, page, limit);
  }
  async getOneCartItem({ id }) {
    return prisma.cartItem.findUnique({
      where: { id: Number(id) },
      include: { product: true, cart: true },
    });
  }
  async updatecartItem({id},updateFileds){
    return await prisma.cartItem.update({where:{id:Number(id)},data:updateFileds})
  }
  async deleteCartItem({id}){
    return await prisma.cartItem.delete({where:{id:Number(id)}})
  }
}
