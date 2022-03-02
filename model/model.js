const mongoose = require('mongoose')

let bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    page: {
        type: Number
    },
    edition: {
        type: String
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
})

let Book = mongoose.model('Book',bookSchema)

module.exports = Book