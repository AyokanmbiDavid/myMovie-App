import React from 'react';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const { title, overview, poster_path, id } = movie;
  const navigate = useNavigate();

  // Function to handle the card click event and navigate to movie details page
  const handleCardClick = () => {
    navigate(`/movie/${id}`); // Navigate to the movie details page
  };

  return (
    <div className="col-md-3 col-sm-6 mb-4">
      <div className="card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
          className="card-img-top"
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{overview.slice(0, 100)}...</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
