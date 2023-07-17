const mongoose = require('mongoose')

const conn = mongoose.createConnection('mongodb://127.0.0.1:27017/s3bucket').on('open',()=>{
    console.log('MongoDB Connected')
}).on('error',()=>{
    console.log('MongoDB error')
})

module.exports = conn