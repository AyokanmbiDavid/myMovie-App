// Home.jsx
import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

const API_URL =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";

const Home = ({ searchTerm }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async (url) => {
      try {
        const res = await fetch(url, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
          },
        });
        const data = await res.json();
        setMovies(data.results);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };

    if (searchTerm) {
      const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=1`;
      fetchMovies(searchUrl);
    } else {
      fetchMovies(API_URL);
    }
  }, [searchTerm]);

  return (
    <div className="container mt-4">
      <h3 className="text-center">{searchTerm ? `Results for "${searchTerm}"` : "Popular Movies"}</h3>
      <div className="row">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <h5 className="text-center text-muted">No movies found</h5>
        )}
      </div>
    </div>
  );
};

export default Home;
