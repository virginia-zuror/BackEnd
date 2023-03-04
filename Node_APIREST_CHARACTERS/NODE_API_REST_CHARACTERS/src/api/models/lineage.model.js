const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LineageSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    age: { type: String, required: false, trim: true },
    language: { type: String, required: false, trim: true },
    banner: { type: String, required: false, trim: true },
    characters: [{ type: mongoose.Types.ObjectId, ref: 'Character' }],
  },
  { timestamps: true }
);

const Lineage = mongoose.model('Lineage', LineageSchema);

module.exports = Lineage;