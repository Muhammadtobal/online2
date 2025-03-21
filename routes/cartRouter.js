import verifyToken from "../middlewares/identifaction.js";

import { CartController } from "../controllers/cartController.js";
import express from "express";
const cartRouter = express.Router();
const cartController = new CartController();
cartRouter.post("/create-cart",verifyToken(true), cartController.createCart.bind(cartController));
cartRouter.get("/getall-cart",verifyToken(true), cartController.getCarts.bind(cartController));
cartRouter.get("/getone-cart/:id",verifyToken(true), cartController.getOneCart.bind(cartController));
cartRouter.put("/update-cart/:id",verifyToken(true), cartController.updateCart.bind(cartController));
cartRouter.delete("/delete-cart/:id", verifyToken(true),cartController.deleteCart.bind(cartController));
export default cartRouter;
