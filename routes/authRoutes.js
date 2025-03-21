import verifyToken from "../middlewares/identifaction.js";
import { AuthController } from "../controllers/auth.controller.js";
import express from "express";
const authRouter = express.Router();
const authController = new AuthController();
authRouter.post("/signup-auth", authController.signUp.bind(authController));
authRouter.post("/login-auth", authController.logIn.bind(authController));
authRouter.get(
  "/logOut-auth",
  verifyToken(),
  authController.logOut.bind(authController)
);

export default authRouter;
