import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='py-10'>
        <div className="container w-full lg:max-w-7xl mx-auto">
            <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                    <h1 className='text-3xl font-semibold'>Readify</h1>
                    <p className='max-w-xl my-2'>Welcome to ultimate source for fresh perspectives! Explore curated content to enlighten, entertain and engage global readers.</p>
                </div>
                <div className='flex flex-col items-end justify-end'>
                    <h1 className='text-2xl'>Categories</h1>
                    <ul className="flex flex-col space-y-4 mt-5">
                        <li>
                            <Link className='text-neutral-500'>Technology</Link>
                        </li>
                        <li>
                            <Link className='text-neutral-500'>Healthcare</Link>
                        </li>
                        <li>
                            <Link className='text-neutral-500'>Lifestyle</Link>
                        </li>
                        <li>
                            <Link className='text-neutral-500'>Entertainment</Link>
                        </li>
                        <li>
                            <Link className='text-neutral-500'>Business</Link>
                        </li>
                        <li>
                            <Link className='text-neutral-500'>Education</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='py-4'>
                <span className='text-neutral-400'>© 2024 — Readify. All Rights Reserved.</span>
            </div>
        </div>
    </div>
  )
}

export default Footer