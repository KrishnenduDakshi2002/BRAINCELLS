const mongoose = require("mongoose");
const user = require("./user");
const student = require("./student")
const teacher = require("./teacher");
const course = require("./course");
const institute = require("./institute");

const uri = "mongodb+srv://raj4321:YIfQx247fYNf0YW0@braincellsdb.ajb1asy.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri).then(()=>
    console.log("Connected")
).catch((err) => console.log(err.message))

run().catch((err) => console.log(err.message))
async function run() {
    const user_ = new user({
        Fname:"Rajarshi",
        Lname: "singh",
        email: "royrajjbjb@gmail.com",
        age: 19,
        role: "teacher",
        address:{
            street_name: "djkl",
            city: "kolkata"
        },
        Institute_name: "KjEC",
        Institute_code:"KjeC123",
        password:"34536"
    })
    await user_.save()
    const USER_ID = user_._id
    console.log(USER_ID, user_.role == "institute" )


    
    switch(user_.role){
        case "student":
            const student_ = new student({
                student_id:  USER_ID
            })
            await student_.save()
            break;
        case "teacher":
            const teacher_ = new teacher({
                teacher_id:  USER_ID
            })
            await teacher_.save()
            break;
        case 'institute':
            const institute_ = new institute({
                institute_id:  USER_ID
            })
            await institute_.save()
            break;
    }

    console.log(user_._id)
}

const index = (req,res, next)=>{
    user.find()
    .then(Response => {
        res.json({
            Response
        })
    })
    .catch(error => {
        res.json({
            message: "Anerror Occured!"
        })
    })
}

