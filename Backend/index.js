const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const PORT = 5000;
const io = new Server(server, {
    cors: {
      origin: '*'
    }
  });
const connectDB = require('./src/db/config/db.config');

connectDB();

const user = require('./src/db/schema/user')
const msg = require('./src/db/schema/message');

app.use(express.json());
app.use(cors())

app.use('/auth',require('./src/routes/userauth'))
app.use('/profile',require('./src/routes/userprofile'))

const soc_user_id = new Map();
const user_soc_id = new Map();

io.on('connection',(socket)=>{
    const customSocketId = socket.handshake.query.userid;
    console.log(`connection from client with id : ${socket.id} and cus id `,customSocketId );
    
    soc_user_id.set(socket.id,customSocketId);
    user_soc_id.set(customSocketId,socket.id);
    const updatedData = user.findByIdAndUpdate(customSocketId,{status:true})
    console.log("status : ",updatedData);

    socket.on('send_message', (text_data,userID,isFriend)=>{
        try{
            let status = false;
            if(user_soc_id.has(userID)){
                const sockID = user_soc_id.get(userID);
                socket.to(sockID).emit('recv-message',text_data);
                status = true;
            }
            const newMsg = new msg({"senderID":customSocketId,"reciverID":userID,"messages":text_data,"status":status});
            newMsg.save();
            if(!isFriend){
                const updatedData = user.findByIdAndUpdate(customSocketId,{ $push: { friends: userID }})
                console.log("isFriend : ",updatedData," ",isFriend);
            }
        }catch(e){
            console.log("Error: ",e.message)
        }
    })
    socket.on("disconnect", () => {
        console.log("User Disconnected with id : ",socket.id);
        try{
            soc_user_id.delete(socket.id);
            user_soc_id.delete(customSocketId);
            const updatedData = user.findByIdAndUpdate(customSocketId,{status:false,lastModified:Date.now()});
            console.log("Disconnected : ",updatedData);
        }catch(e){
            console.log("Error: ",e.message);
        }
    });
})

server.listen(PORT,(e)=>{
    if(e){
        console.log("Server error: ",e);
    }else{
        console.log(`Server Listening on PORT ${PORT}`)
    }
})  