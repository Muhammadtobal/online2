import { OrderService } from "../services/orderService.js";
import {
  createOrderSchema,
  getOneOrderSchema,
  updateOrderSchema,
} from "../middlewares/validat.js";
export class OrderController {
  constructor() {
    this.orderService = new OrderService();
  }
  async createOrder(req, res, next) {
    try {
      const { userId } = req.body;
      await createOrderSchema.validateAsync({ userId });
      const result = await this.orderService.createOrder({ userId });
      res.status(201).json({ message: "success", data: result });
    } catch (error) {
      next(error);
    }
  }
  async getOrders(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const allOrder = await this.orderService.getOrders(page, limit);
      const paginationInfo = await this.orderService.getPaginationInfo(
        page,
        limit
      );
      res.status(200).json({
        message: "success",
        data: allOrder,
        pagination: paginationInfo,
      });
    } catch (error) {
      next(error);
    }
  }
  async getOneOrder(req, res, next) {
    try {
      const id = Number(req.params.id);
      await getOneOrderSchema.validateAsync({ id });
      const result = await this.orderService.getOneOrder({ id });
      res.status(200).json({ message: "success", data: result });
    } catch (error) {
      next(error);
    }
  }
  async updateOrder(req, res, next) {
    try {
      const id = Number(req.params.id);
      const { status } = req.body;
      await updateOrderSchema.validateAsync({ id, status });
      await this.orderService.updateOrder({ id, status });

      res.status(200).json({ message: "success" });
    } catch (error) {
      next(error);
    }
  }
  async deleteOrder(req,res,next){
    try {
        const id=Number(req.params.id)
     await getOneOrderSchema.validateAsync({id})
     await this.orderService.deleteOrder({id})
     res.status(200).json({ message: "success" });

    } catch (error) {
        next(error)
    }
  }
}
