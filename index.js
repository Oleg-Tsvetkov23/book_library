const express = require('express')
require('dotenv').config()
const cors = require('cors')
//const formData = require('express-form-data')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
//app.use(formData.parse())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
//app.use(bodyParser());

const Logger = require('./middleware/logger')
const errorMiddleware = require('./middleware/error')

app.use('/public', express.static(__dirname+"/public"))

app.use(Logger)

const todoRouter = require('./routes/bookroute')
const usersRouter = require('./routes/users')

app.use('/api/books', todoRouter)
app.use('/api/user', usersRouter)

app.use(errorMiddleware)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
