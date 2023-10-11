const express = require('express')
const router = express.Router();

const msg = require('../db/schema/message')

router.post('/sendmsg', (req,res)=>{
    console.log(req.body);
    try{
        const newMsg = new msg(req.body);
        // let usermessages = newMsg.find({"userID":req.body.userID})
        
        newMsg.save()
        res.sendStatus(200);
    }catch(e){
        console.log("Error : ",e.message)
        res.sendStatus(500);
    }
})

module.exports = router;