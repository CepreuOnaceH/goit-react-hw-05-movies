import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <>
      {movies.map(movie => (
        <li key={movie.id}>
          <Link
            to={`/movies/${movie.id}`}
            state={`${location.pathname}${location.search}`}
          >
            {movie.title}
          </Link>
        </li>
      ))}
    </>
  );
};

export default MovieList;

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};
