const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoadSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  roadType: {
    type: Number,
    required: true
  }
});

module.exports = Road = mongoose.model("road", RoadSchema);
