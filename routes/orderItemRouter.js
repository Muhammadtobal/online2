import { OrderItemController } from "../controllers/orderItemController.js";
import verifyToken from "../middlewares/identifaction.js";
import express from "express"
const orderItemRouter=express.Router()
const orderItemController= new OrderItemController()
orderItemRouter.post("/create-orderitem",verifyToken(),orderItemController.createOrderItem.bind(orderItemController))
orderItemRouter.get("/getall-orderitem",verifyToken(),orderItemController.getOrderItems.bind(orderItemController))
orderItemRouter.get("/getone-orderitem/:id",verifyToken(),orderItemController.getOneOrderItem.bind(orderItemController))
orderItemRouter.put("/update-orderitem/:id",verifyToken(),orderItemController.updateOrderItem.bind(orderItemController))
orderItemRouter.delete("/delete-orderitem/:id",verifyToken(),orderItemController.deleteOrderItem.bind(orderItemController))
orderItemRouter.get("/getmany-orderitem/:id",verifyToken(),orderItemController.getMany.bind(orderItemController))

export default orderItemRouter