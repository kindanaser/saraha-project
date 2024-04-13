export const asyncHandler = (func) =>{
    return (req,res,next)=>{
        func(req,res,next).catch(err=>{
            return res.json({message:"catch error",error :err.stack});
        })
    }
}