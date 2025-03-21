import { createCartSchema, getOnecartSchema, updateCartSchema } from "../middlewares/validat.js";
import { CartService } from "../services/cartService.js";

export class CartController{
constructor(){
    this.cartService=new CartService()
}
async createCart(req,res,next){
    try {
      const {userId}=req.body
      await createCartSchema.validateAsync({userId})  
      const result= await this.cartService.createCart({userId})
      res.status(201).json({message:"success",data:result})
    } catch (error) {
      next(error)  
    }
}
async getCarts(req,res,next){
    try {
        const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const allCategory = await this.cartService.getCarts(page, limit);
      const paginationInfo = await this.cartService.getPaginationInfo(
        page,
        limit
      );
      res.status(200).json({
        message: "success",
        data: allCategory,
        pagination: paginationInfo,
      });
    } catch (error) {
        next(error)
    }
}
async getOneCart(req,res,next){
    try {
        const id = Number(req.params.id)
        await getOnecartSchema.validateAsync({id})
        const result= await this.cartService.getOneCart({id})
      res.status(200).json({message:"success",data:result})
        
    } catch (error) {
        next(error)
    }
}
async updateCart(req,res,next){
    try {
        const id=Number(req.params.id)
const {userId}=req.body
        await updateCartSchema.validateAsync({id,userId})
        const result= await this.cartService.updateCart({id,userId})
        res.status(200).json({message:"success",data:result})
          
    } catch (error) {
        next(error)
    }
}
async deleteCart(req,res,next){
    try {
        const id = Number(req.params.id)
        await getOnecartSchema.validateAsync({id})
      await this.cartService.deleteCart({id})
      res.status(200).json({message:"success"})
        
    } catch (error) {
        next(error)
    }
}
}