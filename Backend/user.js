const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema({
    street_name: String,
    city: String,
})
const userSchema = new mongoose.Schema({
    object_id:{
        type: Schema.ObjectId,
        required: true,
        unique: true
    },
    Fname:{
        type: String,
        required: true,
    },
    Lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    address: addressSchema,
    Institute_name: {
        type: String,
        required: true,
    },
    Institute_code: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

})

module.exports = mongoose.model("User",userSchema)