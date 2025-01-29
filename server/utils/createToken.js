import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const createToken = async (payload)=>{
    return await jwt.sign(payload, process.env.JWT_SECRET_KEY,{ expiresIn:'7d'} );
}

export default createToken;