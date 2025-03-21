import express from "express";
import fs from "fs";
import multer from "multer";
import { productPath } from "../utils/uploads.js";
import { ProductController } from "../controllers/productController.js";
import verifyToken from "../middlewares/identifaction.js";
const productRouter = express.Router();
const productController = new ProductController();
if (!fs.existsSync(productPath)) {
  fs.mkdirSync(productPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, productPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

const uploads = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

productRouter.post(
  "/create-product",verifyToken(true),uploads.single("image"),
  productController.createProduct.bind(productController),uploads.none()
);
productRouter.get("/getall-product",verifyToken(true),productController.getProducts.bind(productController))
productRouter.get("/getone-product/:id",verifyToken(true),productController.getOneProduct.bind(productController))
productRouter.put("/update-product/:id",verifyToken(true),uploads.single("image"),productController.updateProduct.bind(productController),uploads.none())
productRouter.delete("/delete-product/:id",verifyToken(true),productController.deleteProduct.bind(productController))
export default productRouter;
