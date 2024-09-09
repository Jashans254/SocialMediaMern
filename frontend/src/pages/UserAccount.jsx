import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PostData } from '../context/PostContext';
import PostCard from '../components/PostCard';
import { FaArrowUp , FaThumbsUp , FaComment  } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa6";
import axios from 'axios';
import { Loading } from '../components/Loading'; 
import { UserData } from '../context/UserContext';
import Modal from '../components/Modal';
import { SocketData } from '../context/SocketContext.';
const Account = ({user : loggedInUser}) => {

    const navigate = useNavigate();


    const {posts , reels} = PostData();

    const [user , setUser] = useState([])

    const params = useParams();

    const [loading , setLoading] = useState(true)
    async function fetchUser (){
      try {
        const {data} = await axios.get("/api/user/" + params.id)
        setUser(data)
       setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }

    

    useEffect( ()=>{
      fetchUser()
    },[params.id]
    )

    let myPosts;
    if(posts){
        myPosts = posts.filter((post)=> post.owner._id === user._id);
    }

    let myReels;
    if(posts){
        myReels = reels.filter((reel)=> reel.owner._id === user._id);
    }
    const [type , setType] = useState("post")
    

    const [index , setIndex] = useState(0)

    const prevReel = () =>{
      if(index === 0){
        return null;
      }
  
      setIndex(index -1)
    }
    const nextReel = () =>{
      if(index === myReels.length - 1 ){
        return null;
      }
      setIndex(index + 1)
  
    }

    const [followed , setFollowed] = useState(false)

    const { followUser} = UserData();

    const followHandler = () =>{
      setFollowed(!followed)
      followUser(user._id , fetchUser)
    }
    const followers = user.followers;
    useEffect(()=>{
      if(followers && followers.includes(loggedInUser._id)){
        setFollowed(true)
        
      }
    } ,[user , loggedInUser._id])


    const [show , setShow] = useState(false)
    const [show1 , setShow1] = useState(false)


    const [followersData , setFollowersData] = useState([])
    const [followingsData , setFollowingsData] = useState([])
    async function followData() {
      try {
        const {data} = await axios.get("/api/user/followdata/" + user._id) 
       console.log(data)
        setFollowersData(data.followers)
        setFollowingsData(data.following)
      } catch (error) {
        console.log(error)
      }
    }

    useEffect ( ()=>{
      followData()
    }, [user])

    const {onlineUsers} = SocketData()
  return (
<>
   {loading ? <Loading /> :
   <>
      {user && (
    <>

    <div className="bg-gray-100 min-h-screen flex flex-col gap-6 items-center justify-center  py-20">
      {show && <Modal value={followersData} title={"Followers"} setShow={setShow} />}
      {show1 && <Modal value={followingsData} title={"Followings"} setShow={setShow1} />}

<div className="bg-gradient-to-r from-purple-500 to-indigo-500 flex flex-col md:flex-row justify-between items-center gap-8 p-12 rounded-3xl shadow-2xl max-w-6xl w-full transform transition-all duration-500 hover:scale-105 hover:shadow-3xl">
  <div className="mx-20 flex flex-col items-center gap-6 relative">
    {/* Profile Picture with Border and Glow Effect */}
    <div className="relative">
      <img 
        src={user.profilePic.url} 
        alt="Profile" 
        className="w-[200px] h-[200px] rounded-full shadow-md border-8 border-white" 
      />
      {/* Animated Glow Around Profile Pic */}
      <div className="absolute inset-0 w-[210px] h-[210px] rounded-full border-4 border-transparent border-t-blue-400 animate-spin-slow" />
    </div>
    
    {/* User Info */}
    <div className="text-center">
      <p className="text-5xl font-bold text-white tracking-wider shadow-md">
        {user.name}
      </p>

      {onlineUsers.includes(user._id) && (
        <span className="ml-3 text-base font-semibold text-green-300 animate-pulse">
          Online
        </span>
      )}
    </div>
  </div>

  <div className="flex flex-col mx-20 items-center md:items-start gap-6 text-white">
    {/* User Email and Gender */}
    <p className="text-2xl font-sans font-semibold shadow-xl rounded-lg px-5 py-3 opacity-90 transition-all hover:opacity-100 hover:shadow-2xl">
      {user.email}
    </p>
    <p className="text-lg font-serif font-light bg-white text-slate-950 shadow-lg rounded-lg p-3 opacity-80 hover:opacity-100 transition-all">
      {user.gender === "male" ? "male🕺🏻" : "female💃🏻"}
    </p>

    {/* Followers and Following Section with Interactive Animations */}
    <p className="text-lg cursor-pointer flex bg-white text-slate-950 rounded-lg items-center shadow-lg p-3 space-x-2 group opacity-90 hover:opacity-100 transition-all" onClick={() => setShow(true)}>
      <span>{user.followers.length} Followers</span>
      <span className="text-2xl group-hover:scale-125 group-hover:text-yellow-400 transition-all">
        👥
      </span>
    </p>
    <p className="text-lg cursor-pointer flex bg-white text-slate-950 rounded-lg items-center shadow-lg p-3 space-x-2 group opacity-90 hover:opacity-100 transition-all" onClick={() => setShow1(true)}>
      <span>{user.following.length} Following</span>
      <span className="text-2xl group-hover:scale-125 group-hover:text-yellow-400 transition-all">
        👣
      </span>
    </p>

    {/* Follow/Unfollow Button with Dynamic Effects */}
    {user._id !== loggedInUser._id && (
      <button 
        onClick={followHandler} 
        className={`mt-4 py-3 px-8 text-lg font-semibold rounded-full shadow-xl transition-transform duration-300 ease-in-out 
        ${followed ? "bg-red-500 hover:bg-red-600 hover:scale-105" : "bg-blue-500 hover:bg-blue-600 hover:scale-105"}`}
      >
        {followed ? "Unfollow" : "Follow"}
      </button>
    )}
  </div>
</div>



      <div className="bg-white mt-6 w-full max-w-2xl p-5 rounded-2xl shadow-lg flex justify-center items-center gap-8">
        <button className={`text-xl font-semibold ${type === "post" ? "text-blue-500" : "text-gray-600 hover:text-blue-400"}`} onClick={() => setType("post")}>Posts</button>
        <span>|</span>
        <button className={`text-xl font-semibold ${type === "reel" ? "text-blue-500" : "text-gray-600 hover:text-blue-400"}`} onClick={() => setType("reel")}>Reels</button>
      </div>

      {type === "post" && (
  <div className="w-full max-w-4xl mt-8">
    {myPosts && myPosts.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {myPosts.map((e) => (
          <div key={e._id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <PostCard type="post" value={e} />
            
          </div>
        ))}
      </div>
    ) : (
      <div className="flex flex-col items-center mt-10">
        <img src="/no-posts.svg" alt="No Posts" className="w-52 h-52 mb-4" />
        <p className="text-gray-600 text-lg">No Posts Available</p>
      </div>
    )}
  </div>
)}


      {type === "reel" && (
        <>
          {myReels && myReels.length > 0 ? (
            <div className="flex gap-4 items-center justify-center mt-6">
              <PostCard type="reel" value={myReels[index]} key={myReels[index]._id} />
              <div className="flex flex-col justify-center items-center gap-4">
                {index > 0 && (
                  <button onClick={prevReel} className="bg-gray-500 text-white p-4 rounded-full shadow-lg hover:bg-gray-600 transition-all">
                    <FaArrowUp />
                  </button>
                )}
                {index < myReels.length - 1 && (
                  <button onClick={nextReel} className="bg-gray-500 text-white p-4 rounded-full shadow-lg hover:bg-gray-600 transition-all">
                    <FaArrowDown />
                  </button>
                )}
              </div>
            </div>
          ) : <p className="text-gray-600 mt-5">No Reels Available</p>}
        </>
      )}
    </div>
    </>
   )}
   </>
   }
</>

  )
}

export default Account