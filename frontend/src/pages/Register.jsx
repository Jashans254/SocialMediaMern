import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserData } from '../context/UserContext'
import { PostData } from '../context/PostContext'
const Register = () => {
  
     const [name , setName] = useState("")
     const [email , setEmail] = useState("")
     const [password , setPassword] = useState("")
     const [gender, setGender] = useState("")
     const [file, setFile] = useState("")
     const [filePrev, setfilePrev] = useState("")


     const {registerUser , loading} = UserData()
     const {fetchPosts} = PostData()

     const changeFileHandler = (e) =>{
       const file = e.target.files[0]

       const reader = new FileReader();

       reader.readAsDataURL(file)

       reader.onloadend = () =>{
         setFile(file)
         setfilePrev(reader.result)
       }
     }
     const navigate = useNavigate();
     const submitHandler = e =>{
      e.preventDefault();
     
      const formdata = new FormData();
      formdata.append('name' , name)
      formdata.append('email' , email)
      formdata.append('password' , password)
      formdata.append('gender' , gender)
      formdata.append('file' , file)
      registerUser(formdata , navigate , fetchPosts)
     }
  return (
   <>
   {loading?(<h1>Loading...</h1>):(<><div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-300">
  <div className="flex flex-col md:flex-row shadow-2xl rounded-xl overflow-hidden w-full h-[80vh] max-w-6xl bg-white">
    
    {/* Left Side: Register Section */}
    <div className="w-full md:w-3/5 p-4 md:p-8 bg-white flex flex-col items-center overflow-y-auto max-h-[80vh]">
      
      {/* Logo */}
      {/* <div className="flex justify-center items-center mb-4">
        <svg className="h-20 w-20 relative animate-spin-zoom" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <text x="50%" y="50%" textAnchor="middle" stroke="none" fill="url(#grad)" fontSize="10" fontWeight="bold" dy=".3em">Chatster</text>
          <circle cx="50" cy="50" r="35" stroke="url(#grad)" strokeWidth="5" fill="none" className="circle" />
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4a90e2" />
              <stop offset="100%" stopColor="#9013fe" />
            </linearGradient>
          </defs>
        </svg>
      </div> */}
      {/* Logo */}
{/* Logo */}
<div className="flex gap-3 items-center mb-6">
  <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow-xl">
    Chatster
  </h1>
  <div className="mt-2 flex items-center justify-center">
    <svg className="h-16 w-16 p-2 rounded-full bg-white border-4 border-blue-600 shadow-lg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4h16a2 2 0 012 2v10a2 2 0 01-2 2H6l-4 4v-4H2a2 2 0 01-2-2V6a2 2 0 012-2z" fill="#4A90E2" />
      <path d="M6 10h12M6 14h8" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </div>
</div>




      {/* Register Form */}
      <div className="text-center mb-6">
        <h1 className="font-extrabold text-2xl md:text-4xl text-gray-900">Create an Account</h1>
        <p className="text-gray-500 text-sm md:text-md mt-1 font-medium">Register to get started with Chatster</p>
      </div>

      <form onSubmit={submitHandler} className="w-full max-w-sm space-y-4">
        {filePrev && <img src={filePrev} className="w-[20vh] h-[20vh] rounded-full shadow-lg border-4 border-blue-500 animate-bounce mx-32 my-8" alt="Profile Preview" />}
        
        <div className='flex justify-center items-center gap-10'>
        <label className="block text-gray-700 font-bold mb-2" htmlFor="file-upload">
                        Upload Profile Pic
                    </label>
        <input  id="file-upload" type="file" className="hidden" accept="image/*" onChange={changeFileHandler} required />
       
        <label
  htmlFor="file-upload"
  className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-6 py-3 rounded-md shadow-sm transition-all hover:scale-105 duration-300 ease-in-out hover:from-purple-500 hover:to-pink-600"
>
  Choose File
</label>

        </div>
        <input type="text" className="w-full px-3 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-blue-500 shadow-sm transition-all duration-300" placeholder="User Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" className="w-full px-3 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-blue-500 shadow-sm transition-all duration-300" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" className="w-full px-3 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-blue-500 shadow-sm transition-all duration-300" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <select className="w-full px-3 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-blue-500 shadow-sm transition-all duration-300" value={gender} onChange={(e) => setGender(e.target.value)} required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-bold">
          Register
        </button>
      </form>

    </div>

    {/* Right Side: Call to Action Section */}
    <div className="w-full md:w-2/5 bg-gradient-to-r from-blue-600 to-purple-700 text-white flex flex-col justify-center items-center p-6">
      <h1 className="text-3xl font-extrabold mb-4">Already Registered?</h1>
      <p className="text-md mb-4">Sign in to discover all the features.</p>
      <Link to="/login" className="bg-white text-blue-600 font-bold py-2 px-8 rounded-full shadow-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105">
        Login Now
      </Link>
    </div>
  </div>
</div>

<style jsx>{`
  @keyframes spinZoom {
    0% {
      transform: rotate(0deg) scale(1);
    }
    50% {
      transform: rotate(180deg) scale(1.1);
    }
    100% {
      transform: rotate(360deg) scale(1);
    }
  }

  .animate-spin-zoom {
    animation: spinZoom 4s infinite ease-in-out;
  }

  .animate-bounce {
    animation: bounce 2s infinite;
  }
`}</style>


</>
)}
   </>
  )
}

export default Register