const Router = require('express').Router
const authController = require('../controllers/auth-controller')


const router = new Router()

router.post('/sign-in', authController.signIn)
router.post('/sign-up', authController.signUp)
router.post('/refresh', authController.refresh)

module.exports = router

