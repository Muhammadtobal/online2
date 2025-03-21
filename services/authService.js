import { AuthRepository } from "../repositories/authRepository.js";
import { comparePassword,  hashPassword } from "../utils/hashing.js";
export class AuthService{
    constructor() {
        this.authRepository = new AuthRepository();
      }
    async signUp({name,password,email}){
        const admin= email==="admin@gmail.com"?true :false
        console.log(password)
        const newPassword = await hashPassword(password, 10);
        console.log(newPassword)
        return await this.authRepository.signUp({name,password:newPassword,email,isAdmin:admin})
    }
    async  logIn({email,password}) {
        const user= await this.authRepository.findByEmail({email})
        
        const compare= await comparePassword(password,user.password)
        if(!compare){
            throw new Error("the Password wrong ...!")
        }
        return user
    }
}