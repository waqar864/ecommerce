import React, { useState } from 'react'
import '../componentStyles/Navbar.css'
import { Link } from 'react-router-dom'
import { Close, Menu, Person, Search, ShoppingBag } from '@mui/icons-material'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }
    const isAuthenticated = false;
  return (
    <div className='navbar'>
        <div className='navbar-container'>
            <div className='navbar-logo'>
                <Link to="/" onClick={() => setIsMenuOpen(false)}>Shopeasy</Link>
            </div>
            <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/products">Products</Link></li>
                    <li><Link to="/about-us">About Us</Link></li>
                    <li><Link to="/contact-us">Contact Us</Link></li>
                </ul>
            </div>
            <div className='navbar-icons'>
                {/* <div className='search-container'>
                    <form className='search-form' action="">
                        <input type="text" className='search-input' placeholder='Search...' />
                        <button className='search-icon'><Search focusable="false" /></button>
                    </form>
                </div> */}
                <div className='cart-container'>
                    <Link to="/cart">
                    <ShoppingBag className='icon' />
                    <span className="cart-badge">6</span>
                    </Link>
                </div>
                {!isAuthenticated && <Link to="/register" className='register-link'>
                <Person className='icon' />
                </Link>}
                
                <div className="navbar-hamburger" onClick={toggleMenu}>
                    {isMenuOpen ? <Close className='icon' /> : <Menu className='icon' />}
                    
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Navbar
