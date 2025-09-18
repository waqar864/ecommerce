import React from 'react'
import '../componentStyles/Footer.css'
import {Phone,Mail, GitHub, LinkedIn, YouTube} from '@mui/icons-material'



const Footer = () => {
  return (
   <footer className='footer'>
    <div className="footer-container">
        {/* Section1 */}
        <div className='footer-section contact'>
            <h3>Contact Us</h3>
            <p><Phone fontSize='small'/>Phone : +123456789</p>
            <p><Mail fontSize='small'/>Email: waqar@gmail.com</p>
        </div>


        {/* section 2 */}
        <div className='footer-section social'>
            <h3>Follow me</h3>
            <div className='social-links'>
                <a href="" target='_blank'>
                    <GitHub className='social-icon' />
                </a>
                <a href="" target='_blank'>
                    <LinkedIn className='social-icon' />
                </a>
                 <a href="" target='_blank'>
                    <YouTube className='social-icon' />
                </a>
            </div>
        </div>


        {/* section 3 */}

        <div className='footer-section about'>
            <h3>About</h3>
            <p>Providing mern stack developent </p>
        </div>
    </div>
    <div className='footer-bottom'>
        <p>&copy; All Right Reserved</p>
    </div>
   </footer>
  )
}

export default Footer
