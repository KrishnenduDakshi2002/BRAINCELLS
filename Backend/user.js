const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema()
const userSchema = new mongoose.Schema({
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
        type: Number,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    address: {
        street_name: String,
        city: String,
    },
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