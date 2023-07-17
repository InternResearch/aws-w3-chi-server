const express = require('express');
const router = express.Router();

const files = require('./files');
const login = require('./login');
const signup = require('./signup');

router.use('/files', files);
router.use('/login', login);
router.use('/signup', signup);

module.exports = router;