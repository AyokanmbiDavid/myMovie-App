import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

// Base URL for popular movies
const API_URL =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc";

const Home = ({ searchTerm }) => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch movies based on search term or popular movies
  useEffect(() => {
    const fetchMovies = async (url) => {
      setIsLoading(true);
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
        setTotalPages(data.total_pages);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
      setIsLoading(false);
    };

    let url;
    if (searchTerm) {
      url = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=${currentPage}`;
    } else {
      url = `${API_URL}&page=${currentPage}`;
    }

    fetchMovies(url);
  }, [searchTerm, currentPage]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center">
        {searchTerm ? `Results for "${searchTerm}"` : "Popular Movies"}
      </h3>
      <div className="row">
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <h5 className="text-center text-muted">No movies found</h5>
        )}
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-secondary mx-2"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="align-self-center">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-secondary mx-2"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
