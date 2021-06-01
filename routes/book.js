const express = require('express')
const router = express.Router()

const {Books} = require('../models')
const storage = {
    books: [],
};

[1,2,3,4].map(item => {
    const nBooks = new Books(`title${item}`, `desc${item}`, `author${item}`)
    storage.books.push(nBooks)
})

router.get('/', (req, res) => {
    const {books} = storage
    res.render("book/index", {
        title: "Список книг",
        books: books,
    })
})

router.get('/create', (req, res) => {
    res.render("book/create", {
        title: "Библиотека | добавление книги",
        book: {},
    })
})

router.post('/create', (req, res) => {
    const {books} = storage
    const {title, description, authors} = req.body

    const newBook = new Books(title, description, authors);
    books.push(newBook);

    res.redirect('/book')
})

router.get('/:id', (req, res) => {
    const {books} = storage
    const {id} = req.params
    const idx = books.findIndex(item => item.id === id)
    if (idx !== -1) {
        res.render("book/view", {
            title: "Библиотека | Данные книги",
            book: books[idx],
        })
    } else {
        res.status(404).redirect('/404');
    }
})

router.get('/update/:id', (req, res) => {
    const {books} = storage
    const {id} = req.params
    const idx = books.findIndex(item => item.id === id)

    if (idx !== -1) {
        res.render("book/update", {
            title: "Библиотека | редактирование",
            book: books[idx],
        });
    } else {
        res.status(404).redirect('/404');
    }
});

router.post('/update/:id', (req, res) => {
    const {books} = storage
    const {id} = req.params
    const {title, description, authors} = req.body
    const idx = books.findIndex(item => item.id === id)

    if (idx !== -1) {
        if (title) books[idx].title = title
        if (description) books[idx].description  = description
        if (authors) books[idx].authors = authors        
        res.redirect(`/book/${id}`);
    } else {
        res.status(404).redirect('/404');
    }
})

router.post('/delete/:id', (req, res) => {
    const {books} = storage
    const {id} = req.params
    const idx = books.findIndex(item => item.id === id)

    if (idx !== -1) {
        books.splice(idx, 1);
        res.redirect(`/book`);
    } else {
        res.status(404).redirect('/404');
    }
})

module.exports = router