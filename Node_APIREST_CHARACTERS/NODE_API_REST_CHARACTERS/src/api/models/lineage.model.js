const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LineageSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    age: { type: String, required: false, trim: true },
    language: { type: String, required: false, trim: true },
    image: { type: String, required: false, trim: true },
    characters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }],
  },
  { timestamps: true }
);

const Lineage = mongoose.model('Lineage', LineageSchema);

module.exports = Lineage;
