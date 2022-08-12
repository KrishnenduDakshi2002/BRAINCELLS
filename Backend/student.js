const mongoose = require("mongoose");
const user = require("./user");
const teacher = require("./teacher");
const course = require("./course");
const Schema = mongoose.Schema;

const studentSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.ObjectId,
    ref: "user",
  },
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

module.exports = mongoose.model("Student", studentSchema);
