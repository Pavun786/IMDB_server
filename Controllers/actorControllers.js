const actorModel = require("../Models/actorModel.js")
// const Date = require("some-library")
const cloudinary = require("../Utils/Cloudinary.js")

const createActor = async(req,res)=>{

   console.log("exe")

   try{
    const {Name,Image,Gender,DOB,Bio} = req.body;

    if(!Name || !Image ||!Gender || !DOB || !Bio){
        res.status(500).send({message : "All fields required..!"})
    }

    const verifyActor = await actorModel.findOne({Name : Name})
    
    if(verifyActor){
        res.send({message : "Actor already exist..!"})
    }

     else{

       console.log("exe2")
        const actorImageUpload = await cloudinary.uploader.upload(Image);

        console.log(actorImageUpload)

        const newActor = new actorModel({
          Name,
          Gender,
          Image: {
            public_id: actorImageUpload.public_id,
            url: actorImageUpload.secure_url,
          },
          DOB: new Date(DOB),
          Bio  
        })

        console.log(newActor)

        await newActor.save()

        console.log(newActor)

        res.status(200).send({message : "Actor created successfully"})
    }
   }catch(err){
     res.send({message : err})
   }

}

const getallActors = async(req,res)=>{
     
       try{
        const getAllActors = await actorModel.find()

        if(getAllActors){
            res.status(200).send(getAllActors)
        }else{
            res.send(404).send({message : "Actors not found"})
        }
    }catch(err){
       res.send({message : err})
    }
    

}

const getSingleActor = async(req,res)=>{
    try{
       const {id} = req.params;

       const getActor = await actorModel.findOne({_id : id}).populate({
          path : "Movies",
          select : "_id Name"
       })
       if(getActor){
         res.status(200).send(getActor)
       }else{
          res.status(404).send({message : "Actor not found"})
       }
    }
    catch(err){
        res.send({message : err})
    }
}

const editActor = async(req,res)=>{
      try{
         const {id}= req.params;
         const data = req.body;

         if(data.Image){
      
            const actorImageUpload = await cloudinary.uploader.upload(data.Image)
            data.Image =  {
              public_id : actorImageUpload.public_id,
              url : actorImageUpload.secure_url
             }
           }

         const editActor = await actorModel.updateOne({_id : id},{$set : data})
         res.status(200).send({message : "Actor edited successfully"})
      }catch(err){
         res.send({message : err})
      }
}

const deleteActor = async(req,res)=>{
      try{
        const {id}= req.params;
        const deleteActor = await actorModel.deleteOne({_id : id})
        res.status(200).send({message : "Actor is deleted"})  
    }catch(err){
        res.send({message : err})
      }
}


module.exports = {createActor,getallActors,getSingleActor,editActor,deleteActor};