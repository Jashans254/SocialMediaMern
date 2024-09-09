import React, { useEffect, useState } from 'react'
import { ChatData } from '../context/ChatContext'
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import Chat from '../components/chat/Chat';
import MessageContainer from '../components/chat/MessageContainer';
import { SocketData } from '../context/SocketContext.';

const ChatPage = ({user}) => {
  const {createChat, selectedChat ,setSelectedChat , chats , setChats} = ChatData();


  const [users, setUsers] = useState([])
  const [query , setQuery] = useState("")
  const [search , setSearch] = useState(false)

  async function fetchAllUsers(){
    try {
      const {data} = await axios.get("/api/user/all?search=" + query)
      //console.log(data)
      setUsers(data)
    } catch (error) {
      console.log(error)
    }
  }

  const getAllChats = async () => {
    try {
      const { data } = await axios.get("/api/messages/chats");
      setChats(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect( ()=>{
    fetchAllUsers()
  } , [query])

  useEffect ( ()=>{
    getAllChats()
  } , [])

  async function createNewChat(id){
    await createChat(id)
    setSearch(false)
    getAllChats();
  }

  const {onlineUsers , socket} = SocketData();


  return (

<div className="w-full h-screen flex flex-col md:flex-row bg-gray-100 py-20">
  {/* Left Sidebar for Chats and Search */}
  {selectedChat === null && ( // Only render sidebar if no chat is selected
    <div className="w-full md:w-1/3 bg-white rounded-lg shadow-md p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <button className="bg-blue-500 text-white px-3 py-1 rounded-full transition-transform transform hover:scale-105" onClick={() => setSearch(!search)}>
          {search ? "X" : <FaSearch />}
        </button>
        {search && (
          <input
            type="text"
            className="custom-input w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500 transition-colors duration-200"
            placeholder="Enter name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        )}
      </div>

      {/* User List or Chats */}
      <div className="users mt-2">
        {search ? (
          users && users.length > 0 ? (
            users.map((e) => (
              <div onClick={() => createNewChat(e._id)} key={e._id} className="bg-blue-500 text-white p-2 mt-2 cursor-pointer flex items-center gap-2 rounded-lg shadow hover:bg-blue-600 transition-colors duration-200">
                <img src={e.profilePic.url} className="w-8 h-8 rounded-full" alt="" />
                <span>{e.name}</span>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 mt-2">No users found</p>
          )
        ) : (
          <div className="flex flex-col">
            {chats.length > 0 ? (
              chats.map((e) => (
                <Chat key={e._id} chat={e} setSelectedChat={setSelectedChat} isOnline={onlineUsers.includes(e.users[0]._id)} />
              ))
            ) : (
              <p className="text-center text-gray-600 mt-2">No chats available</p>
            )}
          </div>
        )}
      </div>
    </div>
  )}

  {/* Chat and Message Area */}
  <div className="w-full  h-full bg-white rounded-lg shadow-md p-4 overflow-y-auto flex flex-col">
    {selectedChat === null ? (
      <div className="mt-40 text-2xl text-center text-gray-600">Hello 👋 {user.name}, select a chat to start a conversation.</div>
    ) : (
      <>
        <div className="flex justify-between items-center mb-4">
          <button
            className="bg-gray-300 text-gray-800 px-3 py-1 rounded-full transition-transform transform hover:scale-105"
            onClick={() => setSelectedChat(null)} // Set selectedChat to null to go back to user list
          >
            Back to Users
          </button>
          
        </div>
        <MessageContainer selectedChat={selectedChat} setChats={setChats} />
      </>
    )}
  </div>
</div>


  )
}

export default ChatPage