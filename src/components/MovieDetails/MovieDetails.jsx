import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchMovieDetails } from 'services/api';
import { MovieDetailsStyles } from './MovieDetailsStyles.styled';

const MovieDetails = () => {
  const params = useParams();
  const [film, setFilmId] = useState(null);
  const location = useLocation();
  const [lastPage, setLastPage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (
      location.pathname.includes('cast') ||
      location.pathname.includes('reviews')
    ) {
      return;
    }
    setLastPage(location.state);
  }, [location]);

  useEffect(() => {
    setError('');
    fetchMovieDetails(params.movieId)
      .then(resp => {
        if (!resp.ok) {
          setError('Sorry, something went wrong');
          throw new Error();
        }
        return resp.json();
      })
      .then(data => {
        if (Object.keys(data).length === 0) {
          setError('Sorry, there is no information about this film.');
          throw new Error();
        }

        return setFilmId(data);
      })

      .catch(err => console.log(err));
  }, [params.id, params.movieId]);

  return (
    <>
      <Link to={error ? '/' : lastPage}>Go back</Link>
      {error && <h3>{error}</h3>}
      {film && (
        <MovieDetailsStyles>
          <img
            src={`https://image.tmdb.org/t/p/w400/${film.poster_path}`}
            alt={film.title}
          />
          <div>
            <h2>
              {film.title} ({Number.parseInt(film.release_date)})
            </h2>
            <p>User score: {Math.round(film.vote_average * 10)}%</p>
            <h3>Overview</h3>
            <p>{film.overview}</p>
            <h4>Genres</h4>
            <p>{film.genres?.map(genre => genre.name).join(', ')}</p>
          </div>

          <div></div>
        </MovieDetailsStyles>
      )}
      {!error && (
        <div>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </div>
      )}
      <Outlet />
    </>
  );
};

export default MovieDetails;
