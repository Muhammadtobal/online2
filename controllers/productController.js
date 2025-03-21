import { ProductService } from "../services/productService.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../middlewares/validat.js";
import { deleteFile, productPath } from "../utils/uploads.js";
import { getOneProdutSchema } from "../middlewares/validat.js";
export class ProductController {
  constructor() {
    this.productService = new ProductService();
  }
  async createProduct(req, res, next) {
    try {
      const { name, price, description, categoryId, status, quantity } =
        req.body;

      await createProductSchema.validateAsync({
        name,
        price,
        description,
        categoryId,
        status,
        quantity,
      });
      const imageFile = req.file ? req.file.filename : undefined;
      const result = await this.productService.createProduct({
        name,
        price,
        description,
        categoryId,
        status,
        quantity,
        imageFile,
      });

      res.status(201).json({ message: "success", data: result });
    } catch (error) {
      if (req.file) {
        deleteFile(req.file.filename, productPath);
      }
      next(error);
    }
  }
  async getProducts(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const allProduct = await this.productService.getProducts(page, limit);
      const paginationInfo = await this.productService.getPaginationInfo(
        page,
        limit
      );
      res.status(200).json({
        message: "success",
        data: allProduct,
        pagination: paginationInfo,
      });
    } catch (error) {}
  }
  async getOneProduct(req, res, next) {
    try {
      const id = Number(req.params.id);
      await getOneProdutSchema.validateAsync({ id });
      const result = await this.productService.getOneProduct({ id });
      res.status(201).json({ message: "success", data: result });
    } catch (error) {
      next(error);
    }
  }
  async updateProduct(req, res, next) {
    try {
      const id = Number(req.params.id);
      const { name, price, description, categoryId, status, quantity } =
        req.body;
      const image = req.file ? req.file.filename : undefined;
      await updateProductSchema.validateAsync({
        id,
        name,
        price,
        description,
        categoryId,
        status,
        quantity,
      });
      const result = await this.productService.updateProduct({
        id,
        name,
        price,
        description,
        categoryId,
        status,
        quantity,
        image,
      });
      res.status(200).json({message:"success",data:result})
    } catch (error) {
      if(req.file){
        deleteFile(req.file.filename,productPath)
      }
      next(error)
    }
  }
  async deleteProduct(req,res,next){
    try {
      const id= Number(req.params.id)
      await getOneProdutSchema.validateAsync({id})
      await this.productService.deleteProduct({id})
      res.status(200).json({message:"success"})
    } catch (error) {
      next(error)
    }
  }
}
