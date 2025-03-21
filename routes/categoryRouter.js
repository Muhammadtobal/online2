import {categoryPath} from "../utils/uploads.js"
import verifyToken from "../middlewares/identifaction.js";
import fs from "fs"
import express from "express"
import multer from "multer";
import { CategoryController } from "../controllers/categoryController.js";
const categoryRouter=express.Router()

if (!fs.existsSync(categoryPath)) {
    fs.mkdirSync(categoryPath, { recursive: true });
  }
  
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, categoryPath);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}${file.originalname}`);
    },
  });
  
  const uploads = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
  });
  const  categoryController= new CategoryController()
  categoryRouter.post("/create-category",verifyToken(true),uploads.single("image"),categoryController.createCategory.bind(categoryController),uploads.none())
  categoryRouter.get("/getall-category",verifyToken(true),categoryController.getCategories.bind(categoryController))
  categoryRouter.get("/getone-category/:id",verifyToken(true),categoryController.getOneCategory.bind(categoryController))
  categoryRouter.put("/update-category/:id",uploads.single("image"),categoryController.updateCategory.bind(categoryController),uploads.none())
  categoryRouter.delete("/delete-category/:id",verifyToken(true),categoryController.deleteCategory.bind(categoryController))
  export default categoryRouter