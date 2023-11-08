const express = require('express')
const authRouter = require('./routers/auth-router.js')
const userRouter = require('./routers/user-router.js')
const authMiddleware = require('./middlewares/auth-middleware.js')

const app = express()

const port = process.env.PORT || 3000


app.use(express.json())
app.use('/auth',authRouter)
app.use(userRouter)

app.listen(port, () => {
    console.log(`Listening port ${port}`)
})