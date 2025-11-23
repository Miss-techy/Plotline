import { useState, useRef, useEffect } from 'react';
import './MovieApp.css';
import { Link } from 'react-router-dom'
import MovieDetails  from './MovieDetails'
import Navbar from "../Components/Navbar";



function MovieApp() {
  const [input, setInput] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);
  const [minYear, setMinYear] = useState(1990);
  const [maxYear, setMaxYear] = useState(2025);
  const [minRating, setMinRating] = useState(1);
  const [maxRating, setMaxRating] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const apiKey = 'ec041243';
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${input}`;

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  async function getMovie() {
    if (!input.trim()) return;

    setLoading(true);
    setError('');
    setMovies([]);

    try {
      const response = await fetch(url);
      const json = await response.json();

      if (json.Response === 'True') {
        setMovies(json.Search);
      } else {
        setError(json.Error || 'No movies found.');
      }
    } catch (err) {
      setError('An error occurred while fetching data');
    }

    setLoading(false);
    setInput('');
  }

  async function handleAutocomplete(query) {
    if (!input.trim()) return;

    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`);
    const json = await response.json();

    if (json.Response === 'True') {
      const titles = json.Search.map((movie) => movie.Title);
      setSuggestions(titles);
    } else {
      setSuggestions([]);
    }
  }

  // Listen for clicks and checks if the click was outside the search bar area.
  useEffect(() => {
  function handleClickOutside(e) {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setSuggestions([]); // closes autocomplete
    }
  }

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);


  async function handleFilter() {
    await getMovie();

    const tempArray = [];

    for (const movie of movies) {
      const filteredUrl = `https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`;

      try {
        const response = await fetch(filteredUrl);
        const json = await response.json();

        const selectedGenre = selectedGenres[0];

        if (selectedGenre && json.Genre.includes(selectedGenre)) {
          tempArray.push(json);
        } else if (selectedType && json.Type.includes(selectedType)) {
          tempArray.push(json);
        } else if (
          parseInt(movie.Year) >= minYear &&
          parseInt(movie.Year) <= maxYear
        ) {
          tempArray.push(json);
        } else if (
          movie.imdbRating !== 'N/A' &&
          parseFloat(movie.imdbRating) >= minRating &&
          parseFloat(movie.imdbRating) <= maxRating
        ) {
          tempArray.push(json);
        }
      } catch (err) {
        setError('Unable to filter data');
        console.log(err);
      }
    }

    setMovies(tempArray);
  }

  return (
    <>
     <Navbar /> 

     <br/> <br/>  <br/><br/>
      <div className="">
        <div className="search-title">Search for your favourite movie!</div> 
        <div className="searchBar" ref={searchRef}>
          <input
            type="text"
            placeholder="Search for a movie..."
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              handleAutocomplete(e.target.value);
            }}
          />
          {suggestions.length > 0 && (
            <ul className="autocomplete-list">
              {suggestions.map((title, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setInput(title);
                    setSuggestions([]);
                  }}
                >
                  {title}
                </li>
              ))}
            </ul>
          )}
          <button onClick={getMovie}>Search</button>
        </div>

        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}
      </div>

      <section className="main">
        <div className="movieContainer">
          <div className="movieBox">
            {movies.map((movie, index) => (
              <div className="movieCard" key={index}>
                <div className="movieImg">
                  <img
                    src={
                      movie.Poster !== 'N/A'
                        ? movie.Poster
                        : 'https://via.placeholder.com/200x300?text=No+Image'
                    }
                    alt={movie.Title}
                  />
                </div>
                <div className="title">
                  <h3>{movie.Title}</h3>
                  <p>{movie.Year}</p>
                  <button>
                    <Link to={`/MovieDetails/${movie.imdbID}`}>See Details</Link>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Filter Button */}
      {movies.length > 0 && (
        <button className="filterFloatingBtn" onClick={toggleModal}>
          ⚙️
        </button>
      )}

      {/* Filter Modal */}
      {isModalOpen && (
        <div className="filterModalOverlay" onClick={toggleModal}>
          <div
            className="filterModal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Filter Results</h2>
            <button className="closeBtn" onClick={toggleModal}>
              ✕
            </button>

            <div className="genreFilter">
              <label>Genre:</label>
              <select
                value={selectedGenres[0] || ''}
                onChange={(e) => setSelectedGenres([e.target.value])}
              >
                <option value="">Select Genre</option>
                <option value="Action">Action</option>
                <option value="Comedy">Comedy</option>
                <option value="Historical">Historical</option>
                <option value="Biography">Biography</option>
                <option value="Thriller">Thriller</option>
                <option value="Mystery">Mystery</option>
                <option value="Drama">Drama</option>
              </select>
            </div>

            <div className="typeFilter">
              <label>Type:</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="">Select Type</option>
                <option value="Movie">Movie</option>
                <option value="Series">Series</option>
              </select>
            </div>

            <div className="yearFilter">
              <label>
                Select Year: {minYear} - {maxYear}
              </label>
              <input
                type="range"
                min="1990"
                max="2025"
                value={minYear}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (val <= maxYear) setMinYear(val);
                  else setMinYear(maxYear);
                }}
              />
              <input
                type="range"
                min="1990"
                max="2025"
                value={maxYear}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (val >= minYear) setMaxYear(val);
                  else setMaxYear(minYear);
                }}
              />
            </div>

            <div className="ratingFilter">
              <label>
                Select Rating: {minRating} - {maxRating}
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={minRating}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (val <= maxRating) setMinRating(val);
                  else setMinRating(maxRating);
                }}
              />
              <input
                type="range"
                min="1"
                max="10"
                value={maxRating}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (val >= minRating) setMaxRating(val);
                  else setMaxRating(minRating);
                }}
              />
            </div>

            <button className="applyBtn" onClick={handleFilter}>
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default MovieApp;