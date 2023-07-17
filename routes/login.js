const express = require('express');
const userModel = require('../model/user.model');
const jwt = require('jsonwebtoken');
const router = express.Router();


const verifyPassword =  async(enteredPassword, storedPassword) => {
    const passwordMatch = await bcrypt.compare(enteredPassword, storedPassword);
    return passwordMatch;
  }
router.post('/', async (req, res) => {
    try {
        const user = await userModel.findOne(req.body);
        const token = jwt.sign({username: user.username}, process.env.SECRET_KEY);

        // Return the access token to the client
        // res.json({ token });
        res.status(200).json({
            data: {
                username : user.username,
                // image: !user.image ? null : user.image
                token: token
            },
        })
        
    }
    catch (err) { 
        console.log(err);
        res.status(400).json(err)
    }
})

module.exports = router;