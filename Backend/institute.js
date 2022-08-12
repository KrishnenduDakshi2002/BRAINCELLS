const mongoose = require("mongoose");
const user = require("./user");
const student = require("./student")
const teacher = require("./teacher");
const course = require("./course");
const Schema = mongoose.Schema;

const instituteSchema = new mongoose.Schema({
  institute_id: {
    type: mongoose.ObjectId,
    ref: "user",
  },
  students: [
    {
      type: mongoose.ObjectId,
      ref: "student",
    },
  ],
  teachers: [
    {
      type: mongoose.ObjectId,
      ref: "teacher",
    },
  ],
  courses: [
    {
      type: mongoose.ObjectId,
      ref: "course",
    },
  ],
});

module.exports = mongoose.model("Institute", instituteSchema);
