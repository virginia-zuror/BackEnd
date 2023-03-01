const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthorSchema = new Schema(
  {
    name: { type: String, required: true },
    born_year: { type: Number, required: true },
    country:{type:String, required:true},
  },
  {
    timestamps: true,
  }
);

const Author = mongoose.model("Author", AuthorSchema);

module.exports = Author;