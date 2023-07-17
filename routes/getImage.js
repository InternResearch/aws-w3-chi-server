const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userModel = require('../model/user.model');

router.get('/', async (req, res) => {
    // const {username} = req.query;
    try {
         // Verify the access token
        const token = req.headers.authorization.split(' ')[1];
        const username = jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
   
        return decoded.username
        })
        const image = (await userModel.findOne({ username })).image
        res.status(200).json({
            data: {
                username : username,
                image: image
            },
        })
        
    }
    catch (err) { 
        console.log(err);
        res.status(400).json(err)
    }
})

module.exports = router;