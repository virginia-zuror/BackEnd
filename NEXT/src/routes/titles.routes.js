const express = require("express");

const router = express.Router();

const Title = require("../models/title.model");

router.get("/", async (req, res, next) => {
  try {
    const titles = await Title.find();
    return res.status(200).json(titles);
  } catch (error) {
    return next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const title = await Title.findById(id);
    return res.status(200).json(title);
  } catch (error) {
    return next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newTitle = new Title({
      name: req.body.name,
      author: req.body.author,
      year: req.body.year,
      ISBN: req.body.ISBN,
      genre: req.body.genre,
    });
    const createdTitle = await newTitle.save();
    return res.status(201).json(createdTitle);
  } catch (error) {
    return next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Title.findByIdAndDelete(id);
    return res.status(200).json("title deleted");
  } catch (error) {
    return next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const titleModified = new Title(req.body);

    titleModified._id = id;
    const titleUpdated = await Title.findByIdAndUpdate(id, titleModified);
    return res.status(200).json(titleUpdated);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
