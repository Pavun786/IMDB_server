const express = require("express")
const {createActor,getallActors, getSingleActor, editActor, deleteActor} = require("../Controllers/actorControllers")

const router = express.Router()

router.post("/createActor",createActor)
router.get("/allActors",getallActors)
router.get("/:id",getSingleActor)
router.put("/:id",editActor)
router.delete("/:id",deleteActor)

module.exports = router;