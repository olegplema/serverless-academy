const express = require('express')
const locationController = require('./controllers/location-controller.js')

const port = process.env.PORT || 3000

const app = express()

app.use(express.json())

app.post('/find-location', locationController.findLocation)

app.listen(port, () => console.log('Server started on port ' + port))