const mongoose = require('mongoose');

const CharacterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female', 'unknown'],
    },
    race: {
      type: String,
      required: true,
      enum: [
        'elf',
        'human',
        'dwarf',
        'vala',
        'ainu',
        'orc',
        'beast',
        'other/unknown',
      ],
    },
    image: { type: String, required: false, trim: true },
  },
  {
    timestamps: true,
  }
);

const Character = mongoose.model('Character', CharacterSchema);

module.exports = Character;
