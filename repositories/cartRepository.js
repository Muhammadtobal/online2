import prisma from "../config/client.js";
import { paginate, getPaginationInfo } from "../utils/pagenation.js";

export class CartRepository{
    async createCart({userId}){
        return await prisma.cart.create({data:{userId:Number(userId)}})
    }
    async getCarts(page,limit){
        return await paginate(prisma.cart,page,limit)
    }
    async getPaginationInfo(page,limit){
        return await getPaginationInfo(prisma.cart,page,limit)
    }
    async getOneCart({id}){
        return await prisma.cart.findUnique({where:{id:Number(id)},include:{user:true}})
    }
async updateCart(updateFileds,{id})
  {
    return await prisma.cart.update({where:{id:Number(id)},data:updateFileds})
  }
  async deleteCart({id}){
    return await prisma.cart.delete({where:{id:Number(id)}})
  }
}