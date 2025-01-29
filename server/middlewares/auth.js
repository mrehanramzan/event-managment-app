import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const auth = async(request, response, next)=>{
    try{
        const token = request.cookies.Token;
        console.log(token);
        if(!token) 
            return response.status(401).json({
                message:"Not Authorized. Login again",
                success:false
            })
        const decodeToken = await jwt.verify(token,process.env.JWT_SECRET_KEY);
        if(!decodeToken)
            return response.status(401).json({
                message:"Unathorized access",
                success:false,
            })
        request.user_id = decodeToken.id;
        next();
    }catch(error){
        next(error);
    }
}

export default auth;