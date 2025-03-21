import prisma from "../config/client.js";
import { getPaginationInfo, paginate } from "../utils/pagenation.js";
export class UserRepository {
  async getUsers(page, limit) {
    return await paginate(prisma.user, page, limit);
  }
  async getPaginationInfo(page, limit) {
    return await getPaginationInfo(prisma.user, page, limit);
  }
  async getOneUser({ id }) {
    const result = await prisma.user.findUnique({ where: { id: Number(id) } });
    return result;
  }
  async updateUser(updateFileds, { id }) {
    return await prisma.user.update({
      where: { id: Number(id) },
      data: updateFileds,
    });
  }
  async deleteUser({ id }) {
    return await prisma.user.delete({ where: { id: Number(id) } });
  }
}
