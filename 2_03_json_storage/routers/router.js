const Router = require('express').Router
const jsonController = require('../controllers/json-controller.js')

const router = new Router()

router.put('/:json_path', jsonController.putJson)
router.get('/:json_path', jsonController.getJson)

module.exports = router
