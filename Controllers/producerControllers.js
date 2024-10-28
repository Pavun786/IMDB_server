const producermodel = require("../Models/producermodel");
const producerModel = require("../Models/producermodel")


const createNewProducer = async(req,res)=>{

    try{
        const {Name,Gender,DOB,Bio} = req.body;
    
        if(!Name || !Gender || !DOB || !Bio){
            res.status(500).send({message : "All fields required..!"})
        }
    
        const verifyProducer = await producerModel.findOne({Name : Name})
        
        if(verifyProducer){
            res.send({message : "Producer already exist..!"})
        }
        else{
            const newProducer = new producerModel({
              Name,
              Gender,
              DOB: new Date(DOB),
              Bio  
            })
    
            await newProducer.save()
    
            res.status(200).send({message : "Producer created successfully"})
        }
       }catch(err){
         res.send({message : err})
       }
}

const getallProducers = async(req,res)=>{
     
    try{
     const getAllProducers = await producerModel.find().populate({ path : "Movies",select : "id Name"})

     if(getAllProducers){
         res.status(200).send(getAllProducers)
     }else{
         res.send(404).send({message : "Producers not found"})
     }
 }catch(err){
    res.send({message : err})
 }
 

}

const getSingleProducer = async(req,res)=>{
    try{
       const {id} = req.params;

       const getProducer = await producerModel.findOne({_id : id}).populate({ path : "Movies",select : "Name"})
       if(getProducer){
         res.status(200).send(getProducer)
       }else{
          res.status(404).send({message : "Producer not found"})
       }
    }
    catch(err){
        res.send({message : err})
    }
}

const editProducer = async(req,res)=>{
    try{
       const {id}= req.params;
       const data = req.body;

       const editProducer = await producerModel.updateOne({_id : id},{$set : data})
       res.status(200).send({message : "producer data edited successfully"})
    }catch(err){
       res.send({message : err})
    }
}

const deleteProducer = async(req,res)=>{
    try{
      const {id}= req.params;
      const deleteProducer = await producermodel.deleteOne({_id : id})
      res.status(200).send({message : "producer is deleted"})  
  }catch(err){
      res.send({message : err})
    }
}


module.exports = {createNewProducer,getallProducers,getSingleProducer,editProducer,deleteProducer}