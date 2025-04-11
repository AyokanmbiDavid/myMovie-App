import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetail = () => {
  const { id } = useParams();  // Get movie ID from URL
  const [movieDetails, setMovieDetails] = useState(null);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const API_URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_ACCESS_TOKEN}&language=en-US`;

      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setMovieDetails(data);
        fetchMovieTrailer(data.id); // Fetch the trailer when movie details are available
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    const fetchMovieTrailer = async (movieId) => {
      const TRAILER_URL = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${import.meta.env.VITE_TMDB_ACCESS_TOKEN}&language=en-US`;
      
      try {
        const res = await fetch(TRAILER_URL);
        const data = await res.json();
        const trailerData = data.results.find((video) => video.type === 'Trailer' && video.site === 'YouTube');
        if (trailerData) {
          setTrailer(trailerData.key); // Store the trailer key
        }
      } catch (error) {
        console.error('Error fetching movie trailer:', error);
      }
    };

    fetchMovieDetails();
  }, [id]); // Re-fetch movie details and trailer if the movie ID changes

  if (!movieDetails) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <img
            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
            alt={movieDetails.title}
            className="img-fluid rounded"
          />
        </div>

        <div className="col-md-8">
          <h1>{movieDetails.title}</h1>
          <p className="text-muted">{movieDetails.release_date}</p>
          <p className="lead">{movieDetails.tagline}</p>
          <p>{movieDetails.overview}</p>

          <div className="mt-4">
            <h5>Genres</h5>
            <ul className="list-inline">
              {movieDetails.genres.map((genre) => (
                <li key={genre.id} className="list-inline-item">
                  <span className="badge bg-primary">{genre.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <h5>Additional Info</h5>
            <p><strong>Runtime:</strong> {movieDetails.runtime} minutes</p>
            <p><strong>Language:</strong> {movieDetails.original_language.toUpperCase()}</p>
            <p><strong>Vote Average:</strong> {movieDetails.vote_average} / 10</p>
          </div>

          {/* Trailer Section */}
          {trailer && (
            <div className="mt-4">
              <h5>Watch the Trailer</h5>
              <div className="embed-responsive embed-responsive-16by9">
                <iframe
                  className="embed-responsive-item"
                  src={`https://www.youtube.com/embed/${trailer}`}
                  title="Movie Trailer"
                  allowFullScreen
                ></iframe>
              </div>
              <a
                href={`https://www.youtube.com/watch?v=${trailer}`}
                className="btn btn-primary mt-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch on YouTube
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
