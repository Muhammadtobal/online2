import { OrderController } from "../controllers/orderController.js";
import verifyToken from "../middlewares/identifaction.js";
import express from "express";
const orderRouter = express.Router();
const orderController = new OrderController();
orderRouter.post(
  "/create-order",verifyToken(),
  orderController.createOrder.bind(orderController)
);
orderRouter.get(
  "/getall-order",verifyToken(true),
  orderController.getOrders.bind(orderController)
);
orderRouter.get(
  "/getone-order/:id",verifyToken(true),
  orderController.getOneOrder.bind(orderController)
);
orderRouter.put(
    "/update-order/:id",verifyToken(),
    orderController.updateOrder.bind(orderController)
  );
  orderRouter.delete(
    "/delete-order/:id",verifyToken(),
    orderController.deleteOrder.bind(orderController)
  );

export default orderRouter;
