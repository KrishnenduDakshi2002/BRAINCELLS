const mongoose = require("mongoose");
const user = require("./user");
const teacher = require("./teacher");
const course = require("./course");
const Schema = mongoose.Schema;

const studentSchema = new mongoose.Schema({
  student_id: {
    type: Schema.Type.object_id,
    ref: "user",
  },
  teachers: [
    {
      type: Schema.Type.object_id,
      ref: "teacher",
    },
  ],
  courses: [
    {
      type: Schema.Type.object_id,
      ref: "course",
    },
  ],
});

module.exports = mongoose.model("Student", studentSchema);
