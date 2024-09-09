import React from 'react'
import { Link } from 'react-router-dom'

const Modal = ({value , title , setShow}) => {
  return (
<div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-40">
  <div className="bg-white rounded-xl p-6 shadow-2xl w-[350px] max-h-[400px] overflow-y-auto relative transform transition-all duration-500 ease-in-out scale-100 hover:scale-105">
    
    {/* Close button */}
    <button 
      onClick={() => setShow(false)} 
      className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl transition duration-300 ease-in-out"
    >
      &times;
    </button>
    
    {/* Modal Title */}
    <h1 className="text-3xl text-purple-700 font-bold mb-4 text-center">{title}</h1>
    
    {/* List of Followers/Followings */}
    <div className="flex flex-col space-y-4 mt-4">
      {
        value && value.length > 0 ? 
          value.map((e, i) => (
            <Link 
              to={`/user/${e._id}`} 
              key={i} 
              onClick={() => setShow(false)} 
              className="flex items-center gap-4 p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-md transition-transform hover:translate-x-1 transform duration-300 ease-in-out"
            >
              <span className="text-lg font-semibold">{i+1}</span>
              <img className="w-10 h-10 rounded-full shadow-sm" src={e.profilePic.url} alt="" />
              <span className="font-medium">{e.name}</span>
            </Link>
          )) 
          : <p className="text-center text-gray-500 text-xl font-light">No {title} yet</p>
      }
    </div>
  </div>
</div>

  )
}

export default Modal