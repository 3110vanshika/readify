import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='py-40 px-5 lg:px-0'>
        <div className="container w-full lg:max-w-5xl mx-auto">
            <div className="text-center">
                <h1 className='text-5xl'>Discover a World of Thought-Provoking Stories and Insights, All in One Place</h1>
                <div className="flex items-center justify-center py-10 space-x-5">
                    <Link className='py-3 px-6 bg-[#7C78EB] text-white rounded-md'>Technology</Link>
                    <Link className='py-3 px-6 bg-[#7C78EB] text-white rounded-md'>Healthcare</Link>
                    <Link className='py-3 px-6 bg-[#7C78EB] text-white rounded-md'>Lifestyle</Link>
                    <Link className='py-3 px-6 bg-[#7C78EB] text-white rounded-md'>Entertainment</Link>
                    <Link className='py-3 px-6 bg-[#7C78EB] text-white rounded-md'>Business</Link>
                    <Link className='py-3 px-6 bg-[#7C78EB] text-white rounded-md'>Education</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Hero