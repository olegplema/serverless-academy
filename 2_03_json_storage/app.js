const express = require('express')
const router = require('./routers/router.js')

const port = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(router)

app.listen(port,() => console.log('Server started on port ' + port))