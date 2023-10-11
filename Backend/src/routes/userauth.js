const express = require('express')
const router = express.Router();

const user = require('../db/schema/user')

// to create new user (signup)
router.post('/signup',async (req,res)=>{
    console.log(req.body);
    try{
        const newUser = new user(req.body);
        await newUser.save()
        res.sendStatus(200);
    }catch(e){
        console.log("Error : ",e.message)
        res.sendStatus(500);
    }
})

// to login existing user
router.get('/login', async (req,res)=>{
    console.log(req.body);
    try{
        const data = await user.find({email:req.body.email});
        if(data.length===1){
            if(data[0].pass===req.body.pass){
                res.send("Logged in!");
            }else{
                res.send("Invalid email or password");
            }
        }else{
            res.send("Invalid email or password");
        }
    }catch(e){
        console.log("Error : ",e.message);
    }
})

module.exports = router;