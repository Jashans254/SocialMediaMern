import React from 'react'
import AddPost from '../components/AddPost'
import PostCard from '../components/PostCard'
import { PostData } from '../context/PostContext'
import { Loading } from '../components/Loading'
import Header from '../components/Header'
const Home = () => {
  const {posts , loading} = PostData();
  
  return (
   <>
   <Header/>
<div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-50 to-pink-100  px-4 py-20">
  {loading ? (
    <div className="flex justify-center items-center h-screen">
      <Loading />
    </div>
  ) : (
    <div className="max-w-4xl mx-auto">
      {/* Add Post Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create a new post</h2>
        <AddPost type="post" />
      </div>

      {/* Post Feed Section */}
      <div className=" mx-5 grid grid-cols-1 md:grid-cols-2 gap-6">
    {posts && posts.length > 0 ? (
        posts.map((e) => (
            <div
                key={e._id}
                className="transform transition-all duration-500 ease-in-out hover:scale-105 bg-white shadow-lg rounded-lg overflow-hidden"
                style={{ width: "100%", maxWidth: "400px" }} // Adjust maxWidth as needed
            >
                <PostCard value={e} type={"post"} />
            </div>
          ))
        ) : (
          <div className="text-center text-gray-600">
            <p className="text-lg">No Posts Yet</p>
          </div>
        )}
      </div>
    </div>
  )}
</div>


   </>
  )
}

export default Home