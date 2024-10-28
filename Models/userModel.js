const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    Username:{
        type:String,
        required:true,
        trim:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true,
       
    },
    
    Role:{
        type:Number,
        
    },
},
    {timestamps: true}
)

module.exports = mongoose.model("User",userSchema)