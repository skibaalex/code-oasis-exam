const mongoose = require('mongoose');
const { Schema, Model } = mongoose;
const { ObjectId } = mongoose.Types

/**
 * book = {
 *      name: string,
 *      author: string,
 *      description: string,
 *      publisher: string,
 *      cover: string (preset url)
 *  }
 */


const bookSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    author: {type: ObjectId, required: true, ref: 'Author'},
    publisher: {type: ObjectId, required: true, ref: 'Publisher'},
    cover: {type: String, required: true}
})

/**
 * author = {
 *     name: string,
 *     books: Array<bookRef>
 *  }
 */

const authorSchema = new Schema({
    name: {type: String, require: true},
    books: [{type: ObjectId, ref: 'Book'}]
})
const publisherSchema = new Schema({
    name: {type: String, require: true},
    books: [{type: ObjectId, ref: 'Book'}]
})

/*
    user = {
        token: string (JWT Token),
        username: string,
        password: string,
        books: Arrat<bookRef>,
        admin: boolean,
    }
*/

const userSchema = new Schema({
    username: {type: String, requiered: true, unique: true},
    password: {type: String, requiered: true, select: false},
    books: [{type: ObjectId, ref: 'Book'}],
    admin: {type: Boolean, default: false}
})

/**
 * Initialize Models
 */

const Book = mongoose.model('Book', bookSchema);
const Publisher = mongoose.model('Publisher', publisherSchema);
const Author = mongoose.model('Author', authorSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
    Book,
    Publisher,
    Author,
    User
}