const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000
const mongoose = require('./src/db')
const models = require('./src/db/models')
const booksRouter = require('./src/routes/books')
const authRouter = require('./src/routes/user')
const authorRouter = require('./src/routes/author')
const publisherRouter = require('./src/routes/publisher')
const morgan = require('morgan')
const fileUpload = require('express-fileupload');


app.use(morgan('tiny'))
app.use(express.json());
app.use(cors());
app.use('/books', booksRouter);
app.use('/auth', authRouter);
app.use('/author', authorRouter);
app.use('/publisher', publisherRouter)
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/upload', async (req, res) => {
    try {
        if (!req.file) {
            res.status(401).send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            const cover = req.files.cover;
            cover.mv('./static/' + cover.name);
            res.status(200).send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: cover.name,
                    mimetype: cover.mimetype,
                    size: cover.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});


app.use(fileUpload({
    createParentPath: true
}));


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})