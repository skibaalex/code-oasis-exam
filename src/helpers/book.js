const { mongoose } = require('../db');
const { Book, User, Purchase } = require('../db/models');
const jwt = require('jsonwebtoken');
const { ObjectId } = mongoose.Types

/**
 * Get a list of books
 */
const getListOfBooks = (req, res) => {
    Book.find()
}

/**
 * Add a new book
 */
const addBook = (req, res) => {
    const book = new Book(req.body)
    console.log(req.body)
    book.save((err, book) => {
        if (err) return res.status(400).send({ message: err })
        return res.status(200).send(book)
    })
}


/**
 * Get a book byId
 */
const getBook = (req, res) => {
    const { id } = req.params;
    Book.findOne({ _id: id }, (err, book) => {
        if (err) return res.status(400).send({ err })
        return res.status(200).send(book)
    })
}


/**
 * Update a Book
 */
const updateBook = (req, res) => {
    const { _id, values } = req.body
    console.log(values.description)
    Book.findByIdAndUpdate(_id, { ...values }, (err, book) => {
        if (err) return res.send(400).send({ err })
        return res.status(200).send(book)
    })
}


/**
 * Delete a Book
 */
const deleteBook = (req, res) => {
    const { id } = req.params
    console.log(id)
    Book.findByIdAndDelete(id, (err) => {
        if (err) return res.send(400).send({ err })
        return res.status(200).send({ status: 'deleted' })
    })
}


/**
 * Purchase a book
 */
const buyBook = (req, res) => {
    const { bookId } = req.body
    Purchase.exists({ user: req.user._id }).then(exists => {
        if (exists) {
            Purchase.findOneAndUpdate({ user: req.user._id }, { '$addToSet': { 'books': bookId } }, (err, result) => {
                console.log(err)
                if (err) return res.status(400).send(err)
                res.status(200).send(result)
            })
        } else {
            const purchase = new Purchase({ user: ObjectId(req.user._id), books: [ObjectId(bookId)] })
            purchase.save().then(() => {
                purchase.populate('books').execPopulate().then(books => {
                    return res.status(200).send(books)
                })
            })

        }
    })
}

/**
 * Get a list of the purchased books
 */

const myBooks = (req, res) => {
    const { user } = req;
    Purchase.findOne({ user: user._id }).exec((err, result) => {
        if (err) return res.status(400).send({ err })
        return res.status(200).send(!result ? null : result.books)
    })
}

/**
 * Search Queries
 */

const searchBooks = (req, res) => {
    const { query } = req.params;
    const regex = new RegExp(query, 'i');
    Book.find({ name: regex }, (err, results) => {
        if (err) return res.status(400).send(err)
        return res.status(200).send(results)
    })
}


module.exports = {
    addBook,
    getBook,
    updateBook,
    deleteBook,
    buyBook,
    getListOfBooks,
    myBooks,
    searchBooks
}