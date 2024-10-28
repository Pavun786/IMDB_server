const express = require("express");
const {createNewProducer,getallProducers,getSingleProducer,editProducer,deleteProducer} = require("../Controllers/producerControllers");

const router = express.Router()


router.post("/createProducer",createNewProducer)
router.get("/allProducers",getallProducers,)
router.get("/:id",getSingleProducer)
router.put("/:id",editProducer)
router.delete("/:id",deleteProducer)

module.exports = router