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

module.exports = router;