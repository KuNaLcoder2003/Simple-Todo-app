const express = require('express')
const app = express();
const PORT = 3000;
const cors = require('cors')
const { inputValidation } = require('./middlewares/InputValidation')
const { isUser } = require('./middlewares/IsUser')
const { UserValidate } = require('./middlewares/UserValidation')
const jwt = require('jsonwebtoken')
const jwt_password = 'kunal';
const { User } = require('./db')
const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId
app.use(express.json())
app.use(cors())

app.post('/user/signup', inputValidation, isUser, async (req, res) => {
    const user_object = req.body.user
    try {
        const new_user = new User({
            name: user_object.name,
            username: user_object.username,
            password: user_object.password,
            avatar: user_object.avatar,
        })
        await new_user.save()
        res.status(200).json({
            message: "Account created"
        })
    } catch (error) {
        res.status(403).json({
            message: "cannot create account"
        })
    }
})

app.post('/user/signin', UserValidate, (req, res) => {
    const username = req.body.user.username
    try {
        const token = jwt.sign({ username: username }, jwt_password)
        res.status(200).json({
            message: token
        })
    } catch (error) {
        res.status(403).json({
            message: "error logging in"
        })
    }
})

app.get('/user', async (req, res) => {
    const token = req.headers.token;
    try {
        const decoded = jwt.verify(token, jwt_password)
        if (decoded) {
            const username = decoded.username;
            const user = await User.findOne({ username: username })
            if (user) {
                res.status(200).json({
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        password: user.password,
                    },
                    tasks: user.tasks,
                    valid: true
                })
            }
            else {
                res.status(403).json({
                    valid: false,
                    message: "Cannot get tasks"
                })
            }
        }
    } catch (error) {
        res.status(403).json({
            valid: false,
            message: "Something went wrong"
        })
    }
})


app.post('/addtodo', async (req, res) => {
    const token = req.headers.token;
    let todo = req.body.todo;
    todo = {...todo , completed : false}

    try {
        const decoded = jwt.verify(token, jwt_password);

        const user = await User.findOne({ username: decoded.username });

        if (user) {
            const response = await User.findByIdAndUpdate(
                user._id,
                { $push: { tasks: todo } }
            );

            if (response) {
                res.status(200).json({
                    valid: true,
                    message: "Task added successfully."
                });
            } else {
                res.status(400).json({
                    valid: true,
                    message: "Could not add the task."
                });
            }
        } else {
            res.status(404).json({
                valid: false,
                message: "User not found."
            });
        }
    } catch (error) {
        res.status(500).json({
            valid: false,
            message: "Internal server error.",
            error: error.message  // Optional: include error details for debugging
        });
    }
});

app.put('/editTodo/:taskId', async (req, res) => {
    const token = req.headers.token;
    const editedObject = req.body.editedTodo;
    const taskId = req.params.taskId;
    let updatedObject = {}
    for (let key in editedObject) {
        updatedObject[`tasks.$.${key}`] = editedObject[key]
    }
    try {
        const verified = jwt.verify(token, jwt_password)
        if (verified) {
            const user = await User.findOne({ username: verified.username })
            if (user) {
                const updated = await User.findOneAndUpdate({username : user.username , "tasks._id" : new ObjectId(taskId)} , {$set : updatedObject} , {new : true})
                res.status(200).json({
                    valid : true,
                    message: "Updated task"
                })
            }
            else {
                res.status(404).json({
                    valid: false,
                    message: "User not found."
                })
            }
        }

    } catch (error) {
        res.status(500).json({
            valid: false,
            message: "Internal server error.",
            error: error.message  
        });
    }
})

app.get('/task/:taskId' , async(req, res) => {
    const token = req.headers.token;
    const taskId = req.params.taskId
    try {
        const verified = jwt.verify(token , jwt_password)
        const user = await User.findOne({username : verified.username})
        if(user){
            const user_tasks = user.tasks;
            const reuiredTask = user_tasks.find( task => task._id.equals(new ObjectId(taskId)))
            res.status(200).json({
                valid : true,
                task : reuiredTask
            })
        }
        else{
            res.status(404).json({
                valid : false,
                message : "User not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message : "Internal Sever Error"
        })
    }
})

app.delete('/delete/:taskId' ,async(req, res)=>{
    const token = req.headers.token;
    const taskId = req.params.taskId
    try {
        const verified = jwt.verify(token , jwt_password)
        const user = await User.findOne({username : verified.username})
        if(user){
            const deleted = await User.findOneAndUpdate({username : user.username} , {$pull : {tasks : {_id : new ObjectId(taskId)}}} , {new : true})
            if(deleted){
                res.status(200).json({
                    message : "Successfully deleted the task"
                })
            }
            else{
                res.status(403).json({
                    message : "Cannot delete the task"
                })
            }
        }else {
            res.status(404).json({
                message : "User not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message : "Internal sever error"
        })
    }
})

app.put('/complete/:taskId' , async(req,res)=> {
    const token = req.headers.token;
    const taskId = req.params.taskId
    try {
        const verified = jwt.verify(token , jwt_password)
        const user = await User.findOne({username : verified.username});
        if(user){
            await User.findOneAndUpdate({username : user.username , "tasks._id" : new ObjectId(taskId)} , {$set : {"tasks.$.completed" : true} })
            res.status(200).json({
                updatedTask : user.tasks,
                message : "Task Completed"
            })
        }
        else{
            res.status(404).json({
                message : "Cannot find user"
            })
        }
    } catch (error) {
        res.status(500).json({
            message : "Internal server error"
        })
    }
})



app.use((err, req, res, next) => {
    res.status(500).json({
        msessage: "Something went wrong"
    })
})

app.listen(PORT)