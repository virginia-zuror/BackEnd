const express = require("express");
const router = express.Router();

const Author = require("../models/author.model");

router.get("/", async (req, res, next) => {
  try {
    const authors = await Author.find();
    return res.status(200).json(authors);
  } catch (error) {
    return next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const author = await Author.findById(id);
    return res.status(200).json(author);
  } catch (error) {
    return next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Author.findByIdAndDelete(id);
    return res.status(200).json("author deleted");
  } catch (error) {
    return next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newAuthor = new Author(req.body);
    const createdAuthor = await newAuthor.save();
    return res.status(201).json(createdAuthor);
  } catch (error) {
    return next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const authorModified = new Author(req.body);
    authorModified._id = id;
    const authorUpdated = await Author.findByIdAndUpdate(id, authorModified);
    return res.status(200).json(authorUpdated);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
