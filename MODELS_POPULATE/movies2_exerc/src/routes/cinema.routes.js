const express = require("express");
const Cinema = require("../models/cinema.model");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const cinemas = await Cinema.find().populate("movies");
    return res.status(200).json(cinemas);
  } catch (error) {
    return next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newCinema = new Cinema(req.body);
    const createdCinema = await newCinema.save();
    return res.status(201).json(createdCinema);
  } catch (error) {
    return next(error);
  }
});

router.put("/:id", async(req, res, next)=>{
  try {
    const {id} = req.params;
    const cinemaModified = new Cinema(req.body);
    cinemaModified._id= id;
    const cinemaUpdated = await Cinema.findByIdAndUpdate(id, cinemaModified);
    return res.status(200).json(cinemaUpdated);
  } catch (error) {
    return next(error)
  }
  });
  
  router.delete("/:id", async(req, res, next)=>{
    try {
      const {id} = req.params;
      await Cinema.findByIdAndDelete(id);
      return res.status(200).json("cinema deleted!");
    } catch (error) {
      return next(error)
    }
  })



module.exports = router;
