const app = require('express');
const router = app.Router();
const { login, register, adminRequired } = require('../helpers/auth')
const { User, Author } = require('../db/models');


/**
 * create a new author
 */
//TODO: use joi to make sure the data fits the model
router.post('/create', adminRequired, (req,res) => {
    const author = new Author(req.body)
    author.save((err, data) => {
        if(err) return res.status(400).json({message: err})
        return  res.status(200).json({message: 'success', author: data})
    })
});


/**
 * Update an Author by ID
 */
router.put('/update', (req,res) => {
    const { id, update } = req.body;
    Author.findByIdAndUpdate(id, update, (err, author) => {
        if(err) return res.status(400).json({message: err})
        return  res.status(200).json({message: 'success', author: data})
    })
})

/**
 * Get a list of Authors
 */
router.get('/', (req,res) => {
    Author.find((err, authors) => {
        if(err) return res.status(400).json({message: err})
        return  res.status(200).json({message: 'success', authors})
    })
})


/**
 * Get an Author by ID
 */

 router.get('/:id', (req,res) => {
    const { id } = req.params;
    Author.findById(id, (err, author) => {
        if(err) return res.status(400).json({message: err})
        return  res.status(200).json({message: 'success', author})
    })
})

/**
 * Remove an Author
 */

router.delete('/:id', (req,res) => {
    const { id } = req.params;
    Author.findByIdAndDelete(id, (data) => {
        if(err) return res.status(400).json({message: err})
        return  res.status(200).json({message: 'success'})
    })
})


module.exports = router;