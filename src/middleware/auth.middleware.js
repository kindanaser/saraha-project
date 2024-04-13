import jwt from 'jsonwebtoken'
import userModel from '../../DB/model/user.model.js'
const auth = async (req,res,next)=>{
   const {authorization} = req.headers;
   if(!authorization.startsWith(process.env.BEARERKEY)){
    return res.json({meseeage:"Invalid authorization"});
   }
   const token = authorization.split(process.env.BEARERKEY)[1];
   if(!token){
    return res.json({meseeage:"user not found"});
   } 
   const decoded = await jwt.verify(token,process.env.SIGNINSIGN);
   const authUser = await userModel.findById(decoded.id).select('userName');
   req.user = authUser;
   next(); 
}
export default auth ;