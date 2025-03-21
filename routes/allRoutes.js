import categoryRouter from "./categoryRouter.js";
import userRouter from "./userRouter.js";
import productRouter from "./productRouter.js";
import cartRouter from "./cartRouter.js";
import orderRouter from "./orderRouter.js";
import orderItemRouter from "./orderItemRouter.js";
import cartItemRouter from "../routes/cartItemRouter.js"
import paymentRouter from "./paymentRouter.js";
import authRouter from "./authRoutes.js";
import express from "express";

const router = express.Router();
router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/category", categoryRouter);
router.use("/product", productRouter);
router.use("/cart", cartRouter);
router.use("/order", orderRouter);
router.use("/orderitem", orderItemRouter);
router.use("/cartitem", cartItemRouter);
router.use("/payment", paymentRouter);
export default router;
