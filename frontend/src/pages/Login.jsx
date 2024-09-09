import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserData } from '../context/UserContext'
import { PostData } from '../context/PostContext'
const Login = () => {
  
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")
  const navigate = useNavigate()
  const {loginUser , loading} = UserData()
  const {fetchPosts} = PostData()
  const submitHandler = e =>{
   e.preventDefault();
   loginUser(email , password , navigate , fetchPosts)
  }
return (
  <>
  {loading?(<h1>Loading...</h1>):(<div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-300">
  <div className="flex flex-col md:flex-row shadow-2xl rounded-xl overflow-hidden w-full max-w-6xl bg-white">
    
    {/* Left Side: Login Section */}
    <div className="w-full md:w-3/5 p-8 md:p-16 bg-white flex flex-col items-center">
      {/* Logo */}

<div className="flex gap-3 items-center mb-14">
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

      
      <div className="text-center mb-10">
        <h1 className="font-extrabold text-3xl md:text-5xl text-gray-900">Welcome Back</h1>
        <p className="text-gray-500 text-md md:text-lg mt-2 font-medium">Sign in to access your account</p>
      </div>

      <form onSubmit={submitHandler} className="w-full max-w-sm space-y-6">
        <input 
          type="email" 
          className="w-full px-5 py-4 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-blue-500 shadow-sm transition-all duration-300 placeholder-gray-500" 
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input 
          type="password" 
          className="w-full px-5 py-4 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-blue-500 shadow-sm transition-all duration-300 placeholder-gray-500" 
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button 
          type="submit" 
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-bold">
          Login
        </button>
      </form>

      <div className="text-center mt-6">
        <Link to="/forgot-password" className="text-blue-500 font-semibold hover:underline">Forgot Password?</Link>
      </div>
    </div>

    {/* Right Side: Register Section */}
    <div className="w-full md:w-2/5 bg-gradient-to-r from-blue-600 to-purple-700 text-white flex flex-col justify-center items-center p-10">
      <h1 className="text-4xl font-extrabold mb-6">New Here?</h1>
      <p className="text-lg mb-8">Sign up and discover amazing features of our social media platform.</p>
      <Link 
        to="/register" 
        className="bg-white text-blue-600 font-bold py-3 px-10 rounded-full shadow-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105">
        Register Now
      </Link>
    </div>
  </div>
</div>

)}
  </>
)
}

export default Login