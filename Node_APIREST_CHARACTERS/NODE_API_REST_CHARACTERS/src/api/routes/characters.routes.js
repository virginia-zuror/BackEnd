const express = require('express');

const CharactersRoutes = express.Router();
const { upload } = require('../../middlewares/files.middlewares.js'); 

const {
  getAllCharacters,
  createCharacter,
  deleteCharacter,
} = require('../controllers/characters.controllers.js');

CharactersRoutes.get('/', getAllCharacters);
CharactersRoutes.post('/', upload.single('image'), createCharacter);
CharactersRoutes.delete('/:id', deleteCharacter);

module.exports = CharactersRoutes;
