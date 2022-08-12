const mongoose = require("mongoose");
const user = require("./user");
const student = require("./student");
const course = require("./course");
const Schema = mongoose.Schema;

const teacherSchema = new mongoose.Schema({
  teacher_id: {
    type: mongoose.ObjectId,
    ref: "user",
  },
  students: [
    {
      type: mongoose.ObjectId,
      ref: "student",
    },
  ],
  courses: [
    {
      type: mongoose.ObjectId,
      ref: "course",
    },
  ],
});

module.exports = mongoose.model("Teacher", teacherSchema);
