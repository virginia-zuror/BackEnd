 const Lineage = require('../models/lineage.model')
 
 const { deleteImgCloudinary } = require('../../middlewares/files.middlewares.js');

const getAllLineages = async (req, res, next) => {
  try {
    const allLineages = await Lineage.find().populate('characters');
    return res.status(200).json({results: allLineages});
  } catch (error) {
    return next('Lineages not found 😕', error);
  }
};

const createLineage = async (req, res, next) => {
  try {
    const newLineage = new Lineage({
      ...req.body,
      image: req.file ? req.file.path : 'Not image found',
    });
    const createdLineage = await newLineage.save();
    return res.status(201).json(createdLineage);
  } catch (error) {
    return next('Failed creating Lineage', error);
  }
};

const deleteLineage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const lineage = await Lineage.findByIdAndDelete(id);

     if (lineage.image) {
      deleteImgCloudinary(lineage.image);
    } 
    return res.status(200).json(lineage);
  } catch (error) {
    return next('Error deleting lineage', error);
  }
};

module.exports = { getAllLineages, createLineage, deleteLineage };