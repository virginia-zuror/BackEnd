const express = require("express");
const Movie = require("../models/movie.models");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const movies = await Movie.find();
    return res.status(200).json(movies);
  } catch (error) {
    return next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newMovie = new Movie(req.body);
    const createdMovie = await newMovie.save();
    return res.status(201).json(createdMovie);
  } catch (error) {
    return next(error);
  }
});

router.put("/:id", async(req, res, next)=>{
try {
  const {id} = req.params;
  const movieModified = new Movie(req.body);
  movieModified._id= id;
  const movieUpdated = await Movie.findByIdAndUpdate(id, movieModified);
  return res.status(200).json(movieUpdated);
} catch (error) {
  return next(error)
}
});

router.delete("/:id", async(req, res, next)=>{
  try {
    const {id} = req.params;
    await Movie.findByIdAndDelete(id);
    return res.status(200).json("movie deleted!");
  } catch (error) {
    return next(error)
  }
})

module.exports = router;
