const {User} = require('../db')

async function UserValidate(req, res,next){
    const username = req.body.user.username;
    const password = req.body.user.password;
    try {
        const user = await User.findOne({username : username , password : password})
        if(user){
            next()
        }
        else{
            res.status(403).json({
                message : "Invalid Credentials"
            })
        }
    } catch (error) {
        res.status(403).json({
            message : "Something went wrong"
        })
    }
}

module.exports = {
    UserValidate
}