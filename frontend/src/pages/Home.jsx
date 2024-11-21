import React from 'react'
import Hero from '../components/Hero'
import AllPost from '../components/AllPost'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <div>
        <Navbar />
        <Hero />
        <AllPost />
        <Footer />
    </div>
  )
}

export default Home