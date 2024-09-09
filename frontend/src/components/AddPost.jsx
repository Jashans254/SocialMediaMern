import React, { useState } from 'react'
import { PostData } from '../context/PostContext'
import { LoadingAnimation } from './Loading'

const AddPost = ({type}) => {
    const [caption , setCaption]   = useState("")
    const [file , setFile]         = useState("")
    const [filePrev , setFilePrev] = useState("")

    const {addPost , addLoading} = PostData();
    const changeFileHandler = (e) =>{
        const file = e.target.files[0]
        if (file.size > 10 * 1024 * 1024) { // Limit to 5 MB
          alert("File size exceeds 5 MB");
          return;
      }
 
        const reader = new FileReader();
 
        reader.readAsDataURL(file)
 
        reader.onloadend = () =>{
          setFile(file)
          setFilePrev(reader.result)
        }
      }

      const submitHandler = (e) =>{
        e.preventDefault()

        const formdata = new FormData();
        formdata.append('caption' , caption)
        formdata.append('file' , file)
        addPost(formdata , setFile , setFilePrev , setCaption , type)
      }

  return (
<div className="w-full bg-gray-100 flex items-center justify-center pt-5 pb-5">
    <div className="bg-white p-6 w-[90%] rounded-lg shadow-lg max-w-2xl flex flex-col gap-4">
        <form onSubmit={submitHandler} className="flex flex-col md:flex-row w-full justify-between items-center gap-6">
            {/* Left Section with Input Fields */}
            <div className="flex flex-col gap-4 w-full md:w-[60%]">
                <input
                    type="text"
                    className="custom-input border border-gray-300 rounded-full mx-8 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent focus:shadow-md transition-all duration-300 ease-in-out placeholder-gray-400"
                    placeholder="Enter Caption"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    required
                />
                <div className="w-full flex flex-col items-center justify-center gap-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="file-upload">
                        Upload {type === "post" ? "Image" : "Video"}
                    </label>
                    <div className="relative">
                        <input
                            id="file-upload"
                            type="file"
                            className="hidden"
                            accept={type === "post" ? "image/*" : "video/*"}
                            onChange={changeFileHandler}
                            required
                        />
                        <label
                            htmlFor="file-upload"
                            className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-6 py-3 rounded-md shadow-sm hover:bg-blue-600 transition duration-300 ease-in-out"
                        >
                            Select {type === "post" ? "Image" : "Video"}
                        </label>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                        Accepted formats: {type === "post" ? "JPG, PNG" : "MP4, AVI"}
                    </p>
                </div>
            </div>

            {/* Right Section with Add Post Button */}
            <div className="flex items-center justify-end w-full md:w-[35%]">
                <button
                    disabled={addLoading}
                    className={`relative bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-6 py-3 w-full rounded-full shadow-lg transition-all duration-300 ease-in-out transform 
                        ${addLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:shadow-2xl hover:from-purple-600 hover:to-blue-500'}`}
                    type="submit"
                >
                    {addLoading ? <LoadingAnimation /> : "+ Add Post"}
                </button>
            </div>
        </form>

        {/* Preview Section */}
        <div className="flex flex-col justify-center items-center mt-4 md:mt-0">
            {filePrev && (
                <div className="flex justify-center mb-4">
                    {type === "post" ? (
                        <img src={filePrev} className="w-[150px] h-[150px] rounded-md object-cover shadow-sm" />
                    ) : (
                        <video src={filePrev} className="w-[200px] h-[300px] rounded-md object-cover shadow-sm" autoPlay loop controls controlsList="nodownload" />
                    )}
                </div>
            )}
        </div>
    </div>
</div>



  )
}

export default AddPost