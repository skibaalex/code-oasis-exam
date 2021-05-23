const app = require('express');
const router = app.Router();
const { Book } = require('../db/models')
const { adminRequired, loginRequired } = require('../helpers/auth');
const { addBook, buyBook, updateBook, getBook, deleteBook, myBooks, searchBooks } = require('../helpers/book');

/**
 * get a list of books
 */
//TODO: Add MongoDB Cursor for pagination
router.get('/', (req, res) => {
    Book.find((err, books) => {
        if (err) return res.status(404).send(err)
        return res.status(200).send(books)
    })
})


/**
 * get a book by id 
 */
router.get('/book/:id', getBook)


/**
 * Update a book
 */
router.put('/update/', adminRequired, updateBook)


/**
 * Create a new book
 */
router.post('/create', adminRequired, addBook)


/**
 * Buy a book
 */
router.post('/purchase', loginRequired, buyBook)


/**
 * Delete a book
 */
router.delete('/delete/:id', adminRequired, deleteBook)

/**
 * get a list of books buy user
 */

router.get('/mybooks', loginRequired, myBooks)

/**
 * Search Query
 */

router.get('/query/:query', searchBooks)



module.exports = router;