import prisma from "../config/client.js";
import { paginate, getPaginationInfo } from "../utils/pagenation.js";

export class CategoryRepository {
  async createCategory({ human, color, size, imagefile }) {
    return await prisma.category.create({
      data: {
        human,
        color,
        size,
        image: imagefile,
      },
    });
  }
  async getCategories(query, limit) {
    return await paginate(prisma.category, query, limit);
  }
  async getPaginationInfo(query, limit) {
    return await getPaginationInfo(prisma.category, query, limit);
  }
  async getOneCategory({ id }) {
    return await prisma.category.findUnique({ where: { id: Number(id) } });
  }
  async updateCategory(updateFileds, { id }) {
    return await prisma.category.update({
      where: { id: Number(id) },
      data: updateFileds,
    });
  }
  async deleteCategory({id}){
    await prisma.category.delete({where:{id:Number(id)}})
  }
}
