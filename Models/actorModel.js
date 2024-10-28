const mongoose = require("mongoose")

const actorSchema = new mongoose.Schema({
     Name : {
        type : String,
        required : true,
        unique : true
     },
     Image : {
      public_id :{
         type : String,
         required : true
      },
      url : {
         type : String,
         required : true
  }
     },
     Gender : {
        type : String,
        required : true
     },
     DOB : {
        type : Date,
        required : true 
     },
     Bio : {
        type : String,
        required : true
     },
     Movies : [
        {
            type : mongoose.ObjectId,
            ref : "Movie"
        }
     ]
},
   {timestamps : true}
)

module.exports = mongoose.model("Actor",actorSchema)