const express = require('express')
const router = express.Router();

const user = require('../db/schema/user')

// to create new user (signup)
router.post('/signup',async (req,res)=>{
    try{
        const data = await user.find({email:req.body.email});
        if(data.length>0){
            res.send({})
        }else{
            const newUser = new user(req.body);
            await newUser.save()
            const newData = await user.find({email:req.body.email});
            res.send(newData[0]);
        }
    }catch(e){
        console.log("Error : ",e.message)
        res.sendStatus(500);
    }
})

// to login existing user
router.get('/login', async (req,res)=>{
    try{
        const data = await user.find({email:req.headers.userid});
        if(data.length===1){
            if(data[0].pass===req.headers.pass){
                res.send(data[0]);
            }else{
                res.send({});
            }
        }else{
            res.send({}); 
        }
    }catch(e){
        console.log("Error : ",e.message);
    }
})

module.exports = router;