import mongoose from 'mongoose';

const connectDB = () =>{
   mongoose.connect(process.env.DB)
   .then( ()=>{
    console.log("connected successfully !!!");
   }).catch( (error)=>{
    console.log(`error to connect DB ${error}`);
   })
}
export default connectDB;