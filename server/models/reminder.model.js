import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({

    from:{type:String, required:true},
    
    subject:{type:String, required:true},
    
    description:{type:String, required:true},

    date:{type:Date, required:true}


}, {timestamps:true})

export default mongoose.model("Reminder",reminderSchema);