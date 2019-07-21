const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()

// // maintenance message temporary middleware
// app.use((req, res, next) => {
//     res.status(503).send('Server is under maintenance...')
// })

// use express to automatically parse incoming request to json
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

module.exports = app