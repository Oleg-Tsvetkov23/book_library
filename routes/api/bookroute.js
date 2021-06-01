const express = require('express')
const router = express.Router()
const fileMiddleware = require('../../middleware/file')
const path = require('path')

const {Books} = require('../../models');
const storage = {
    books: [],
};

[1,2,3,4].map(item => {
    const nBooks = new Books(`title${item}`, `desc${item}`, `author${item}`)
    storage.books.push(nBooks)
})

router.get('/', (req, res) => {
    const {books} = storage
    res.json(books)
})

router.get('/:id', (req, res) => {
    const {books} = storage
    const {id} = req.params
    const idx = books.findIndex(item => item.id === id)
    if (idx !== -1) {
        res.json(books[idx])
    } else {
        res.status(404)
        res.json("Books | not found")
    } 
})

router.post('/', (req, res) => {
    const {books} = storage
    const {title, description, authors, favorite, fileCover } = req.body
    const nBook = new Books(title, description, authors, favorite, fileCover)
    books.push(nBook)
    res.status(201)
    res.json(nBook)
})

router.put('/:id', (req, res) => {
    const {books} = storage
    const {id} = req.params
    const {title, description, authors, favorite, fileCover} = req.body
    const idx = books.findIndex(item => item.id === id)
    if (idx !== -1) {
        if (title) books[idx].title = title
        if (description) books[idx].description  = description
        if (authors) books[idx].authors = authors
        if (favorite) books[idx].favorite = favorite
        if (fileCover) books[idx].fileCover = fileCover
        res.json(books[idx])
    } else {
        res.status(404)
        res.json("Books | not found")
    } 
})

router.delete('/:id', (req, res) => {
    const {books} = storage
    const {id} = req.params
    const idx = books.findIndex(item => item.id === id)
    if (idx !== -1) {
        books.splice(idx, 1)
        res.json("Ok")
    } else {
        res.status(404)
        res.json("Books | not found")
    } 
})

router.post('/:id/upload', fileMiddleware.single('filename'), (req, res) => {
    if (req.file) {
        const {path} = req.file;
        const {books} = storage
        const {id} = req.params
        const idx = books.findIndex(item => item.id === id)
        if (idx === -1) return res.status(404).json("Books | not found")
        books[idx].fileName = path
        res.json(path);
    } else {
        res.json(null);
    }
});

router.get('/:id/download', (req, res) => {
    const {books} = storage
    const {id} = req.params
    const idx = books.findIndex(item => item.id === id)

    if (idx === -1) return res.status(404).json("Books | not found")

    fileBook = books[idx].fileName
    if (fileBook.length === 0 ) return res.status(404).json("Books | file not found")

    res.download(__dirname+'/../' + fileBook, path.basename(fileBook), err=>{
        if (err){
            res.status(404).json(err);
        }
    })
});

module.exports = router