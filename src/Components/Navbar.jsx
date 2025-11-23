import { useState,useEffect } from "react";
import { Link } from 'react-router-dom'



import MovieApp from '../Pages/MovieApp'
import Home from '../Pages/Home'
import MovieDetails from '../Pages/MovieDetails'
import './Navbar.css'


function Navbar({user, onLogout}) {

    const [open, setOpen] = useState(false);


	return(

		<>

     <nav className="nav">

      {/* Show username if user is logged in */}
      {user && <div className="nav-user">Welcome {user}</div>}

      {/* Logo */}
      <div className="nav-logo">Plotline</div>



      {/* Desktop Links */}
      <ul className={`nav-links ${open ? "open" : ""}`}>
        <Link className="nav-item" to="/">Home</Link>
        <Link className="nav-item" to="/MovieApp">Search</Link>
        <Link className="nav-item" to="/Wishlist">Wishlist</Link>
      
        {user && (
          <button className="nav-cta" >Logout</button>
          )}

    
        {/* <button className="nav-cta">Start Searching</button> */}
      </ul>

      {/* Hamburger */}
      <div className={`hamburger ${open ? "open" : ""}`} onClick={() => setOpen(!open)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>

{/* 		<div className="nav-container"> */}
{/* 			<nav> */}
{/* 				<Link to="/">Home</Link> */}
{/* 				<Link to="/MovieApp">Search</Link> */}
{/* 				<Link to="/Wishlist">Wishlist</Link> */}
{/*  */}
{/* 			</nav> */}
{/* 		</div> */}
       
    </>
  )
}

export default Navbar

