import User from "../models/user.js";
import Message from "../models/message.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId,io } from "../lib/socket.js";
export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filterdUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json(filterdUsers);
    } catch (error) {
        console.error("error in getUserForSidebar:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId= req.user._id;

        const messages=await Message.find({
            $or:[
                {senderId:myId,receiverId:userToChatId},
                {senderId:userToChatId, receiverId:myId}
            ]
        })
        res.status(200).json(messages)

    } catch (error) {
        console.log("error in getMessages controller:" ,error.message);
        res.status(500).json({error:"Internal server error"});
    }
};


export const sendMessage = async(req,res)=>{
    try {
        const{text, image}=req.body;

        const{id:receiverId}=req.params;

        const senderId=req.user._id;

        let imageUrl;
        if(image){
            //upload base64 image to cloudinary
            const uploadResponse= await cloudinary.uploader.upload(image);
            imageUrl=uploadResponse.secure_url;
        }

        const newMessage=new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl,

        });


        await newMessage.save();

        //real time functionality goes here=>socket.io

        const receiverSocketId=getReceiverSocketId(receiverId);
        if(receiverSocketId){
            //emit the new message to the receiver
            io.to(receiverSocketId).emit("newMessage",newMessage);
        }



        res.status(201).json(newMessage);


    } catch (error) {
        console.log("Error in sendMessage controller:",error.message);
        res.status(500).json({error:"Internal server error"});

    }
};