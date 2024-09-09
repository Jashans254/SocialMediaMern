import React, { useState } from 'react';
import AddPost from '../components/AddPost';
import { PostData } from '../context/PostContext';
import PostCard from '../components/PostCard';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { Loading } from '../components/Loading';

const Reels = () => {
  const { reels, loading } = PostData();
  const [index, setIndex] = useState(0);

  const prevReel = () => {
    if (index === 0) return;
    setIndex(index - 1);
  };

  const nextReel = () => {
    if (index === reels.length - 1) return;
    setIndex(index + 1);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className='min-h-screen bg-gradient-to-r from-blue-100 via-purple-50 to-pink-100  px-4 py-20'>
          <AddPost type="reel" />
          <div className="flex items-center md:w-[500px] w-[90%] m-auto bg-white rounded-lg shadow-lg p-5 gap-4">
            {/* Previous Button */}
            {index > 0 && (
              <button
                className='bg-purple-600 hover:bg-purple-700 text-white py-2 px-3 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105'
                onClick={prevReel}
              >
                <FaArrowUp className="text-lg" />
              </button>
            )}
            {/* Reel Display */}
            {reels && reels.length > 0 ? (
              <PostCard value={reels[index]} key={reels[index]._id} type={"reel"} />
            ) : (
              <p className="text-gray-600 mt-5">No Reels Yet</p>
            )}
            {/* Next Button */}
            {index < reels.length - 1 && (
              <button
                className='bg-purple-600 hover:bg-purple-700 text-white py-2 px-3 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105'
                onClick={nextReel}
              >
                <FaArrowDown className="text-lg" />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Reels;
