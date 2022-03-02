const express = require('express')
const bodyParser = require('body-parser')
//get router
const router = express.Router()

router.use(bodyParser.json())
.use(bodyParser.urlencoded({
    extended: true
}));

//importing database models from models folder
const Book = require('../model/model')

//get all books
router.get('/',  async (req, res) => {
    const books = await Book.find()
    res.json(books)
})


//adding database models
router.post('/',  (req, res) => {
    const book = new Book({
    // title  : req.body.title,
    author : req.body.author,
    page   : req.body.page,
    edition: req.body.edition,
    date   : req.body.dateCreated
    })

    book.save().then((data) => {
        res.json(data)
    }).catch((err) => {
        res.json({err: err})
    })

})


//get book by title
//async because its making a request to the database
router.get('/:title', async (req, res) => {
    const book = await Book.findOne({title: req.params.title})
    res.json(book)
    
})

//find all books by an author
//making author request more specific so it doesn't conflict with the title request.
router.get('/author/:author', async (req, res) =>{
    const book = await Book.find({author: req.params.author})
    res.json(book)
    
})



//delete book by title
router.delete('/:title', async (req, res) => {
    const book = await Book.remove({title: req.params.title})
    res.json({message: `${book} is deleted`}) 
})

//update book
router.patch('/:title', async (req, res) => {
    const book = await Book.updateOne({title: req.params.title}, {title: "Change title to whatever you want"}) 
    res.json(book)
})

module.exports = router