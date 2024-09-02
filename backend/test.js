const zod = require('zod')

const user_input_validation_schema = zod.object({
    name : zod.string(),
    username : zod.string().email(),
    password : zod.string().min(5),
    avatar : zod.string(),
})

const id_schema = zod.string()

const todo_schema = zod.object({
    title : zod.string(),
    desccription : zod.string(),
    completed : zod.boolean()
})

module.exports = {
    user_input_validation_schema : user_input_validation_schema , 
    id_schema : id_schema
}