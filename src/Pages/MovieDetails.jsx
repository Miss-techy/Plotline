import { FaArrowAltCircleLeft } from "react-icons/fa";
import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './MovieDetails.css';

function MovieDetails() {

//Get the movie id from the URL
const { id } = useParams();


//Stores movie details.
const [movie, setMovie] = useState(null)


const [error, setError] = useState('')


const apiKey = 'ec041243'

//Get the navigate function:Allows navigation programmatically (like "go back").
const navigate = useNavigate() 



//Runs once on load. Fetches movie by ID.
useEffect(() => {
  
  //async function for fetching movie detail
  
  async function fetchMovie() {
    try{
      const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`)
      const data = await response.json();

      //Stores movie if found.
      if(data.Response === 'True') {
        setMovie(data)
      }
      else{
        //update state error
        setError(data.Error || 'Movie not Found')
      }
    }
      catch(err) {
        setError('Something went wrong')
      }
    }

  fetchMovie()
  console.log(movie)
}, [id])

//if there's an error render the error statment
if(error) return <p>{error}</p>

//if there is no movie 
if(!movie) return <p>Loading...</p>


//"Back to Search" button navigates back.
function handleBack() {
  navigate(-1)
}







  return (

    <>
      <div className="details-container">  
    <div className="return-button" onClick={handleBack}>
      <FaArrowAltCircleLeft />
      <span>Back to Search</span>
    </div>

    <div className="details-page">
      <h2>{movie.Title}</h2>
      {/* if the movie poster is available show it, else display the default placeholder image */}
      <img src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300'} alt={movie.Title} />
      <p>Year: {movie.Year}</p>
      <p>Genre: {movie.Genre}</p>
      <p>Plot: {movie.Plot}</p>
      <p>Actors: {movie.Actors}</p>
      <p>IMDB Rating: {movie.imdbRating}</p>
        </div>
    </div>

    </>
  )
}

export default MovieDetails


