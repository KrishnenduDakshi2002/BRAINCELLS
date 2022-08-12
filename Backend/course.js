const mongoose = require("mongoose");
const user = require("./user");
const teacher = require("./teacher");
const course = require("./course");
const Schema = mongoose.Schema;

const courseSchema = new mongoose.Schema({
  object_id: {
    type: Schema.ObjectId,
    required: true,
    unique: true,
  },
  Title: {
    type: String,
    required: true,
  },
  Date_created: {
    type: Date,
    default: Date.now,
    required: true,
  },
  Duration: {
    type: String,
    required: true,
  },
  Class: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Course", courseSchema);
