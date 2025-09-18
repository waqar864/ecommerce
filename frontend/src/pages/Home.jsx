import React from 'react'
import Footer from '../components/Footer'
import '../pageStyles/Home.css'
import Navbar from '../components/Navbar'
import ImageSlider from '../components/ImageSlider'

const Home = () => {
  return (
    <>
    <Navbar />
    <ImageSlider />
    <div className='home-container'>
      <h2 className='home-heading'>Trending now</h2>
    </div>
    <Footer />
    </>
    
  )
}

export default Home
