
const express = require('express');
const router = express.Router();
const filesService = require('../services/filesService');
const jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
    // Verify the access token
    const token = req.headers.authorization.split(' ')[1];
    const username = jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    // const username = decoded.username;
    return decoded.username
    })
    const {contentType} = req.query;
    const urls = await filesService.generateUrl(username,contentType);
    res.send({urls});
})


module.exports = router;