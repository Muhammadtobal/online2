import prisma from "../config/client.js";
import { paginate, getPaginationInfo } from "../utils/pagenation.js";
export class ProductRepository {
  async createProduct({
    name,
    price,
    description,
    categoryId,
    status,
    quantity,
    imageFile,
  }) {
    return await prisma.product.create({
      data: {
        name,
        price: Number(price),
        description,
        categoryId: Number(categoryId),
        status,
        quantity: Number(quantity),
        image: imageFile,
      },
    });
  }
  async getProducts(page, limit) {
    return await paginate(prisma.product, page, limit);
  }
  async getPaginationInfo(page, limit) {
    return await getPaginationInfo(prisma.product, page, limit);
  }
  async getOneProduct({ id }) {
    return await prisma.product.findUnique({ where: { id: Number(id) } });
  }
  async updateProduct(updateFileds, { id }) {
    return await prisma.product.update({
      where: { id: Number(id) },
      data: updateFileds,
    });
  }
  async deleteProduct({ id }) {
    return await prisma.product.delete({ where: { id: Number(id) } });
  }
  async findManyProduct({ id }) {
    return await prisma.product.findMany({ where: { categoryId: Number(id) } });
  }
  async UpdateQuantity({ quantity, productId }) {
    return await prisma.product.update({
      where: { id: Number(productId) },
      data: {
        quantity,
      },
    });
  }
  async decrementQuantity({ quantity, productId }) {
    return await prisma.product.update({
      where: { id: productId },
      data: {
        quantity: { decrement: quantity },
      },
    });
  }
  
}
