const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('./src/db')
const models = require('./src/db/models')
const booksRouter = require('./src/routes/books')
const authRouter = require('./src/routes/user')
const authorRouter = require('./src/routes/author')
const publisherRouter = require('./src/routes/publisher')




app.use(express.json());
app.use('/books', booksRouter);
app.use('/auth', authRouter);
app.use('/author', authorRouter);
app.use('/publisher', publisherRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})