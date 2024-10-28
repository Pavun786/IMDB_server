const mongoose = require("mongoose")

const producerSchema = new mongoose.Schema({
     Name : {
        type : String,
        required : true
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
         type: mongoose.Schema.Types.ObjectId,
         ref: "Movie"
     }
     ]
     
},
  {timestamps : true}
)

module.exports = mongoose.model("Producer",producerSchema )