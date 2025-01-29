import mongoose from "mongoose";


const eventSchema = new mongoose.Schema({
    event:{
        type:String,
        require:[true,"Event name must require"]
    },
    description:{
        type:String,
        require:[true,"Event description must require"]
    },
    country:{
        type:String,
        require:[true,"Event Country must require"]
    },
    city:{
        type:String,
        require:[true,"Event city must require"]
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    date:{
        type:Date,
        require:[true,"Event date must require"]
    },
    reminder:{
        type:mongoose.Schema.ObjectId,
        ref:'Reminder',
        default:null
    }
},{
    timestamps:true
});

export default mongoose.model("Event",eventSchema);