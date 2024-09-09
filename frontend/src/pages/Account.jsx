import React, { useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { UserData } from '../context/UserContext';
import { PostData } from '../context/PostContext';
import PostCard from '../components/PostCard';
import { FaArrowUp, FaEdit } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa6";
import axios from 'axios';
import Modal from '../components/Modal';
import {Loading} from '../components/Loading';
import toast from 'react-hot-toast';
const Account = ({user}) => {

    const navigate = useNavigate();

    const {logoutUser , updateProfilePic ,  updateProfileName} = UserData();

    const {posts , reels , loading} = PostData();

    let myPosts;
    if(posts){
        myPosts = posts.filter((post)=> post.owner._id === user._id);
    }

    let myReels;
    if(posts){
        myReels = reels.filter((reel)=> reel.owner._id === user._id);
    }
    const [type , setType] = useState("post")
    const logoutHandler = () =>{
        logoutUser(navigate)
    }

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

    const [file , setFile] = useState("")

    const [imagePreview, setImagePreview] = useState(null); // State for preview

    const changeFileHandler = e =>{
      const file = e.target.files[0];
      setFile(file)
      setImagePreview(URL.createObjectURL(file));
    }

    const changeImageHandler =  () =>{
      const formdata = new FormData();
      formdata.append("file" , file)
      updateProfilePic(user._id , formdata  , setFile)
      setImagePreview(null);
    }
    useEffect ( ()=>{
      followData()
    }, [user])

    const [showInput , setShowInput] = useState(false)

    const [name , setName ] = useState(user.name?user.name:"")

    const UpdateName =  () =>{
      updateProfileName(user._id , name , setShowInput)
      setShowInput(false)
    }

    const [showUpdatePassword , setShowUpdatePassword] = useState(false)

    const [oldPassword , setOldPassword] = useState("")
    const [newPassword , setNewPassword] = useState("")

    async function updatePassword (e) {
      e.preventDefault()
      try {
        const {data} = await axios.post("/api/user/"+user._id , {oldPassword , newPassword})
        toast.success(data.message)
        setOldPassword("")
        setNewPassword("")
        setShowUpdatePassword(false)
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }



  return (
   <>
   { user && (
    <>
    {
      loading?<Loading/>:    <div className="bg-gradient-to-r from-blue-100 via-purple-50 to-pink-100 min-h-screen flex flex-col gap-4 items-center justify-center py-20 " >
      {
          show && <Modal value= { followersData} title={"Followers"} setShow={setShow}/>
        }
        {
          show1 && <Modal value= { followingsData} title={"Followings"} setShow={setShow1}/>
        }
<div className="bg-gradient-to-r from-blue-500 to-indigo-600 flex justify-between gap-8 p-10 rounded-3xl shadow-2xl max-w-2xl w-full transform transition-all duration-500 hover:scale-105 hover:shadow-3xl">
  {/* Profile Image and Upload Section */}
  <div className="flex flex-col justify-between gap-6">
    <div className="relative">
      <img src={user.profilePic.url} alt="" className="w-[180px] h-[180px] rounded-full border-4 border-white shadow-lg transform hover:scale-105 transition-transform duration-300" />
      {/* Glowing Border for Profile Pic */}
      <div className="absolute inset-0 w-[190px] h-[190px] rounded-full border-4 border-blue-300 opacity-75 animate-pulse"></div>
    </div>
    
    {/* Choose and Update Button */}
    <div className="flex flex-col items-center">
      <label
        htmlFor="file-upload"
        className="cursor-pointer bg-gradient-to-r from-green-400 to-green-600 text-white px-3 py-2 rounded-md shadow-lg hover:bg-green-500 transition-all duration-300 ease-in-out"
      >
        Choose Pic
      </label>
      <input
        className="hidden"
        id="file-upload"
        type="file"
        onChange={changeFileHandler}
        accept="application/pdf" // Limit file type to images
        required
      />
      <button
        onClick={changeImageHandler}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 active:bg-blue-800 transform transition-all duration-300 hover:scale-105"
      >
        Update Profile
      </button>

      {/* Image Preview or Indicator */}
      {imagePreview ? (
        <div className="mt-4">
          <p className="text-sm text-gray-600">Selected Image Preview:</p>
          <img
            src={imagePreview}
            alt="Selected"
            className="w-40 h-40 rounded-full border-4 border-indigo-600 mt-2 shadow-lg"
          />
        </div>
      ) : (
        <p className="mt-4 text-gray-600">No image selected</p>
      )}
    </div>
  </div>

  {/* User Info Section */}
  <div className="flex flex-col gap-4 text-white">
    {showInput ? (
      <div className="flex justify-center items-center gap-4 p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg transition-all duration-500 transform hover:scale-105">
      <input 
        className="custom-input bg-white text-gray-800 px-3 py-2 rounded-md shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-all duration-300" 
        style={{ width: "150px" }} 
        value={name} 
        onChange={e => setName(e.target.value)} 
        placeholder="Enter Name" 
        required 
      />
      <button 
        onClick={UpdateName} 
        className="bg-green-400 text-white font-semibold px-4 py-2 rounded-full shadow-lg hover:bg-green-500 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        Update
      </button>
      <button 
        onClick={() => setShowInput(false)} 
        className="bg-red-400 text-white font-semibold px-4 py-2 rounded-full shadow-lg hover:bg-red-500 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        X
      </button>
    </div>
    
    ) : (
      <p className="text-2xl font-semibold flex items-center gap-2">
        {user.name} 
        <button className="text-blue-300 hover:text-blue-400" onClick={() => setShowInput(true)}><FaEdit /></button>
      </p>
    )}

    <p className="text-lg opacity-90">{user.email}</p>
    <p className="text-lg opacity-90">{user.gender === "male" ? "Male 🕺" : "Female 💃"}</p>

    {/* Followers/Following with Hover Effects */}
    <p className="text-lg cursor-pointer flex items-center gap-2 hover:text-yellow-300 transition-transform duration-300" onClick={() => setShow(true)}>
      {user.followers.length} Followers 👥
    </p>
    <p className="text-lg cursor-pointer flex items-center gap-2 hover:text-yellow-300 transition-transform duration-300" onClick={() => setShow1(true)}>
      {user.following.length} Following 👣
    </p>

    {/* Logout Button */}
    <button onClick={logoutHandler} className="mt-4 bg-red-500 text-white px-5 py-3 rounded-md shadow-md hover:bg-red-600 transform transition-all duration-300 hover:scale-105">
      Logout
    </button>
  </div>
</div>


<button 
  onClick={() => setShowUpdatePassword(!showUpdatePassword)} 
  className={`bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-xl ${
    showUpdatePassword ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
  }`}
>
  {showUpdatePassword ? "X" : "Update Password"}
</button>


        {
          showUpdatePassword && <form onSubmit={updatePassword} className="flex justify-center items-center flex-col p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg gap-4 transition-all duration-500 transform hover:scale-105">
          <input 
            type="password" 
            className="custom-input bg-white text-gray-800 px-4 py-2 rounded-md shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-all duration-300 w-64" 
            placeholder="Old Password" 
            value={oldPassword} 
            onChange={e => setOldPassword(e.target.value)} 
            required
          />
          <input 
            type="password" 
            className="custom-input bg-white text-gray-800 px-4 py-2 rounded-md shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-all duration-300 w-64" 
            placeholder="New Password" 
            value={newPassword} 
            onChange={e => setNewPassword(e.target.value)} 
            required
          />
          <button 
            type="submit" 
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            Update Password
          </button>
        </form>
        
        }


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
    }


   
    </>

   

)}
   </>
  )
}

export default Account