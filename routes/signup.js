const express = require('express');
const userModel = require('../model/user.model');
const router = express.Router();


const genHash  = async (password) =>  {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

router.post('/', async (req, res) => {
    try {
        // const {username, password} = req.body
        // const hashedPassword = await genHash(password)
        const user = await userModel.create(req.body);
        console.log(req.body);
        res.status(200).json({
            data: {
                username : user.username
            },
        })
    }
    catch (err) { 
        console.log(err);
        res.status(400).json(err)
    }
})

module.exports = router;