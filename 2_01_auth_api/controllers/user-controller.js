const userService = require('../service/user-service.js')

class UserController{
    async getUser(req, res, next){
        try {
            console.log(req.user)
            const user_id = req.user.id
            const user = await userService.getUser(user_id)
            res.json({success:true, data: {id:user.id, email: user.email}})
        }catch (e) {
            res.json({success:false, error: e.message})
        }
    }
}

module.exports = new UserController()