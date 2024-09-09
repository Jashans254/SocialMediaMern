import React , { useEffect, useState } from 'react'
import { BsChat, BsChatFill, BsThreeDotsVertical } from 'react-icons/bs'
import { IoHeartOutline, IoHeartSharp } from 'react-icons/io5'
import { UserData } from '../context/UserContext'
import { PostData } from '../context/PostContext'
import {format, fromUnixTime} from 'date-fns'
import { Link } from 'react-router-dom'
import { MdDelete } from "react-icons/md";
import SimpleModal from './SimpleModal'
import { Loading, LoadingAnimation } from './Loading'
import toast from 'react-hot-toast'
import axios from 'axios'
import { SocketData } from '../context/SocketContext.'



const PostCard = ({type , value}) => {

    const [isLike, setIsLike] = useState(false)
    const [show , setShow]  = useState(false)
    const {user} = UserData();
    const {likePost , addComment , deletePost , loading , fetchPosts} = PostData();

    const formatDate = format(new Date(value.createdAt) , "dd MMM yyyy")
    useEffect(()=>{
        for(let i = 0 ; i<value.likes.length;i++)
        {
            if(value.likes[i] ===  user._id) setIsLike(true)
        }
    } , [value , user._id]);

    const likeHandler = () =>{
        likePost(value._id)
        setIsLike(!isLike)
    }

    const [comment , setComment] = useState("")
    const addCommentHandler = (e) =>{
        e.preventDefault()
        addComment(value._id , comment , setComment , setShow)
    }

    const [showMoadal , setShowMoadal] = useState(false)
    const closeModal = () =>{
        setShowMoadal(false)
    }


    const deleteHandler = () =>{
        deletePost(value._id)
    }

    const [showInput , setShowInput] = useState(false)

    const editHandler = () =>{
        setShowMoadal(false)
        setShowInput(true)
    }

    const [caption , setCaption] = useState(value.caption? value.caption:"")
    const [captionLoading , setCaptionLoading] = useState(false)

    async function updateCaption () {
        setCaptionLoading(true)
        try {
            const {data} = await axios.put("/api/post/"+value._id , {caption})
            toast.success(data.message)
            fetchPosts()
            setShowInput(false)
            setCaptionLoading(false)
        } catch (error) {
            toast.error(error.response.data.message)
            setCaptionLoading(false)
        }
    }

    const {onlineUsers} = SocketData()
  return (
    <div className="bg-gray-100 flex items-center justify-center pt-3 pb-14">
    <SimpleModal isOpen={showMoadal} onClose={closeModal}>
      <div className="flex flex-col items-center justify-center gap-3">
        <button
          className="bg-blue-400 text-white py-1 px-3 rounded-md hover:bg-blue-500 transition duration-200 ease-in-out"
          onClick={editHandler}
        >
          Edit
        </button>
        <button
          onClick={deleteHandler}
          disabled={loading}
          className="bg-red-400 text-white py-1 px-3 rounded-md hover:bg-red-500 transition duration-200 ease-in-out"
        >
          {loading ? <Loading /> : "Delete"}
        </button>
      </div>
    </SimpleModal>
  
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md transform transition duration-300 hover:scale-105 hover:shadow-lg">
      <div className="flex items-center space-x-2">
        <Link className="flex items-center space-x-2" to={`/user/${value.owner._id}`}>
          <img src={value.owner.profilePic.url} alt="" className="w-10 h-10 rounded-full" />
          {onlineUsers.includes(value.owner._id) && (
            <div className="text-2xl font-bold text-green-400">.</div>
          )}
          <div>
            <p className="text-gray-800 font-semibold">{value.owner.name}</p>
            <div className="text-gray-500 text-sm">{formatDate}</div>
          </div>
        </Link>
        {value.owner._id === user._id && (
          <div className="text-gray-500 cursor-pointer">
            <button
              onClick={() => setShowMoadal(true)}
              className="hover:bg-gray-200 rounded-full p-2 text-2xl"
            >
              <BsThreeDotsVertical />
            </button>
          </div>
        )}
      </div>
  
      <div className="my-4">
        {showInput ? (
          <>
            <div className="mt-4 mb-4 flex flex-col gap-4 items-center justify-center">
              <input
                className="custom-input w-full p-2 border rounded-md"
                type="text"
                placeholder="Enter Caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                required
              />
              <div className="flex space-x-4">
                <button
                  onClick={updateCaption}
                  disabled={captionLoading}
                  className="text-sm bg-blue-500 text-white px-4 py-2 rounded-md font-bold hover:bg-blue-600 transition duration-200 ease-in-out"
                >
                  {captionLoading ? <LoadingAnimation /> : "Update Caption"}
                </button>
                <button
                  onClick={() => setShowInput(false)}
                  className="text-sm bg-red-500 text-white px-4 py-2 rounded-md font-bold hover:bg-red-600 transition duration-200 ease-in-out"
                >
                  &times; Close
                </button>
              </div>
            </div>
          </>
        ) : (
          <p className="text-gray-800">{value.caption}</p>
        )}
      </div>
  
      <div className="mb-4">
        {type === "post" ? (
          <img
            src={value.post.url}
            alt=""
            className="w-full h-auto object-cover rounded-md"
          />
        ) : (
          <video
            src={value.post.url}
            alt=""
            className="w-[450px] h-[600px] object-cover rounded-md"
            autoPlay
            loop
            controls
            controlsList="nodownload"
          />
        )}
      </div>
  
      <div className="flex items-center justify-between text-gray-500">
        <div className="flex items-center space-x-2">
          <span onClick={likeHandler} className="text-red-500 text-2xl cursor-pointer">
            {isLike ? <IoHeartSharp /> : <IoHeartOutline />}
          </span>
          <button className="hover:bg-gray-50 rounded-full p-2">{value.likes.length} likes</button>
        </div>
        <button
          className="flex items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-2"
          onClick={() => setShow(!show)}
        >
          <BsChatFill />
          <span>{value.Comments.length} comments</span>
        </button>
      </div>
  
      {show && (
        <form onSubmit={addCommentHandler} className="flex gap-3 mt-4">
          <input
            type="text"
            className="custom-input flex-grow p-2 border rounded-lg"
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="bg-gray-200 rounded-lg px-5 py-2" type="submit">
            Add
          </button>
        </form>
      )}
  
      <hr className="my-2" />
      <p className="text-gray-800 font-semibold">Comments</p>
      <hr className="my-2" />
  
      <div className="mt-4">
        <div className="comments max-h-[200px] overflow-y-auto">
          {value.Comments && value.Comments.length > 0 ? (
            value.Comments.map((e) => (
              <Comment value={e} key={e._id} user={user} owner={value.owner._id} id={value._id} />
            ))
          ) : (
            <p>No Comments</p>
          )}
        </div>
      </div>
    </div>
  </div>
  
  )
}

export default PostCard

export const Comment = ({ value, user, owner, id }) => { 
    const { deleteComment } = PostData(); 

    const deleteCommentHandler = () => {
        deleteComment(id, value._id);
    }

    return (
        <div className="flex items-start space-x-4 mt-4 p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition duration-200 ease-in-out">
            <Link to={`/user/${value.user._id}`}>
                <img src={value.user.profilePic.url} className='w-10 h-10 rounded-full border-2 border-gray-200' alt={value.user.name} />
            </Link>
            <div className="flex-grow">
                <p className="text-gray-900 font-semibold">{value.user.name}</p>
                <p className="text-gray-600 text-sm bg-gray-100 p-2 rounded-lg">
                    {value.Comment}
                </p>
            </div>
            <div className="flex items-center space-x-2">
                {
                    owner === user._id || value.user._id === user._id ? (
                        <button 
                            onClick={deleteCommentHandler} 
                            className="text-red-500 hover:text-red-700 transition duration-200 ease-in-out"
                        >
                            <MdDelete size={20} />
                        </button>
                    ) : null
                }
            </div>
        </div>
    );
}


