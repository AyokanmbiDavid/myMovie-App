// MovieCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <div className="col-md-4 col-sm-6">
      <div className="card hoverable">
        <div className="card-image">
          {imageUrl ? (
            <img src={imageUrl} alt={movie.title} className="img-fluid" />
          ) : (
            <div
              className="no-image"
              style={{
                width: "100%",
                height: "300px",
                backgroundColor: "#f8f9fa",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#6c757d",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              No Image Available
            </div>
          )}
          <span className="card-title">{movie.title}</span>
        </div>
        <div className="card-content">
          <p>⭐ {movie.vote_average}</p>
        </div>
        <div className="card-action">
          <Link to={`/movie/${movie.id}`} className="waves-effect waves-light btn btn-primary">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
