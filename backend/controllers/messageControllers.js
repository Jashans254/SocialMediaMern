import { Chat } from "../models/chatModel.js";
import { Messages } from "../models/messages.js";
import { getReciverSocketId, io } from "../socket/socket.js";
import TryCatch from "../utils/Trycatch.js";

export const sendMessage = TryCatch(async(req , res) =>{

    const {recieverId , message} = req.body;


    const senderId = req.user._id;

    if(!recieverId){
        return res.status(400).json({
            message : "reciever is required"
        })
    }

    let chat = await Chat.findOne({
        users:{$all:[senderId , recieverId]} ,
    })

    if(!chat){
        chat = new Chat({
            users:[senderId , recieverId] ,
            latestMessage:{
                text:message,
                sender:senderId,
            }
        })

        await chat.save();
    }

    const newMessage = new Messages({
        chatId : chat._id ,
        sender: senderId , 
        text: message ,
    })
    await newMessage.save();

    await chat.updateOne({
        latestMessage:{
            text:message ,
            sender:senderId,
        }
    })

    const recieverSocketId = getReciverSocketId(recieverId)

    if(recieverSocketId) {
        io.to(recieverSocketId).emit("newMessage" , newMessage)
    }

    res.status(201).json( newMessage)
})

export const getAllMessages = TryCatch(async(req , res) =>{

    const {id} = req.params;

    const userId = req.user._id;

    const chat = await Chat.findOne({
        users:{$all:[userId , id]} ,
    }) 

    if(!chat) return res.status(404).json({
        message : "No chat found with these users"
    })

    const messages = await Messages.find({chatId : chat._id})

    res.json(messages)
})

export const getAllChats = TryCatch(async(req , res) =>{
    const chats = await Chat.find({users:req.user._id})
    .populate({
        path:"users",
        select:"name profilePic",
    })

    chats.forEach((e)=>{
        e.users = e.users.filter(
            users => users._id.toString() !== req.user._id.toString()
        )
    })
    res.json(chats)

})