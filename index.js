const express = require('express')
require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser')
const Logger = require('./middleware/logger')
const errorMiddleware = require('./middleware/error')
const libraryApiRouter = require('./routes/api/bookroute')
const usersRouter = require('./routes/users')
const indexRouter = require('./routes/index')
const bookRouter = require('./routes/book')

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.set("view engine", "ejs");


app.use('/public', express.static(__dirname+"/public"))

app.use(Logger)

app.use('/', indexRouter)
app.use('/book', bookRouter)
app.use('/api/books', libraryApiRouter)
app.use('/api/user', usersRouter)

app.use(errorMiddleware)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
