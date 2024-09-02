const {User} = require('../db')

async function isUser(req , res , next) {
    const username = req.body.user.username;
    try {
        const user = await User.findOne({username : username})
        if(user){
            res.status(403).json({
                message : "User already Exists, try logging in"
            })
        }
        else {
            next()
        }
    } catch (error) {
        res.status(403).json({
            message : "Cannot create account"
        })
    }
}

module.exports = {
    isUser 
}