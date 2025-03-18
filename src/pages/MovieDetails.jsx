// MovieDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    // Fetch movie details
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch((err) => console.error("Error fetching movie details:", err));

    // Fetch movie trailer
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const officialTrailer = data.results.find((vid) => vid.type === "Trailer" && vid.site === "YouTube");
        if (officialTrailer) setTrailer(officialTrailer.key);
      })
      .catch((err) => console.error("Error fetching trailer:", err));
  }, [id]);

  if (!movie) return <h2 className="text-center">Loading...</h2>;

  // Generate MovieBo search link
  const movieBoSearch = `https://moviebo.org/search?q=${encodeURIComponent(movie.title)}`;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://via.placeholder.com/500x750?text=No+Image"
            }
            className="img-fluid rounded"
            alt={movie.title}
          />
        </div>
        <div className="col-md-6">
          <h4>{movie.title}</h4>
          <p>{movie.overview}</p>
          <h6>⭐ {movie.vote_average}</h6>
          <p>🎬 Release Date: {movie.release_date}</p>

          {/* Embed YouTube Trailer */}
          {trailer ? (
            <div className="embed-responsive embed-responsive-16by9 mb-3">
              <iframe
                className="embed-responsive-item"
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${trailer}`}
                title="Movie Trailer"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <p>No trailer available.</p>
          )}

          {/* Download Button */}
          <a
            href={movieBoSearch}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-success me-2"
          >
            📥 Download Movie
          </a>

          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
