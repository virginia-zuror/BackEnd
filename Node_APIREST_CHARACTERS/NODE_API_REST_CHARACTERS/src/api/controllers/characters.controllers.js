const Character = require('../models/character.model');

const {
  deleteImgCloudinary,
} = require('../../middlewares/files.middlewares.js');

const getAllCharacters = async (req, res, next) => {
  try {
    if (req.query.page && !isNaN(parseInt(req.query.page))) {
      const numCharacters = await Character.countDocuments();
      let page = parseInt(req.query.page);
      let limit = req.query.limit ? parseInt(req.query.limit) : 10;
      let numPages =
        numCharacters % limit > 0
          ? numCharacters / limit + 1
          : numCharacters / limit;

      if (page > numPages || page < 1) {
        page = 1;
      }
      const skip = (page - 1) * limit;

      const allCharacters = await Character.find().skip(skip).limit(limit);

      return res.status(200).json({
        info: {
          total: numCharacters,
          page: page,
          limit: limit,
          next:
            numPages >= page + 1
              ? `http://localhost:8082/api/characters?page=${page+1}&limit=${limit}`
              : null,
          prev:
            page != 1
              ? `http://localhost:8082/api/characters?page=${page-1}&limit=${limit}`
              : null,
        },
        results: allCharacters,
      });
    } else {
      const allCharacters = await Character.find().limit(10);
      const numCharacters = await Character.countDocuments();

      return  res.status(200).json({
        info: {
          total: numCharacters,
          page: 1,
          limit: 10,
          next: numCharacters > 10 ? `http://localhost:8082/api/characters?page=2&limit=10` : null,
          prev: null,
        },
        results: allCharacters,
      });
    }
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
