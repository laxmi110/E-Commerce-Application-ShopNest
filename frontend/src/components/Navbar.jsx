import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import shopNestLogo from '../ShopNest_Logo.webp'
import '../style/Navbar.css'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useContext(AuthContext)
  const handleLogout = () => {
    logout()
  }

  return (
    <nav className='navbar'>
        <div className='navbar-brand'>
            <Link to='/'>
            <img src={shopNestLogo} alt='Shopnest' className='shopnest-logo' style={{ height: '36px', width: '36px', borderRadius: '8px', objectFit: 'cover', filter: 'drop-shadow(0 2px 8px rgba(249, 115, 22, 0.35))'}}/> 
            ShopNest </Link>
        </div>
        <ul className='navbar-links'>
            <li><Link to='/shop'>Shop</Link></li>
            <li><Link to='/cart'>Cart</Link></li>
            <li><Link to='/profile'>Profile</Link></li>
            

            {user ? (
          <>
            <li><Link to="/profile">Hi, {user?.name || 'User'}</Link></li>
            {user?.role === 'admin' && <li><Link to="/admin">Admin</Link></li>}
            <li><button onClick={handleLogout} className="btn-logout">Logout</button></li>
          </>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
        </ul>     
    </nav>
  )
}

export default Navbar
