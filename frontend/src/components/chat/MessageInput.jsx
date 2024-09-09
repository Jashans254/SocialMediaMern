import React, { useState } from 'react'
import { ChatData } from '../../context/ChatContext'
import toast from 'react-hot-toast';
import axios from 'axios';

const MessageInput = ({setMessages , selectedChat}) => {
    const [textMsg , setTextMsg] = useState("")

    const {setChats} = ChatData();

    const handleMessage = async(e) =>{
        e.preventDefault();
        try {
            const {data} = await axios.post("/api/messages" , {
                message:textMsg,
                recieverId : selectedChat.users[0]._id
            })

            setMessages((message)=>[...message , data])
            setTextMsg("")

            setChats ( (prev)=>{
                const updatedChats = prev.map( (chat)=>{
                    if(chat._id === selectedChat._id){
                        return {
                            ...chat , 
                            latestMessage:{
                                text:textMsg ,
                                sender:data.sender,
                            },
                        };
                    }
                    return chat;
                });

                return updatedChats;
            })
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }
  return (
    <div className="flex items-center justify-between mt-4">
    <form onSubmit={handleMessage} className="flex w-full">
      <input
        type="text"
        placeholder="Enter your message..."
        className="border border-gray-300 rounded-lg p-3 w-full mr-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        value={textMsg}
        onChange={(e) => setTextMsg(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 rounded-lg shadow-md transition-transform duration-200 transform hover:scale-105"
      >
        Send
      </button>
    </form>
  </div>
  
  )
}

export default MessageInput