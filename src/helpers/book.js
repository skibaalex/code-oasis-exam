const { mongoose } = require('../db');
const { Book, User } = require('../db/models');
const jwt = require('jsonwebtoken');


/**
 * Get a list of books
 */
const getListOfBooks = (req,res) => {
    Book.find()
}

/**
 * Add a new book
 */
const addBook = (req,res) => {
    const book = new Book(req.body)
    book.save((err,book) => {
        if(err) return res.status(400).send({message: err})
        return res.status(200).send(book)
    })
}


/**
 * Get a book byId
 */
const getBook = (req, res) => {
    const { id } = req.params;
    Book.findOne({_id: id}, (err, book) => {
        if(err) return res.send(400).send({err})
        return res.status(200).send(book)
    })
}


/**
 * Update a Book
 */
const updateBook = (req, res) => {
    const { id, ...update } = req.body
    Book.findByIdAndUpdate(id, update, (err, book) => {
        if(err) return res.send(400).send({err})
        return res.status(200).send(book)
    })
}


/**
 * Delete a Book
 */
const deleteBook = (req,res) => {
    const { bookId } = req.body
    Book.findByIdAndDelete(bookId, (err) => {
        if(err) return res.send(400).send({err})
        return res.status(200).send({status: 'deleted'})
    })
}


/**
 * Purchase a book
 */
const buyBook = (req, res) => {
    const { user } = req;
    const { bookId } = req.body
    User.findOneAndUpdate({_id: user._id}, { $addToSet: { books: mongoose.Types.ObjectId(bookId) }}, (err, user) => {
        if(err) return res.send(400).send({err})
        return res.json({ token: jwt.sign({ user }, process.env.SECRET_KEY)});
    })
}
    
module.exports = {
    addBook,
    getBook,
    updateBook,
    deleteBook,
    buyBook,
    getListOfBooks
}