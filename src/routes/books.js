const app = require('express');
const router = app.Router();
const {Book} = require('../db/models')
const { adminRequired, loginRequired } = require('../helpers/auth');
const { addBook, buyBook, updateBook, getBook, deleteBook } = require('../helpers/book');

/**
 * get a list of books
 */
//TODO: Add MongoDB Cursor for pagination
router.get('/', (req,res) => {
    res.send('List of Books')
})


/**
 * get a book by id
 */
router.get('/:id', getBook)


/**
 * Update a book
 */
router.put('/update/', adminRequired,  updateBook)


/**
 * Create a new book
 */
router.post('/create',adminRequired, addBook)

router.post('/purchase',loginRequired, buyBook)

router.delete('/delete', adminRequired, deleteBook)


module.exports = router;