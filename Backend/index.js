const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require("socket.io");
const { writeFile } = require('fs')

const PORT = 5000;

const app = express();
const server = http.createServer(app);
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

io.on('connection', async (socket)=>{
    const customSocketId = socket.handshake.query.userid;
    console.log(`connection from client with id : ${socket.id} and cus id `,customSocketId );
    
    soc_user_id.set(socket.id,customSocketId);
    user_soc_id.set(customSocketId,socket.id);
    await user.findByIdAndUpdate(customSocketId,{"status":true})
    const userData = await user.findById(customSocketId);
    let socketIDArray = []
    const promises = userData.friends.map((element)=>{
        if(user_soc_id.has(element)){
            socketIDArray.push(user_soc_id.get(element));
        }
    })
    await Promise.all(promises);
    socket.to(socketIDArray).emit('status_on_conn',customSocketId);

    socket.on('send_message', async (text_data,userID,isFriend,isFile)=>{
        try{
            let status = false;
            if(user_soc_id.has(userID)){
                const sockID = user_soc_id.get(userID);
                socket.to(sockID).emit('recv-message',text_data,isFile);
                status = true;
            }
            if(!isFile){
                const newMsg = new msg({"senderID":customSocketId,"reciverID":userID,"messages":text_data,"status":status});
                newMsg.save();
                if(!isFriend){
                    await user.findByIdAndUpdate(customSocketId,{ $push: { "friends": userID }})
                    // console.log("isFriend : ",updatedData," ",isFriend);
                }
            }else{
                writeFile("/home/user/temp.jpg", text_data, (err) => {
                    if(err){
                      console.log("error: ",err.message)
                    }
                  });
            }
        }catch(e){
            console.log("Error: ",e.message)
        }
    })

    socket.on("callUser", (data) => {
        try{
            if(user_soc_id.has(data.userid)){
                const sockID = user_soc_id.get(data.userid);
                socket.to(sockID).emit('callUser',{ signal: data.signalData, name: data.name});
            }
        }catch(e){
            console.log(e.message)
        }
	})

	socket.on("answerCall", (data) => {
        try{
            if(user_soc_id.has(data.userid)){
                const sockID = user_soc_id.get(data.userid);
                socket.to(sockID).emit('callAccepted',data.signal);
            }
        }catch(e){
            console.log(e.message)
        }
	})

    socket.on('dis_status', async ()=>{
        try{
            socketIDArray = []
            const promises = userData.friends.map((element)=>{
                if(user_soc_id.has(element)){
                    socketIDArray.push(user_soc_id.get(element));
                }
            })
            await Promise.all(promises);
            socket.to(socketIDArray).emit('status_on_dis',customSocketId);
        }catch(e){
            console.log("Error: ",e.message)
        }
    })

    socket.on("disconnect", async () => {
        console.log("User Disconnected with id : ",socket.id);
        try{
            soc_user_id.delete(socket.id);
            user_soc_id.delete(customSocketId);
            await user.findByIdAndUpdate(customSocketId,{"status":false,"lastModified":Date.now()});
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