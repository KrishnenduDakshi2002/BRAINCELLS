const mongoose = require("mongoose");

const uri = "mongodb+srv://raj4321:YIfQx247fYNf0YW0@braincellsdb.ajb1asy.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri).then(()=>
    console.log("Connected")
).catch((err) => console.log(err.message))