import verifyToken from "../middlewares/identifaction.js";

import { CartItemController } from "../controllers/cartItemController.js";
import express from "express";
const cartItemRouter = express.Router();
const cartItemController = new CartItemController();
cartItemRouter.post(
  "/create-cartitem",verifyToken(),
  cartItemController.createCartItem.bind(cartItemController)
);
cartItemRouter.get(
    "/getall-cartitem",verifyToken(true),
    cartItemController.getCartItems.bind(cartItemController)
  );
  cartItemRouter.get(
    "/getone-cartitem/:id",verifyToken(true),
    cartItemController.getOneCartItem.bind(cartItemController)
  );
  cartItemRouter.put(
    "/update-cartitem/:id",verifyToken(),
    cartItemController.updatecartItem.bind(cartItemController)
  );
  cartItemRouter.delete(
    "/delete-cartitem/:id",verifyToken(),
    cartItemController.deleteCartItem.bind(cartItemController)
  );
export default cartItemRouter;
