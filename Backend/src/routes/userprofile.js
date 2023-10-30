const express = require('express')
const router = express.Router();

const user = require('../db/schema/user')

router.get('/search', async (req,res)=>{
    try{
        const searchPattern = new RegExp(req.headers.username, 'i');
        const data = (await user.find({ username: { $regex: searchPattern }})).filter(u=>u._id!=req.headers.userid);        
        res.send({data});
    }catch(e){
        console.log("Error : ",e.message);
    }
})

router.get('/searchFr', async (req,res)=>{
    try{
        const data = [];
        let searchedUser = await user.findById(req.headers.userid)
        const promises = searchedUser.friends.map(async (element) => {
            let searchedUser = await user.findById(element);
            data.push(searchedUser);
        });
        await Promise.all(promises);
        res.send({"data":JSON.stringify(data)});
    }catch(e){
        console.log("Error : ",e.message);
    }
})

router.get('/chathistory', async (req,res)=>{e})

module.exports = router;