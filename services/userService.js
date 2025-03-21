import { UserRepository } from "../repositories/userRepository.js";
import prisma from "../config/client.js";
import { hashPassword } from "../utils/hashing.js";
export class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async getUsers(page = 1, limit = 10) {
    return await  this.userRepository.getUsers(page,limit)
  }


  async getPaginationInfo(page =1, limit = 10) {
    return await this.userRepository.getPaginationInfo( page, limit);
  }
  async getOneUser({id}){
    return this.userRepository.getOneUser({id})
  }
  async updateUser({id,email,password,isAdmin,name}){
    
  let userExist=await this.userRepository.getOneUser({id})

const updateFileds={}
 if(password){
  const newPassword= await hashPassword(password,10)
  updateFileds.password=newPassword
 }
 if(name)updateFileds.name=name
 if(isAdmin !==undefined)updateFileds.isAdmin=isAdmin
 if(email)updateFileds.email=email
 
    return await this.userRepository.updateUser(updateFileds,{id}) || userExist
    
  }
  async deleteUser({id}){
    return await this.userRepository.deleteUser({id})
  }
}
