import { useState,useEffect } from "react";
import MovieApp  from './MovieApp'
import Login from '../Components/Login'
import './Home.css'
import Navbar  from '../Components/Navbar'
import { Link } from 'react-router-dom'



function Home() {



 
    // state variable user(null means no one is logged in)
  const [user, setUser] = useState(null);

  useEffect(() => {

    // retrieve the stored user from browser local storage
    const storedUser = localStorage.getItem("user");
    // if user is found update the state to recognize the user as logged in
    if (storedUser) setUser(storedUser);
  }, []);//run once when component mounts cos of empty dependency array

//function to handle successful login/signup, which is passed as a prop to the login component
  // when a user successfully logins/signups onAuthSuccess(email) is called
  
  const handleAuthSuccess = (username) => {
    setUser(username);
  };

  // function to remove user from local storage
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <>

{/* if user is not logged in Renders the login/signup UI. Passes down the handleAuthSuccess function as a prop. */}
    {/* when a user logs in, the chhild component will call onAuthSuccess(email), which will update the user state*/}
      {!user ? (
        <Login onAuthSuccess={handleAuthSuccess} />
      ) : (
        <>
          {/* if user is logged in show a navbar with a welcome message, showing the user's email */}

          <Navbar user={user} onLogout={handleLogout} />
            {/* <div className="user">Welcome, {user}</div> */}
            {/* <div className="nav-logo">Plotline</div> */}
            {/* <button className="logout-btn" onClick={handleLogout}> */}
            {/*   Logout */}
            {/* </button> */}
          

          <div className="home-hero">
            <div className="hero-overlay"></div>

            <div className="hero-content">
              <h1>Explore. Discover. Watch.</h1>
              <p>
                Your gateway to everything movies — search titles, save
                favorites, and explore detailed insights.
              </p>

              <Link to="/MovieApp">
                <button className="hero-btn">Start Searching</button>
              </Link>
            </div>
          </div>

          {/* More sections if you want */}
          <section className="features">
            <h2>Why Plotline?</h2>

            <div className="feature-grid">
              <div className="feature-card">
                <h3>🎬 Search Movies</h3>
                <p>Instantly search millions of titles from IMDb.</p>
              </div>

              <div className="feature-card">
                <h3>❤️ Build Your Watchlist</h3>
                <p>Save your favorite movies and access them anytime.</p>
              </div>

              <div className="feature-card">
                <h3>📚 Detailed Information</h3>
                <p>View ratings, summaries, cast, trailers, and more!</p>
              </div>
            </div>
          </section>
         
        </>

      )}
      
    </>
  );
}

export default Home;

