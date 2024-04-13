import messageModel from "../../../DB/model/message.model.js";
import userModel from "../../../DB/model/user.model.js";

export const getMessages = async(req,res)=>{
    
    const messages = await messageModel.find({receiverId:req.user._id})
    .select('content createdAt')
    
    return res.json({message:"success",messages});
}

export const sendMessages = async (req,res)=>{
    const {receiverId} = req.params;
    const {message} = req.body;
    
    const user = await userModel.findById(receiverId);
    if(!user){
        return res.status(404).json({message:"user not found"})
    }
    const createMessage = await messageModel.create({receiverId , content:message})
    return res.status(201).json({message:"sucess",createMessage});
}
