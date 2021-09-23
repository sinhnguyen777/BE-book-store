import jwt from 'jwt-then';
import dotenv from 'dotenv';
dotenv.config();
export const generateToken =async (user) => {

    try {
        const token= await jwt.sign({
            _id:user._id,
            username:user.username,
            deviceId:user.deviceId,
            isAdmin:user.isAdmin,
           
        },
        process.env.JWT_SECRET || 'something secret',
        {
            expiresIn: '2h',
        });
        return token;
    } catch (error) {
        console.log(error)
        return;
    }
}
export const isAuth =async (req,res,next) => {
    const authorization = req.headers.authorization;
    
    if(authorization){
        const token = authorization.slice(7,authorization.length); //Bearer xxx
        try {
            const user = await jwt.verify(
                token,
                process.env.JWT_SECRET
            ); 
            req.user = user;
            next();
        } catch (error) {
            res.status(401).send({message:'Invalid Token'})
        }
        
    }else{
        res.status(401).send({message:"no token"});
    }
}
export const  isAdmin = (req,res,next) => {
    if(req.user?.isAdmin){
        next();
    }
    res.status(401).send({message:'Invalid Admin token'})
}
