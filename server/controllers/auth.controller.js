import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import Joi from "joi";
import createToken from "../utils/createToken.js";

export async function register(request, response, next){
    try{
        
        const {fullname, email, password} = request.body;
        const schema = Joi.object({
            fullname:Joi.string().min(3).max(35).default(null),
            email:Joi.string().email().required(),
            password: Joi.string().min(8).max(20).required()
        })        
        const {error} = schema.validate(request.body);
        if(error){
            return response.status(400).json({
                message:error.details[0].message,
                success:false,
            })
        }
        const user = await User.findOne({email})
        if(user){
            return response.status(409).json({
                message:"User already exists",
                success:false,
            })
        }
        const hashedPassword = await bcryptjs.hash(password,10);
        const storeUser = await new User({fullname, email ,password: hashedPassword}).save();
        return response.status(201).json({
            message:"User created successfully",
            success:true
        });

    }catch(error){
        next(error)
    }


}


export async function login(request, response, next){

    try{
        const {email, password} = request.body;      
        
        const schema = Joi.object({
            email:Joi.string().email().required(),
            password:Joi.string().required()
        })
        const {error} = schema.validate(request.body);
        if(error){
            return response.status(400).json({
                message:error.details[0].message,
                success:false
            })
        }     
        
        const user = await User.findOne({email});
        if(!user){
            return response.status(400).json({
                message:"User not exists",
                success:false
            })
        };
        const validatePassword = await bcryptjs.compare(password, user.password);
        if(!validatePassword){
            return response.status(400).json({
                message:"Incorrect Password",
                success:false
            })
        };
        
        const token = await createToken({ id:user._id });
        response.cookie("Token",token,{
            withCredentials: true,
            httpOnly: false,  
            maxAge: 7 * 24 * 60 * 60 * 1000  
          }); 

        return response.status(200).json({
            message:"Login successfully",
            success:true,
            Token:token
        })

    }catch(error){
        next(error);
    }

}


export async function logout(request, response, next){
    try{
        response.clearCookie('token');
        return response.status(200).json({
            message:"Logout Successfully",
            success:true
        })
    }catch(error){
        next(error);
    }
}

export async function isAuthenticate(request, response, next){
    try{
        return response.status(200).json({
            message:"Already logged in",
            success:true
        })
    }catch(error){
        next(error);
    }
}