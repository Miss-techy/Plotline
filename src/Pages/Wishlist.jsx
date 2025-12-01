import { useState, useEffect } from "react";
import "./Wishlist.css";
import Navbar from "../Components/Navbar";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(saved);
  }, []);

  function removeItem(id) {
    const updated = wishlist.filter(item => item.imdbID !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  }

  return (
  	<>

  	<Navbar /> 
  	<br/><br/><br/><br/>
    <div className="wishlist-container">
      <h2>Your Wishlists </h2>

      {wishlist.length === 0 && <p>No items in wishlist yet.</p>}

      <div className="wishlist-grid">
        {wishlist.map((movie) => (
          <div className="wishlist-card" key={movie.imdbID}>
            <img src={movie.Poster} alt={movie.Title} />
            <h3>{movie.Title}</h3>
            <button onClick={() => removeItem(movie.imdbID)}>
              Remove 
            </button>
          </div>
        ))}
      </div>
    </div>

    </>
  );
}

export default Wishlist;
