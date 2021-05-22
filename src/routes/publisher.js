const app = require('express');
const router = app.Router();
const { adminRequired } = require('../helpers/auth')
const { Publisher } = require('../db/models');


/**
 * create a new Publisher
 */
//TODO: use joi to make sure the data fits the model
router.post('/create', adminRequired, (req,res) => {
    const publisher = new Publisher(req.body)
    publisher.save((err, data) => {
        if(err) return res.status(400).json({message: err})
        return  res.status(200).json({message: 'success', publisher: data})
    })
});


/**
 * Update an publisher by ID
 */
router.put('/update', (req,res) => {
    const { id, update } = req.body;
    Publisher.findByIdAndUpdate(id, update, (err, publisher) => {
        if(err) return res.status(400).json({message: err})
        return  res.status(200).json({message: 'success', publisher: data})
    })
})

/**
 * Get a list of publishers
 */
router.get('/', (req,res) => {
    Publisher.find((err, publishers) => {
        if(err) return res.status(400).json({message: err})
        return  res.status(200).json({message: 'success', publishers})
    })
})


/**
 * Get an publisher by ID
 */

 router.get('/:id', (req,res) => {
    const { id } = req.params;
    Publisher.findById(id, (err, publisher) => {
        if(err) return res.status(400).json({message: err})
        return  res.status(200).json({message: 'success', publisher})
    })
})

/**
 * Remove an publisher
 */

router.delete('/:id', (req,res) => {
    const { id } = req.params;
    Publisher.findByIdAndDelete(id, (data) => {
        if(err) return res.status(400).json({message: err})
        return  res.status(200).json({message: 'success'})
    })
})


module.exports = router;