const express = require('express')
const router = express.Router()


const UserModel = require('../models/UserModel')
const ProfileModel = require('../models/ProfileModel')
const FollowerModel = require('../models/FollowerModel')

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const isEmail = require('validator/lib/isEmail')
const userPng = "https://res.cloudinary.com/indersingh/image/upload/v1593464618/App/user_mklcpl.png";
const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;


router.get(":/username", async(req, res)=>{
    const {username} = req.params
    try{
        if(username.length<1) return res.status(401).send('Invalid')
        if(!regexUserName.test(username)) return res.status(401).send('Invalid')

        const user =await UserModel.findOne({username:username.toLowerCase()})
        if(user) return res.status(401).send('Username already taken')

        return re.status(200).send('Available')

    }catch(error){
        console.log(error)
        return res.status(500).send('Server error')
    }
})


module.exports=router