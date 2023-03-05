const express = require('express');
const { upload } = require('../../middlewares/files.middlewares.js'); 
const LineagesRoutes = express.Router();

const {
  getAllLineages,
  createLineage,
  deleteLineage,
} = require('../controllers/lineages.controllers.js');

LineagesRoutes.get('/', getAllLineages);
LineagesRoutes.post('/', upload.single('image'), createLineage);
LineagesRoutes.delete('/:id', deleteLineage);

module.exports = LineagesRoutes;
