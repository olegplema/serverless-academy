const authService = require('../service/auth-service.js')
const tokenService = require('../service/token-service.js')

class AuthController {
    async signUp(req, res, next){
        try {
            const {email, password} = req.body
            const userData = await authService.register(email,password)
            res.cookie('refreshToken',userData.refreshToken,{httpOnly:true})
            res.status(201).json({success: true, data: userData})
        }catch (e) {
            res.status(409).json({success:false, error: e.message})
        }
    }

    async signIn(req, res, next){
        try {
            const {email, password} = req.body
            const userData = await authService.login(email,password)
            res.cookie('refreshToken',userData.refreshToken,{httpOnly:true})
            res.json({success: true, data: userData})
        }catch (e) {
            res.status(404).json({success:false, error: e.message})
        }
    }

    async refresh(req, res, next){
        try{
            const {refreshToken} = req.cookies
            console.log(refreshToken)
            const newTokens = await tokenService.refresh(refreshToken)
            res.cookie('refreshToken',newTokens.refreshToken,{httpOnly:true})
            res.json(newTokens)
        }catch (e) {
            next(e)
        }
    }
}


module.exports = new AuthController()