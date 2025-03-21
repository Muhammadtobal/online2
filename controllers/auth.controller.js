
import jwt  from "jsonwebtoken";
import { logInSechema, signUpSchema } from "../middlewares/validat.js";
import { AuthService } from "../services/authService.js";
export class AuthController{
  constructor() {
    this.authService = new AuthService();
  }
  async signUp(req,res,next){
  try {
    const {name,password,email}=req.body
   
    await signUpSchema.validateAsync({name,password,email})
    console.log(password); 
   const newUser= await this.authService.signUp({name,password,email})
   res.status(201).json({message:"success",data:newUser})
  } catch (error) {
    next(error)
  }
  }
async logIn(req,res,next){
  try {
    const {email,password}=req.body
    await logInSechema.validateAsync({email,password})
     const user=await this.authService.logIn({email,password})
   const token=this.generateToken(user)
     res
     .cookie("Authorization", "Bearer " + token, {
      maxAge: 8 * 3600000,
       httpOnly: process.env.NODE_ENV === "production",
       secure: process.env.NODE_ENV === "production",
       sameSite: "Strict",
     })
     .status(200)
     .json({ success: true, token:token, message: "Login SUCCESS" });
  } catch (error) {
    next(error)
  }
}
 generateToken(user) {
  return jwt.sign(
    {
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.SECRET_TOKEN,
    { expiresIn: "8h", algorithm: "HS256" }
  );
}
async logOut(req,res){
  res.clearCookie("Authorization", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    path: "/",
  });
  res.status(200).json({ success: true, message: "Logout SUCCESS" });
  
}

}
