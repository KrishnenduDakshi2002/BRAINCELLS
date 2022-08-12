const express = require("express")
const  mongoose = require('mongoose')
const morgan= require('morgan')
const bodyParser = require("body-parser")

const app = express()

const uri = "mongodb+srv://raj4321:YIfQx247fYNf0YW0@braincellsdb.ajb1asy.mongodb.net/?retryWrites=true&w=majority";

const db= mongoose.connect(uri)
const con =mongoose.connection

con.on("open",function(){
    console.log("connected...")
})
const userRouter = require("./routers/routes")
app.use('/user',() => {userRouter})

app.listen(3000, () => {
    console.log("server started")
})