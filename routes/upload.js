const express = require('express');
const router = express.Router();
const userModel = require('../model/user.model');
const jwt = require('jsonwebtoken');


router.post('/', async (req, res) => {
    const image = req.body.image;
    // Verify the access token
    const token = req.headers.authorization.split(' ')[1];
    const username = jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    // const username = decoded.username;
    return decoded.username
    })
    try {
        const user = await userModel.updateOne({ username },
            {
              image: image
            });
        console.log(user,username,"dat")
        res.status(200).json({
            data: {
                username : user.username,
                image: !user.image ? null : user.image
            },
        })
    }
    catch (err) { 
        console.log(err);
        res.status(400).json(err)
    }
})

module.exports = router;