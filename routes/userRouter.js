import { UserController } from "../controllers/userController.js";
import verifyToken from "../middlewares/identifaction.js";
import express from "express"
const userRouter= express.Router()
const userController= new UserController()
userRouter.get("/getall-user",//verifyToken(true)
userController.getUsers.bind(userController))
userRouter.get("/getone-user/:id",verifyToken(true),userController.getOneUser.bind(userController))
userRouter.put("/update-user/:id",verifyToken(),userController.updateUser.bind(userController))
userRouter.delete("/delete-user/:id",verifyToken(true),userController.deleteUser.bind(userController))
export default userRouter