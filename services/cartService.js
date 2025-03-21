import { CartRepository } from "../repositories/cartRepository.js";
export class CartService{
    constructor(){
        this.cartRepository= new CartRepository()
    }
    async createCart({userId}){
  return await this.cartRepository.createCart({userId})
    }
    async getCarts(page,limit){
        return await this.cartRepository.getCarts(page,limit)
    }
    async getPaginationInfo(page,limit){
        return await this.cartRepository.getPaginationInfo(page,limit)
    }
    async getOneCart({id}){
        return await this.cartRepository.getOneCart({id})
    }

  async updateCart({id,userId}){
    const updateFileds={}
    if(userId)updateFileds.userId=Number(userId)
    return await this.cartRepository.updateCart(updateFileds,{id})
  }
  async deleteCart({id}){
    return await this.cartRepository.deleteCart({id})
}
}