const Router = require('express').Router
const linkController = require('../controllers/link-controller.js')


const router = new Router()

router.post('/shorten', linkController.shortenLink)
router.get('/:id', linkController.redirectLink)

module.exports = router