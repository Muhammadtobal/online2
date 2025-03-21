import { getOneUserSchema, updateUserSchema } from "../middlewares/validat.js";
import { UserService } from "../services/userService.js"

export class UserController{
constructor
(){
    this.userservice= new UserService()
}
    async getUsers(req,res,next){
        
         try {
            const page = parseInt(req.query.page ) || 1;
            const limit = parseInt(req.query.limit ) || 10;
      
           
         const allUser=await this.userservice.getUsers(page,limit)
         const paginationInfo= await this.userservice.getPaginationInfo(page,limit)
            res.status(200).json({
            message: "success",
            data: allUser,
            pagination: paginationInfo,
          });
        } catch (error) {
            next(error )
        }
    }
    async getOneUser(req,res,next){
        try {
            const id=Number(req.params.id)
            await getOneUserSchema.validateAsync({id})
            const result = await this.userservice.getOneUser({id})
            res.status(200).json({message:"success",data:result})
        } catch (error) {
            next(error)
        }
    }
async updateUser(req,res,next){
    try {
        const id=Number(req.params.id)
        const {email,name,password,isAdmin}=req.body
       
        await updateUserSchema.validateAsync({id,email,password,isAdmin,name})
       const update= await this.userservice.updateUser({id,email,password,isAdmin,name})
        res.status(200).json({message:"success update",data:update
        })
    } catch (error) {
        next(error)
    }
}
async deleteUser(req,res,next){
    try {
        const id = Number(req.params.id)
        await getOneUserSchema.validateAsync({id})
         await this.userservice.deleteUser({id})
        res.status(200).json({message:"success delete"})
    } catch (error) {
        next(error)
    }
}
} 