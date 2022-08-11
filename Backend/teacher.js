const mongoose = require("mongoose");
const user = require("./user");
const student = require("./student");
const course = require("./course");
const Schema = mongoose.Schema;

const teacherSchema = new mongoose.Schema({
  teacher_id: {
    type: Schema.Type.object_id,
    ref: "user",
  },
  students: [
    {
      type: Schema.Type.object_id,
      ref: "student",
    },
  ],
  courses: [
    {
      type: Schema.Type.object_id,
      ref: "course",
    },
  ],
});

module.exports = mongoose.model("Teacher", teacherSchema);
