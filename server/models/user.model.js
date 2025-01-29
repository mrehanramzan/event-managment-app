import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    
    fullname:{ type:String, default:"" },
    
    email:{ type:String, require:[true,"Email must require"] },
    
    password:{ type:String, require:[true,"Password must require"] }



},{
    timestamps:true
})

export default mongoose.model("User",userSchema)