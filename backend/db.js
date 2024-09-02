const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://kunal:kunal@cluster0.acncl.mongodb.net/")

const User_schema = new mongoose.Schema({
    name : String,
    username : String,
    password : String,
    avatar : String,
    tasks : [
        {
            taskId : { type : mongoose.Schema.Types.ObjectId  , default : mongoose.Types.ObjectId} ,
            title : String,
            description : String,
            completed : Boolean,
        }
    ]
})

const User = mongoose.model('todo_app_user' , User_schema)

module.exports = {
    User
}