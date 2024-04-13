import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import userModel from '../../../DB/model/user.model.js';
import sendEmail from '../../utils/sendEmail.js';

export const signup = async (req,res)=>{
   const {userName,email,password} = req.body;
   const user = await userModel.findOne({email});
   if(user){
    return res.status(409).json({message:"email already exists"});
   }
   const hashPassword = await bcrypt.hash(password,parseInt(process.env.SALTROUND))
   const newUser = await userModel.create({userName,email,password:hashPassword});
   if(!newUser){
      return res.status(400).json({message:"error while create user !!"})
   } 
   const token = await jwt.sign({email},process.env.CONFIRMEMAILTOKEN,{expiresIn:60*1});
   const refreshToken = await jwt.sign({email},process.env.CONFIRMEMAILTOKEN,{expiresIn:60*60*24*30});
   const html = `<div>
   <h2>Register Email</h2>
   <p>Please confirm your email !!</p>
   <a href='${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}'>Confirm Email</a>
   <a href='${req.protocol}://${req.headers.host}/auth/confirmEmail/${refreshToken}'>Resend to confirm email</a>
   </div>`;
   await sendEmail(email,`Hello ${userName}`,html);

   return res.status(201).json({message:"success",newUser});
}

export const signin = async (req,res)=>{
   const {email,password} = req.body;
   const user = await userModel.findOne({email}).select('userName password confirmEmail');
   if(!user){
    return res.json({message:"email not exists"});
   }
   if(!user.confirmEmail){
      return res.json({message:"please confirm your email !!"});
     }
   const match = await bcrypt.compare(password,user.password)
   if(!match){
      return res.json({message:"invalid password"});
   }
  
   const token = jwt.sign({id:user._id},process.env.SIGNINSIGN)
   return res.json({message:"success",token})
}

export const confirmEmail = async (req,res)=>{
   const {token} = req.params;
   const decoded = jwt.verify(token,process.env.CONFIRMEMAILTOKEN)
   const user = await userModel.updateOne({email:decoded.email} ,
       {confirmEmail:true});
    if(user.modifiedCount > 0){
      return res.redirect(process.env.FEURL);
    }
}

