const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const middleware = require('../helpers/helper')


router.get(`/`, async (req, res) =>{
    // const userList = await User.find().select('-passwordHash');

    // if(!userList) {
    //     res.status(500).json({success: false})
    // } 
    // res.send(userList);

    const userList = await User.find().select('-passwordHash');
    if(!userList){
        res.status(500).json({success:false})
    }
    res.send(userList)
})



router.post('/register', middleware.register,async (req,res)=>{
    let user = new User({
        name: req.body.name,
        password: req.body.password
    })
    user = await user.save();
    if(!user)
    return res.status(400).send('the user cannot be created!')
    res.send(user);
})






module.exports =router;