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


    const changeFileHandler = e =>{
      const file = e.target.files[0];
      setFile(file)
    }

    const changeImageHandler =  () =>{
      const formdata = new FormData();
      formdata.append("file" , file)
      updateProfilePic(user._id , formdata  , setFile)
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
      loading?<Loading/>:    <div className="bg-gray-100 min-h-screen flex flex-col gap-4 items-center justify-center pt-3 pb-14" >
      {
          show && <Modal value= { followersData} title={"Followers"} setShow={setShow}/>
        }
        {
          show1 && <Modal value= { followingsData} title={"Followings"} setShow={setShow1}/>
        }
      <div className="bg-white flex justify-between gap-4 p-8 rounded-lg shadow-md max-w-md">
          <div className="image flex flex-col justify-between mb-4 gap-4">
              <img src={user.profilePic.url} alt="" className='w-[180px] h-[180px] rounded-full mr-4'  />
              
              <div className="update w-[150px] flex flex-col justify-center items-center">
                <label htmlFor="file-upload" className='bg-blue-500 text-white px-1 py-1 rounded mb-2' > Choose Pic</label>
              <input  className='hidden' id='file-upload' type="file" onChange={changeFileHandler} required />
              <button className='bg-blue-500 text-white px-3 py-2  active:bg-blue-600' onClick={changeImageHandler}>Update Profile</button>
              </div>
          </div>
  
          <div className="flex flex-col gap-2 ">
              {showInput? <>
               <div className="flex justify-center items-center gap-2">
               <input className='custom-input'style={{width:"80px"}} 
               value={name}
               onChange={e=>setName(e.target.value)}
               placeholder='Name'
               required
               />

               <button onClick={UpdateName} className='bg-green-600 text-white px-2  lowercase rounded-full'>Update</button>
               <button onClick={()=>setShowInput(false)} className='bg-red-600 text-white px-2  lowercase rounded-full'>X</button>
               </div>
              </>:(<p className='text-gray-800 font-semibold '>{user.name} {" "} 
                <button  className='text-blue-800' onClick={()=>setShowInput(true)}><FaEdit /></button>

              </p>)}
              <p className='text-gray-500 '>{user.email}</p>
              <p className='text-gray-500 '>{user.gender}</p>
              <p className='text-gray-500  cursor-pointer' onClick={()=>setShow(true)}>{user.followers.length} Followers</p>
              <p className='text-gray-500  cursor-pointer' onClick={()=>setShow1(true)}>{user.following.length} Following</p>
  
              <button  onClick={logoutHandler } className=" bg-red-600 text-center w-[110px] text-white rounded-md">Logout</button>
          </div>

          
      </div>

      <button  onClick={()=>setShowUpdatePassword(!showUpdatePassword)} className='bg-blue-500 text-white px-3 py-2 rounded-full'>
        {showUpdatePassword?"X":"Update Password"}
        </button>

        {
          showUpdatePassword && <form onSubmit={updatePassword} className='flex justify-center items-center flex-col p-2 bg-white rounded-sm gap-2'> 
            <input 
            type="password"
             className='custom-input' 
             placeholder='Old Password' 
             value={oldPassword} 
             onChange={e=>setOldPassword(e.target.value)}
             required/>
            <input 
            type="password" 
            className='custom-input' 
            placeholder='New Password' 
            value={newPassword} 
            onChange={e=>setNewPassword(e.target.value)}
            required/>

            <button type='submit' className='bg-blue-500 text-white px-3 py-2 rounded-full'>Update Password</button>
          </form>
        }


      <div className="controls flex justify-center items-center bg-white p-4 rounded-md gap-7">
      <button onClick={()=>setType("post")}>Posts</button>
      |
      <button onClick={()=>setType("reel")}>Reels</button>
     </div>
  
  
    { type==="post"&& <>{
      myPosts && myPosts.length > 0?  myPosts.map((e)=>(
          <PostCard  type="post" value = {e} key={e._id}/>
      )) :<p>No Posts</p>
     } </>}
     
     {type==="reel"&& <>{
      myReels && myReels.length > 0?  ( <div className='flex gap-3 justify-center items-center'>
          <PostCard
                              type={"reel"}
                              value={myReels[index]}
                              key={myReels[index]._id}
                            />
          <div className="button flex flex-col justify-center items-center gap-6" >
          {index===0 ?"":<button
           className='bg-gray-500 text-white py-5 px-5 rounded-full'
          onClick={prevReel}><FaArrowUp /></button>}
          {index=== myReels.length - 1 ?"":<button 
           className='bg-gray-500 text-white py-5 px-5 rounded-full'
           onClick={nextReel}
            ><FaArrowDown /></button>}
          </div>
           </div>)
       :<p>No Reels</p>
     } </>
  
     }
     </div> 
    }


   
    </>

   

)}
   </>
  )
}

export default Account