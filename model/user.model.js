const db = require('../config/db');
const mongoose = require('mongoose');
const {Schema} = mongoose

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    image: {
        type: String,
    }
},{timestamps: true})

const userModel = db.model('user', userSchema)
module.exports = userModel