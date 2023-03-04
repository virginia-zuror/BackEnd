const Character = require('../models/character.model');

const { deleteImgCloudinary } = require('../../middlewares/files.middlewares.js'); 

const getAllCharacters = async (req, res, next) => {
  try {
    const allCharacters = await Character.find();
    return res.status(200).json({results: allCharacters,});
  } catch (error) {
    return next('Characters not found 😕', error);
  }
};

const createCharacter = async (req, res, next) => {
  try {
    const newCharacter = new Character({
      ...req.body,
      image: req.file ? req.file.path : 'Not image found',
    });
    const createdCharacter = await newCharacter.save();
    return res.status(201).json(createdCharacter);
  } catch (error) {
    return next('Failed creating Character', error);
  }
};

const deleteCharacter = async (req, res, next) => {
  try {
    const { id } = req.params;
    const character = await Character.findByIdAndDelete(id);

    if (character.image) {
      deleteImgCloudinary(character.image);
    } 
    return res.status(200).json(character);
  } catch (error) {
    return next('Error deleting character', error);
  }
};

module.exports = { getAllCharacters, createCharacter, deleteCharacter };
