import { PaymentController } from "../controllers/paymentController.js";
import verifyToken from "../middlewares/identifaction.js";
import express from "express";
const paymentRouter = express.Router();
const paymentController = new PaymentController();
paymentRouter.post(
  "/create-payment",verifyToken(),
  paymentController.createPayment.bind(paymentController)
);
paymentRouter.get(
  "/getall-payment",verifyToken(true),
  paymentController.getPayments.bind(paymentController)
);
export default paymentRouter;
