import React from 'react'
import { PostData } from '../context/PostContext';

const SimpleModal = ( {isOpen , onClose , children}) => {
    if(!isOpen) return null ;

    
    
  return (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30 transition-opacity duration-300 ease-in-out">
    <div className="bg-white rounded-lg p-6 shadow-2xl w-[90%] max-w-md transform transition-all duration-500 ease-in-out">
        <div className="flex justify-end">
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors duration-200 text-2xl focus:outline-none">&times;</button>
        </div>

        <div className="flex flex-col space-y-4 mt-4">
            {children}
        </div>
    </div>
</div>

  )
}

export default SimpleModal