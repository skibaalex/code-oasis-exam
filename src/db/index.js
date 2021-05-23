const mongoose = require('mongoose');
const password = "code";
const uri = `mongodb+srv://codeoasis:${password}@cluster0.x5zfr.mongodb.net/test`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }).then(() => {
    console.log('DB was Initiated.')
}).catch(err => {
    console.log(err)
})

module.exports = { mongoose }