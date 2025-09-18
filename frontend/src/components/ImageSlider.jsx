import React, { useEffect, useState } from 'react'
import '../componentStyles/ImageSlider.css'


const ImageSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);
  
      return () => clearInterval(interval);
    })
    const images = [
        "./images/banner-1.webp",
        "./images/banner-2.jpg",
        "./images/banner-3.jpg",
        "./images/banner-4.jpg",
        "./images/banner-5.jpg"
    ]
  return (
    <div className='image-slider-container'>
        <div className='slider-images'style={{transform: `translateX(-${currentIndex * 100}%)`}}>
            {images.map((image, index) => (
                 <div className='slider-item' key={index}>
                <img src={image} alt={`slide ${index + 1}`} />
            </div>
            ))}
           
        </div>
        <div className='slider-dots'>
            {images.map((_, index) => (
                <span key={index} className={`dot ${index === currentIndex ? 'active' : ''}`} onClick={() => setCurrentIndex(index)} />
            ))}
          
        </div>
      
    </div>
  )
}

export default ImageSlider
