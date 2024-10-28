const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema({
     Name : {
        type : String,
        required : true
     },
     Year_of_Release : {
        type : Number,
        required : true
     },
     Plot : {
        type : String,
        required : true
     },
     Trailer : {
        type : String,
        required : true
     },
     Poster : {
      public_id :{
         type : String,
         required : true
      },
      url : {
         type : String,
         required : true
  }
     },
     Actors: [
        {
            type: mongoose.ObjectId,
            ref: "Actor",
        }
    ],
     Producer : {
         type : mongoose.ObjectId,
         ref : "Producer",
         required : true
     }
},
  {timestamps : true}
)

 module.exports = mongoose.model("Movie",movieSchema)