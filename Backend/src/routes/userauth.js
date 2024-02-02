const express = require('express')
const router = express.Router();
const user = require('../db/schema/user')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// to create new user (signup)
router.post('/signup',async (req,res)=>{
    try{
        const data = await user.findOne({email:req.body.email});
        if(data){
            res.status(400).send({error:'Email already in use'});
            return;
        }else{
            const passHash = await bcrypt.hash(req.body.pass,await bcrypt.genSalt(10))
            req.body.pass = passHash;
            
            const newUser = new user(req.body);
            await newUser.save()

            const existUser = await user.findOne({email:req.body.email})

            const authToken = jwt.sign({ID:existUser._id},JWT_SECRET);
            res.status(201).send({authToken});
        }
    }catch(e){
        console.log("Error : ",e)
    }
})

// to login existing user
router.post('/login', async (req,res)=>{
    try{
        const existUser = await user.findOne({email:req.body.email});
        if(!existUser){
            res.status(401).send({error:'Wrong credencials'})
            return;
        }
        const passwordCompare = await bcrypt.compare(req.body.password,existUser.pass);
        if(!passwordCompare){
          res.status(401).send({error:'Wrong credencials'});
          return;
        }
        const authToken = jwt.sign({ID:existUser._id},JWT_SECRET);
        res.status(200).send({authToken});
    }catch(e){
        console.log("Error : ",e.message);
    }
})

module.exports = router;