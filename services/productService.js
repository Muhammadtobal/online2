import { ProductRepository } from "../repositories/productRepository.js";
import { deleteFile, productPath } from "../utils/uploads.js";
export class ProductService {
  constructor() {
    this.productRepository = new ProductRepository();
  }
  async createProduct({
    name,
    price,
    description,
    categoryId,
    status,
    quantity,
    imageFile,
  }) {
    if (!imageFile) {
      throw new Error("image null");
    }
    return await this.productRepository.createProduct({
      name,
      price,
      description,
      categoryId,
      status,
      quantity,
      imageFile,
    });
  }
  async getProducts(page, limit) {
    return await this.productRepository.getProducts(page, limit);
  }
  async getPaginationInfo(page, limit) {
    return await this.productRepository.getPaginationInfo(page, limit);
  }
  async getOneProduct({ id }) {
    return await this.productRepository.getOneProduct({ id });
  }
  async updateProduct({
    id,
    name,
    price,
    description,
    categoryId,
    status,
    quantity,
    image,
  }) {
    let productExist = await this.productRepository.getOneProduct({ id });
    const updateFileds = {};
    if (image && image !== undefined) {
      deleteFile(productExist.image, productPath);

      updateFileds.image = image;
    } else {
      throw new Error("the image null");
    }
    if (price) updateFileds.price = Number(price);
    if (name) updateFileds.name = name;
    if (status) updateFileds.status = status;
    if (quantity) updateFileds.quantity = Number(quantity);
    if (description) updateFileds.description = description;
    if (categoryId) updateFileds.categoryId = Number(categoryId);
    return (
      (await this.productRepository.updateProduct(updateFileds, { id })) ||
      productExist
    );
  }
  async deleteProduct({ id }) {
    const productExist= await this.productRepository.getOneProduct({id})
    deleteFile(productExist.image,productPath)
    return await this.productRepository.deleteProduct({ id });
  }
  async deleteAllProduct({id}){
        
  }
}
