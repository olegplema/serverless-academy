const tokenService = require('../service/token-service.js')

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization
        console.log('user dfdf'+token)

        if (!token){
            throw new Error('User is unauthorized')
        }

        const validated = tokenService.validateAccessToken(token.split(' ')[1])

        if (!validated){
            throw new Error('User is unauthorized')
        }
        req.user = validated

        next()
    }catch (e) {
        res.status(401).json({success:false, error: e.message})
    }
}

module.exports = authMiddleware