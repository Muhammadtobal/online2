import { CategoryRepository } from "../repositories/categoryRepository.js";
import { categoryPath, deleteFile, productPath } from "../utils/uploads.js";
import {ProductRepository} from "../repositories/productRepository.js"
export class CategoryService {
  constructor() {
    this.categoryRepository = new CategoryRepository();
    this.productRpository= new ProductRepository()
  }
  async createCategory({ human, color, size, imagefile }) {
    if (!imagefile) {
      throw new Error("image null");
    }
    return await this.categoryRepository.createCategory({
      human,
      color,
      size,
      imagefile,
    });
  }
  async getCategories(page, limit) {
    return await this.categoryRepository.getCategories(page, limit);
  }
  async getPaginationInfo(page, limit) {
    return await this.categoryRepository.getPaginationInfo(page, limit);
  }
  async getOneCategory({ id }) {
    return await this.categoryRepository.getOneCategory({ id });
  }
  async updateCategory({ id, human, size, color, image }) {
    let categoryExist = await this.categoryRepository.getOneCategory({id});
  
    const updateFileds={}

    if(human)updateFileds.human=human
    if(size)updateFileds.size=size
    if(color)updateFileds.color=color
  
if(image && image !== undefined ){
deleteFile(categoryExist.image,categoryPath)
 
  updateFileds.image=image
}else{
  throw new Error("the image null")
} 
return await this.categoryRepository.updateCategory(updateFileds,{id}) || categoryExist
  }
  async deleteCategory({id}){
    const categoryExist= await this.categoryRepository.getOneCategory({id})
    deleteFile(categoryExist.image,categoryPath)
    const products = await this.productRpository.findManyProduct({id:Number(id)})
    products.forEach((product) => {
    if (product.image) {
      deleteFile(product.image, productPath  );
    }
  });

    await this.categoryRepository.deleteCategory({id})
  }
}
