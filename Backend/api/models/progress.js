const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProgressSchema = new Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  roadID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "road"
  },
  timeStamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = Progress = mongoose.model("progress", ProgressSchema);
