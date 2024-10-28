const movieModel = require("../Models/movieModel.js")
const actorModel = require("../Models/actorModel.js")
const producerModel = require("../Models/producermodel.js")
const cloudinary = require("../Utils/Cloudinary.js")

const createNewMovie = async (req, res) => {
  try {
    const { Name, Year_of_Release, Plot, Trailer, Poster, Actors, Producer } = req.body;

    console.log(Name, Year_of_Release, Plot, Trailer, Poster, Actors, Producer);

    if (!Name || !Year_of_Release || !Plot || !Trailer || !Poster || !Actors || !Producer) {
      return res.status(400).send({ message: "Please enter all details" });
    }

    const verifyMovie = await movieModel.findOne({ Name: Name });

    if (verifyMovie) {
      return res.status(500).send({ message: "The movie already exists" });
    }

    const movieImageUpload = await cloudinary.uploader.upload(Poster);
    const newMovie = new movieModel({
      Name,
      Year_of_Release,
      Plot,
      Trailer,
      Poster: {
        public_id: movieImageUpload.public_id,
        url: movieImageUpload.secure_url,
      },
      Actors,
      Producer,
    });

    await newMovie.save();

    console.log("newMovie", newMovie);

    // Update the actorDetails as well
    for (const actorId of Actors) {
      console.log("Entering Actor", actorId);
      await actorModel.findByIdAndUpdate(actorId, { $push: { Movies: newMovie._id } });
    }

    // Update the producerDetails as well if Producer is provided
    if (Producer) {
      console.log("Entering Producer", Producer);
      await producerModel.findByIdAndUpdate(Producer, { $push: { Movies: newMovie._id } });
    }

    res.status(200).send(newMovie);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};




const getAllMovies = async(req,res)=>{
      try{
        const getMovies = await movieModel.find().populate("Actors Producer")
        if(getMovies){
            res.status(200).send(getMovies)
        }else{
            res.status(400).send({message : "Movies not found"})
        }
      }catch(err){
           res.status(500).send({message : err})
      }
}



const getSingleMovie = async(req,res)=>{
     try{
       const {id} = req.params;
       const getSingleMovie = await movieModel.findOne({_id : id}).populate("Actors Producer")
       if(getSingleMovie){
         res.status(200).send(getSingleMovie)
       }else{
         res.status(400).send({message : "Movie not found"})
       }
     }catch(err){
        res.status(500).send({message : err})
     }
}




const editMovie = async(req,res)=>{
    
  try{
       const{id} = req.params;
     
       let data = req.body;

       if(data.Poster){
      
        const movieImageUpload = await cloudinary.uploader.upload(data.Poster)
        data.Poster =  {
          public_id : movieImageUpload.public_id,
          url : movieImageUpload.secure_url
         }
       }

       if(data.Producer){
        console.log("editproducer",data.Producer)
        await producerModel.findByIdAndUpdate(data.Producer,{ $addToSet:{Movies : id}}) 
       
        await producerModel.updateMany(
          { _id: { $ne: data.Producer }, Movies: { $in: [id] } }, // Filter: Other producers with the movie in their Movies array
          { $pull: { Movies: id } }                               // Update: Remove the specific movie
        );
        
        
       }
       console.log("Out")
       if(data.Actors){
        console.log("In")
        console.log("ActorsId",data.Actors)
        for (const actorId of data.Actors) {
          console.log("editActor",actorId)
          await actorModel.findByIdAndUpdate(actorId, { $addToSet: { Movies:id } });
          
        }

        await actorModel.updateMany(
          { _id: { $nin:[...data.Actors]}, Movies: { $in: [id] } }, // Filter: Other producers with the movie in their Movies array
          { $pull: { Movies: id } }                               // Update: Remove the specific movie
        );
        
       }

       console.log("data",data)
      
       const updateMovie = await movieModel.findByIdAndUpdate({_id : id},{$set: data})
       if(updateMovie){
        res.status(200).send(updateMovie)
       }else{
        res.status(400).send({message : "Movie not found"})
       }
       
     }catch(err){
       res.status(500).send({message: err.message})
     }
}





const deleteMovie = async(req,res)=>{
     try{
        const{id} = req.params;
        const deleteMovie = await movieModel.deleteOne({_id : id})
        res.status(200).send({message : "Movie deleted successfully"})
     }catch(err){
        res.status(500).send({message : err})
     }
}

module.exports = {createNewMovie,getAllMovies,getSingleMovie,editMovie,deleteMovie}