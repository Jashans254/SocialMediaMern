import React, { useState } from 'react'
import { FaSearch  } from 'react-icons/fa'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { LoadingAnimation } from '../components/Loading'
const Search = () => {
    const [users , setUsers] = useState([])
    const [search , setSearch] = useState("")

    const [loading , setLoading]   = useState(false)
    async function fetchUsers () {
        setLoading(true)
        try {
            const {data} = await axios.get("/api/user/all?search=" + search)
            setUsers(data)
            
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
  return (
<div className='bg-gradient-to-r from-blue-100 to-gray-200 min-h-screen flex justify-center  items-center'>
  <div className="flex flex-col md:flex-row w-full gap-5 max-w-6xl h-[600px] p-6 bg-white rounded-lg shadow-lg">
    
    {/* Left Section for Search */}
    <div className="flex-1 p-4">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-5">User Search</h1>
      
      <div className="search flex items-center gap-4 mb-5">
        <input 
          type="text" 
          className='border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-sm'
          placeholder='Enter Name'
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button 
          onClick={fetchUsers} 
          className='px-4 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200 font-semibold flex items-center'
        >
          <FaSearch className="mr-2" /> Search
        </button>
      </div>

      {loading ? (
        <LoadingAnimation />
      ) : (
        <>
          {users && users.length > 0 ? (
            users.map(e => (
              <Link 
                className="mt-3 flex justify-start w-[90%] items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 shadow hover:bg-blue-50 transition duration-200" 
                to={`/user/${e._id}`} 
                key={e._id}
              >
                <img src={e.profilePic.url} alt="" className='w-12 h-12 rounded-full shadow  object-cover' />
                <span className="font-medium text-gray-800 text-lg">{e.name}</span>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-3">No User Found</p>
          )}
        </>
      )}
    </div>

    {/* Right Section for Suggestions */}
    <div className="w-full md:w-1/3 p-4 border-l border-gray-300">
      <h2 className="text-xl font-semibold text-blue-600 mb-4">Tips for Searching</h2>
      <div className="text-gray-500 text-sm">
        <p>You can:</p>
        <ul className="list-disc list-inside ml-5">
          <li>Search using full names or initials.</li>
          <li>Start by typing the first few letters of the name.</li>
          <li>Double-check the spelling for better results!</li>
        </ul>
      </div>
    </div>
  </div>
</div>

  )
}

export default Search