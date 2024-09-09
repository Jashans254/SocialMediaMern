import React from 'react'
import { UserData } from '../../context/UserContext';
import { BsSendCheck } from "react-icons/bs";

const Chat = ({chat , setSelectedChat  , isOnline}) => {

    const {user:loggedInUser} = UserData();
    let user;

    if(chat) user = chat.users[0];
  return (
    <>
        {
         user && (
            <div
              className="bg-gray-200 py-3 px-4 rounded-md cursor-pointer mt-3 transition-transform transform hover:scale-105 hover:shadow-lg"
              onClick={() => setSelectedChat(chat)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  {isOnline && <div className="text-lg font-bold text-green-400">●</div>}
                  <img src={user.profilePic.url} alt="" className="w-10 h-10 rounded-full border-2 border-gray-300" />
                  <span className="font-semibold text-gray-800">{user.name}</span>
                </div>
                <span className={`text-sm ${loggedInUser._id === chat.latestMessage.sender ? 'text-green-500' : 'text-gray-600'}`}>
                  {chat.latestMessage.text.length > 18 ? `${chat.latestMessage.text.slice(0, 18)}...` : chat.latestMessage.text}
                </span>
              </div>
          
              <div className="flex justify-between items-center mt-1">
                <span className={`text-xs ${loggedInUser._id === chat.latestMessage.sender ? 'text-green-500' : 'text-gray-500'}`}>
                  {loggedInUser._id === chat.latestMessage.sender && <BsSendCheck />}
                </span>
                
              </div>
            </div>
          )
          
          
            
        }
    </>
  )
}

export default Chat