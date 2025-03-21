import { OrderItemService } from "../services/orderItemService.js";
import {
  createOrderItemSchema,
  getOneOrderItemSchema,
  getOneOrderSchema,
  updateOrderItemSchema,
} from "../middlewares/validat.js";
export class OrderItemController {
  constructor() {
    this.orderItemService = new OrderItemService();
  }
  async createOrderItem(req, res, next) {
    try {
      const { orderId, productId, quantity } = req.body;
      await createOrderItemSchema.validateAsync({
        orderId,
        productId,
        quantity,
      });
      const result = await this.orderItemService.createOrderItem({
        orderId,
        productId,
        quantity,
      });
      res.status(201).json({ message: "success", data: result });
    } catch (error) {
      next(error);
    }
  }
  async getOrderItems(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const allOrderItem = await this.orderItemService.getOrderItems(
        page,
        limit
      );
      const paginationInfo = await this.orderItemService.getPaginationInfo(
        page,
        limit
      );
      res.status(200).json({
        message: "success",
        data: allOrderItem,
        pagination: paginationInfo,
      });
    } catch (error) {}
  }
  async getOneOrderItem(req, res, next) {
    try {
      const id = Number(req.params.id);
      await getOneOrderItemSchema.validateAsync({ id });
      const result = await this.orderItemService.getOneOrderItem({ id });
      res.status(201).json({ message: "success", data: result });
    } catch (error) {
      next(error);
    }
  }
  async updateOrderItem(req, res, next) {
    try {
      const id = Number(req.params.id);
      const { quantity } = req.body;
      await updateOrderItemSchema.validateAsync({ id, quantity });
      const result = await this.orderItemService.updateOrderItem({
        id,
        quantity,
      });
      res.status(200).json({ message: "success", data: result });
    } catch (error) {
      next(error);
    }
  }
  async deleteOrderItem(req, res, next) {
    try {
      const id = Number(req.params.id);
      await getOneOrderItemSchema.validateAsync({ id });
      await this.orderItemService.deleteOrderItem({ id });
      res.status(200).json({ message: "success" });
    } catch (error) {
      next(error);
    }
  }
  async getMany(req, res, next) {
    try {
      const id = Number(req.params.id);

      const result = await this.orderItemService.getMany({ id });
      res.status(200).json({ message: "success", data: result });
    } catch (error) {
      next(error);
    }
  }
}
