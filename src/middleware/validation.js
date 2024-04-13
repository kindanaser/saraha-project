const dataMethods = ['body','query','params','headers'];
const validation =(schema)=>{
    return(req,res,next)=>{
        const errors = [];
        dataMethods.forEach(key=>{
         if(schema[key]){
            const validationResult = schema[key].validate(req[key],{abortEarly:false});
            if(validationResult.error){
                errors.push(validationResult.error);
            }
        }
        })
             
        if(errors.length > 0){
           return res.json({message:"validation error",errors})
        } 
        next()
    } 
}
export default validation;