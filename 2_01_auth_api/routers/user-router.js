const Router = require('express').Router
const userController = require('../controllers/user-controller.js')
const authMiddleware = require('../middlewares/auth-middleware.js')

const router = new Router()

router.use(authMiddleware)
router.get('/me',userController.getUser)

module.exports = router

