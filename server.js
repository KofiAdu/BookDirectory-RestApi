require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

app.use(bodyParser.json())

app.set('view engine', 'ejs');
//importing routes
const bookPost = require('./router/books')

//middleware
app.use('/books', bookPost)


app.get('/', (req, res) => {
    res.send("Working")
})

//db conn string
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, ()=>{
    console.log('Connected to Database')
})

app.listen(port, ()=> {
    console.log(`Server listening on port ${port}`)
})