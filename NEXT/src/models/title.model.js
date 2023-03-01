const mongoose = require("mongoose")

const Schema= mongoose.Schema;

const TitleSchema = new Schema(
    {
      name: { type: String, required: true },
      author: { type: String, required: true },
      year: { type: Number, required: true },
      ISBN: { type: Number, required: true },
      genre: { type: String, required: false },
    },
    {
      timestamps: true,
    }
  );

  const Title = mongoose.model("Title", TitleSchema);

module.exports = Title;

