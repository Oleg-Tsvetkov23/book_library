const express = require('express')
require('dotenv').config()
const cors = require('cors')
const formData = require('express-form-data')

const app = express()
app.use(cors())
app.use(formData.parse())

const {Todo} = require('./models');
const storage = {
    todo: [],
};

[1,2,3,4].map(item => {
    const nTodo = new Todo(`title${item}`, `desc${item}`, `author${item}`)
    storage.todo.push(nTodo)
})

app.post('/api/user/login', (req, res) => {
    const otv = {
        "id" : 1,
        "mail" : "test@mail.ru"
    }
    res.status(201).json(otv)
})

app.get('/api/books', (req, res) => {
    const {todo} = storage
    res.json(todo)
})

app.get('/api/books/:id', (req, res) => {
    const {todo} = storage
    const {id} = req.params
    const idx = todo.findIndex(item => item.id === id)
    if (idx !== -1) {
        res.json(todo[idx])
    } else {
        res.status(404)
        res.json("todo | not found")
    } 
})

app.post('/api/books', (req, res) => {
    const {todo} = storage
    const {title, description, authors, favorite, fileCover, fileName } = req.body
    const nTodo = new Todo(title, description, authors, favorite, fileCover, fileName)
    todo.push(nTodo)
    res.status(201)
    res.json(nTodo)
})

app.put('/api/books/:id', (req, res) => {
    const {todo} = storage
    const {id} = req.params
    const {title, description, authors, favorite, fileCover, fileName} = req.body
    const idx = todo.findIndex(item => item.id === id)
    if (idx !== -1) {
        todo[idx] = {
            ...todo[idx],
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName
        };
        res.json(todo[idx])
    } else {
        res.status(404)
        res.json("todo | not found")
    } 
})

app.delete('/api/books/:id', (req, res) => {
    const {todo} = storage
    const {id} = req.params
    const {title, description, authors, favorite, fileCover, fileName} = req.body
    const idx = todo.findIndex(item => item.id === id)
    if (idx !== -1) {
        todo.splice(idx, 1)
        res.json("Ok")
    } else {
        res.status(404)
        res.json("todo | not found")
    } 
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
