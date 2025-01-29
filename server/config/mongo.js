import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();



async function connectMongoose(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected");
    }catch(error){
        console.log("Error database connection ",error);
        process.exit(1);
    }
}

export default connectMongoose;