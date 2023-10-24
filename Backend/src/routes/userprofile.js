const express = require('express')
const router = express.Router();

const user = require('../db/schema/user')
const msg = require('../db/schema/message')

router.post('/sendmsg', (req,res)=>{
    console.log(req.body);
    try{
        const newMsg = new msg(req.body);
        newMsg.save()
        res.sendStatus(200);
    }catch(e){
        console.log("Error : ",e.message)
        res.sendStatus(500);
    }
})

router.get('/search', async (req,res)=>{
    // console.log(req.headers);
    try{
        const searchPattern = new RegExp(req.headers.username, 'i');
        // const data = await user.find({$text:{$search:`/${req.headers.username}/i`}});
        const data = await user.find({ username: { $regex: searchPattern }});
        console.log({data});
        res.send({data});
    }catch(e){
        console.log("Error : ",e.message);
    }
})

module.exports = router;