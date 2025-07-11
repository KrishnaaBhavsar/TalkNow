import {Server} from "socket.io";
import http from "http";
import express from "express";

const app=express();

const server=http.createServer(app);

const io=new Server(server,{
    cors:{
        origin:["http://localhost:5173"]

    },
});

export function getReceiverSocketId(userId) {
    // This function will return the socket ID of the user with the given userId
    return userSocketMap[userId];
}

//used tostore online users and their socket ids
// This map will help in tracking which user is connected to which socket
const userSocketMap={};     //{userId:socketId}


io.on("connection",(socket) =>{
    console.log("A user connected",socket.id);

    const userId=socket.handshake.query.userId;
    // Assuming userId is sent as a query parameter

    if(userId) userSocketMap[userId]=socket.id;

    //io.emit( ) is used to send events to all the connected clients
    io.emit("getOnlineUsers",Object.keys(userSocketMap));

    socket.on("disconnect",()=>{
        console.log("A user disconnected",socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
    });
});

export {io, app ,server};

// The io object can be used to handle socket events
