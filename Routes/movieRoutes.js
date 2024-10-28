const express = require("express");
const {createNewMovie,getAllMovies,getSingleMovie,editMovie,deleteMovie} = require("../Controllers/movieControllers.js");

const router = express.Router()

router.post("/createMovie",createNewMovie)
router.get("/getAllMovies",getAllMovies)
router.get("/:id",getSingleMovie)
router.put("/:id",editMovie)
router.delete("/:id",deleteMovie)


module.exports = router;