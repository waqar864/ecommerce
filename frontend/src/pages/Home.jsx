import React from 'react'
import Footer from '../components/Footer'
import '../pageStyles/Home.css'
import Navbar from '../components/Navbar'
import ImageSlider from '../components/ImageSlider'
import Product from '../components/Product'

const Home = () => {

  const products = [
        {
            "_id": "68bf4b7ff2603e7182703529",
            "name": "Product2",
            "description": "product description2",
            "price": 100,
            "ratings": 4,
            "images": [
                {
                    "public_id": "This is test id2",
                    "url": "this is test url2",
                    "_id": "68bf4b7ff2603e718270352a"
                }
            ],
            "category": "shirt2",
            "stock": 2,
            "numOfReviews": 1,
            "reviews": [
                {
                    "user": "68c9e59bac97d8236bb707dc",
                    "name": "aleena",
                    "rating": 4,
                    "comment": "this is awoesome",
                    "_id": "68ca95c7de1f705f8f0146fc"
                }
            ],
            "createdAt": "2025-09-08T21:32:47.526Z",
            "__v": 2
        },
        {
            "_id": "68c18f3391e272ddc2cce015",
            "name": "Product3",
            "description": "product description3",
            "price": 100,
            "ratings": 0,
            "images": [
                {
                    "public_id": "This is test id3",
                    "url": "this is test url3",
                    "_id": "68c18f3391e272ddc2cce016"
                }
            ],
            "category": "shirt3",
            "stock": 1,
            "numOfReviews": 0,
            "reviews": [],
            "createdAt": "2025-09-10T14:46:11.821Z",
            "__v": 0
        }
      ]
  return (
    <>
    <Navbar />
    <ImageSlider />
    <div className='home-container'>
      <h2 className='home-heading'>Trending now</h2>
      <div className='home-product-container'>
        {products.map((product,index) => (<Product product={product} key={index} />))}
        
      </div>
    </div>
    <Footer />
    </>
    
  )
}

export default Home
