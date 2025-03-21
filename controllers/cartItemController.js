import {
  createCartItemSchema,
  getOneCartItemSchema,
  updateCartItemSchema,
} from "../middlewares/validat.js";
import { CartItemService } from "../services/cartItemService.js";

export class CartItemController {
  constructor() {
    this.cartItemService = new CartItemService();
  }
  async createCartItem(req, res, next) {
    try {
      const { productId, cartId, quantity } = req.body;
      await createCartItemSchema.validateAsync({ productId, cartId, quantity });
      const result = await this.cartItemService.createCartItem({
        productId,
        cartId,
        quantity,
      });
      res.status(201).json({ message: "success", data: result });
    } catch (error) {
      next(error);
    }
  }
  async getCartItems(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const allCartItem = await this.cartItemService.getCartItems(page, limit);
      const paginationInfo = await this.cartItemService.getPaginationInfo(
        page,
        limit
      );
      res.status(200).json({
        message: "success",
        data: allCartItem,
        pagination: paginationInfo,
      });
    } catch (error) {
      next(error);
    }
  }
  async getOneCartItem(req, res, next) {
    try {
      const id = Number(req.params.id);
      await getOneCartItemSchema.validateAsync({ id });
      const result = await this.cartItemService.getOneCartItem({ id });
      res.status(200).json({ message: "success", data: result });
    } catch (error) {
      next(error);
    }
  }
  async updatecartItem(req,res,next){
    try {
        const id =Number(req.params.id)
        const {quantity}=req.body
        await updateCartItemSchema.validateAsync({quantity,id})
        const result= await this.cartItemService.updatecartItem({id,quantity})
        res.status(200).json({message:"success",data:result})
    } catch (error) {
        next(error)
    }
  }
  async deleteCartItem(req,res,next){
    try {
        const id=Number(req.params.id)
        await getOneCartItemSchema.validateAsync({id})
        await this.cartItemService.deleteCartItem({id})
        res.status(200).json({message:"success"})

    } catch (error) {
        next(error)
    }
  }
}
