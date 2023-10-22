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


app.use(express.json());
app.use(cors())

app.use('/auth',require('./src/routes/userauth'))
app.use('/profile',require('./src/routes/userprofile'))

io.on('connection',(socket)=>{
    console.log(`connection from client with id : ${socket.id}`);
    socket.on('send-message', (text_msg)=>{
        socket.broadcast.emit('rec-message',text_msg);
    })
    socket.on("disconnect", (reason) => {
        console.log("User Disconnected with id : ",socket.id);
    });
})

server.listen(PORT,(e)=>{
    if(e){
        console.log("Server error: ",e);
    }else{
        console.log(`Server Listening on PORT ${PORT}`)
    }
})  