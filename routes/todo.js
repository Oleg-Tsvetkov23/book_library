const express = require('express')
const router = express.Router()
const fileMiddleware = require('../middleware/file')
const path = require('path')

const {Todo} = require('../models');
const storage = {
    todo: [],
};

[1,2,3,4].map(item => {
    const nTodo = new Todo(`title${item}`, `desc${item}`, `author${item}`)
    storage.todo.push(nTodo)
})

router.get('/', (req, res) => {
    const {todo} = storage
    res.json(todo)
})

router.get('/:id', (req, res) => {
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

router.post('/', (req, res) => {
    const {todo} = storage
    const {title, description, authors, favorite, fileCover, fileName } = req.body
    const nTodo = new Todo(title, description, authors, favorite, fileCover, fileName)
    todo.push(nTodo)
    res.status(201)
    res.json(nTodo)
})

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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

router.post('/:id/upload', fileMiddleware.single('filename'), (req, res) => {
    if (req.file) {
        const {path} = req.file;
        const {todo} = storage
        const {id} = req.params
        const idx = todo.findIndex(item => item.id === id)
        if (idx === -1) return res.status(404).json("todo | not found")
        todo[idx].fileName = path
        res.json(path);
    } else {
        res.json(null);
    }
});

router.get('/:id/download', (req, res) => {
    const {todo} = storage
    const {id} = req.params
    const idx = todo.findIndex(item => item.id === id)

    if (idx === -1) return res.status(404).json("todo | not found")

    fileBook = todo[idx].fileName
    if (fileBook.length === 0 ) return res.status(404).json("todo | file not found")

    res.download(__dirname+'/../' + fileBook, path.basename(fileBook), err=>{
        if (err){
            res.status(404).json(err);
        }
    })
});

module.exports = router