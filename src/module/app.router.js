import messageRouter from './message/message.router.js'
import authRouter from './auth/auth.router.js'
import userRouter from './user/user.router.js'
import connectDB from '../../DB/connection.js'

const initApp =(app,express)=>{
    app.use(express.json());
    connectDB()
    app.use('/message',messageRouter);
    app.use('/auth',authRouter);
    app.use('/user',userRouter);
}
export default initApp;