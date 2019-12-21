const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ComplaintSchema = new Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user"
  },
  roadID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "road"
  },
  status: {
    type: Number,
    default: 0
  },
  prediction: {
    type: Number
  },
  complaint_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Complaint = mongoose.model("complaint", ComplaintSchema);
