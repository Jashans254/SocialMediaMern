import React from 'react'

const Message = ({ownMessage , message}) => {

  return (
<div className={`mb-2 ${ownMessage ? "text-right" : "text-left"}`}>
  <span
    className={`inline-block p-3 rounded-lg shadow-md transition-transform duration-200 transform ${
      ownMessage 
        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold" 
        : "bg-gray-200 text-gray-800 font-medium"
    }`}
    style={{
      maxWidth: '75%', // Limit the width for better readability
      wordWrap: 'break-word', // Ensure long words break properly
      borderRadius: '16px', // More rounded corners for a modern look
      letterSpacing: '0.5px', // Slight letter spacing for readability
      lineHeight: '1.5', // Improved line height for better text flow
      padding: '12px 16px', // More padding for a comfortable touch
      border: ownMessage ? '1px solid #0056b3' : '1px solid #ccc', // Border for a more defined look
      backgroundColor: ownMessage ? 'rgba(0, 123, 255, 0.1)' : 'rgba(243, 243, 243, 0.8)', // Light background for own messages
    }}
  >
    {message}
  </span>
</div>



  )
}

export default Message