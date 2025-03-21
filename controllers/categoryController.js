import {
  createCategorySchema,
  getOneCategorySchema,
  updateCategorySchema,
} from "../middlewares/validat.js";
import { CategoryService } from "../services/categoryService.js";
import { deleteFile, categoryPath } from "../utils/uploads.js";

export class CategoryController {
  constructor() {
    this.categoryService = new CategoryService();
  }
  async createCategory(req, res, next) {
    try {
      const { human, color, size } = req.body;
      const imagefile = req.file ? req.file.filename : undefined;
      await createCategorySchema.validateAsync({ human, color, size });
      const result = await this.categoryService.createCategory({
        human,
        color,
        size,
        imagefile,
      });
      res.status(201).json({ message: "success", data: result });
    } catch (error) {
      if (req.file) deleteFile(req.file.filename, categoryPath);
      next(error);
    }
  }
  async getCategories(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const allCategory = await this.categoryService.getCategories(page, limit);
      const paginationInfo = await this.categoryService.getPaginationInfo(
        page,
        limit
      );
      res.status(200).json({
        message: "success",
        data: allCategory,
        pagination: paginationInfo,
      });
    } catch (error) {
      next(error);
    }
  }
  async getOneCategory(req, res, next) {
    try {
      const id = Number(req.params.id);
      await getOneCategorySchema.validateAsync({ id });
      const result = await this.categoryService.getOneCategory({ id });
      res.status(200).json({ message: "success", data: result });
    } catch (error) {
      next(error);
    }
  }
  async updateCategory(req, res, next) {
    try {
      const id = Number(req.params.id);
      const { human, size, color } = req.body;
      const imageFile = req.file ? req.file.filename :null
      await updateCategorySchema.validateAsync({ id, human, size, color});

      const result = await this.categoryService.updateCategory({
        id,
        human,
        size,
        color,
        image:imageFile,
      });
      res.status(200).json({message:"success",data:result})
    } catch (error) {
        if(req.file)
        deleteFile(req.file.filename,categoryPath)
      next(error);
    }
  }
  async deleteCategory(req,res,next){
    try {
      const id = req.params.id
      await getOneCategorySchema.validateAsync({id})
      await this.categoryService.deleteCategory({id})
      res.status(200).json({message:"success delete"})
    } catch (error) {
      next(error)
    }
  }
}
