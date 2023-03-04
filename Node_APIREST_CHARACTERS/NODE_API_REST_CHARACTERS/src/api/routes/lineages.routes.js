const express = require('express');

const LineagesRoutes = express.Router();

const {
  getAllLineages,
  createLineage,
  deleteLineage,
} = require('../controllers/lineages.controllers.js');

LineagesRoutes.get('/', getAllLineages);
LineagesRoutes.post('/', createLineage);
LineagesRoutes.delete('/:id', deleteLineage);

module.exports = LineagesRoutes;
