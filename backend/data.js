const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new mongoose.Schema({
  width: Number,
  height: Number,
});

const DataSchema = new Schema(
  {
    id: Number,
    message: String,
    name: String,
    image: imageSchema,
    point: { type: Number, default: 0, max: 50, index: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Data", DataSchema);