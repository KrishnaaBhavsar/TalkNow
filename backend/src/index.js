import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import authRoutes from './routes/auth.js'; 
import messageRoutes from './routes/message.js'
import {connectDB} from './lib/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { app,server } from './lib/socket.js';


// deleting the app from here as we have already put in the socket.io file



const PORT= process.env.PORT ;

app.use(express.json({limit:'50mb'}));
app.use(cookieParser());

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
})
);


app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);



//will change app with server we just have created at the socket io file
server.listen(PORT,() => {
    console.log('Server is running on port :'+ PORT);  
    connectDB();
});


// want to use the socket then change the app. to server 