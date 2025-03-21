import { CartItemRepository } from "../repositories/cartItemRepository.js";

export class CartItemService {
  constructor() {
    this.cartItemRepository = new CartItemRepository();
  }
  async createCartItem({ productId, cartId, quantity }) {
    return await this.cartItemRepository.createCartItem({
      productId,
      cartId,
      quantity,
    });
  }
  async getCartItems(page, limit) {
    return await this.cartItemRepository.getCartItems(page, limit);
  }
  async getPaginationInfo(page, limit) {
    return await this.cartItemRepository.getPaginationInfo(page, limit);
  }
  async getOneCartItem({id}){
    return await this.cartItemRepository.getOneCartItem({id})
  }
  async updatecartItem({quantity,id}){
    const updateFileds={}
    if(quantity)updateFileds.quantity=quantity
    return await this.cartItemRepository.updatecartItem({id},updateFileds)
  }
  async deleteCartItem({id}){
    return await this.cartItemRepository.deleteCartItem({id})
  }
}
