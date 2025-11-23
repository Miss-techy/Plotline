import './App.css'
import MovieApp from './Pages/MovieApp'
import Home from './Pages/Home'
import MovieDetails from './Pages/MovieDetails'
// import Navbar from './Components/Navbar'
import Wishlist from './Pages/Wishlist'


import {  Routes, Route } from 'react-router-dom'

import {useEffect, useState} from 'react'


function App() {

const [checked,setChecked] = useState(false)

// initialize a state variable named `stage` with the value `"logo"`
const [stage, setStage] = useState('logo')

// set a timer that waits **2.5 seconds** (2500 milliseconds), then switche the stage to `"doors"`
// after 2.5s the logo will disappear and the doors will open

useEffect(() => {
  const logoTimer = setTimeout(() => {
    setStage('doors')
  }, 2500)

// open doors to home after logo finishes fading
  const doorTimer = setTimeout(() => {
    setStage('home')
  }, 4500)

  // cleanup function
  return () => {
    clearTimeout(logoTimer);
    clearTimeout(doorTimer)
  }
}, [])

const handleChange= () => {
  setChecked(!checked)
}
  return (

    <>
        <div className="app">
          
          {/* If `stage` is `"logo,displays the logo image" */}
          {stage === 'logo' && (
            <div className="logo-screen">
                        <span alt="Logo" className="logo-fade" >Welcome To Plotline</span>
                        <p className="logo-fade-p">Your movies. Your world!</p>
            </div>

            )}


          {/* If `stage` is `"logo,displays the logo image" */}


          {stage === 'doors' && (

            <div className="door-transition">
              <div className="door left-door"></div>
              <div className="door right-door"></div>
            </div>
            )}


          {stage === 'home' &&  (

            <div className="me">
            {/* <Navbar/> */}
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/MovieApp" element={<MovieApp />} />
            <Route path="/MovieDetails/:id" element={<MovieDetails />} />
            <Route path="/Wishlist" element={<Wishlist />} />
          </Routes>
          </div>
                        )}




        </div>
  
       
    </>
  )
}

export default App


