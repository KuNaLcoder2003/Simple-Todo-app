const {user_input_validation_schema , id_schema} = require('../test')

function inputValidation(req , res , next){
    const user_object = req.body.user;
    const response = user_input_validation_schema.safeParse(user_object)
    if(!response.success){
        res.status(403).json({
            message : "Invalid input foramt"
        })
    }
    else {
        next()
    }
}
module.exports = {
    inputValidation
}