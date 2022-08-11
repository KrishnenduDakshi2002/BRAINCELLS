const mongoose = require("mongoose");
const user = require("./user");
const student = require("./student")
const teacher = require("./teacher");
const course = require("./course");
const Schema = mongoose.Schema;

const instituteSchema = new mongoose.Schema({
  institute_id: {
    type: Schema.Type.object_id,
    ref: "user",
  },
  students: [
    {
      type: Schema.Type.object_id,
      ref: "student",
    },
  ],
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

module.exports = mongoose.model("Institute", instituteSchema);
