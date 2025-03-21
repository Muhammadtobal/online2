import prisma from "../config/client.js";
export class AuthRepository {
  async signUp({ name, password, email,isAdmin }) {
    
   
    return await prisma.user.create({
      data: { name, email, password,isAdmin },
    });
  }
  async findByEmail({email}){
    const user= await prisma.user.findUnique({where:{email:email}})
   return user

  }
}
