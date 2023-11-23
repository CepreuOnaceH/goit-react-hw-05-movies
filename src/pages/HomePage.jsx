import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchTrendingMovies } from 'services/api';

const HomePage = () => {
  const [trandingMovies, setTrandingMovies] = useState([]);
  const [error, setError] = useState('');
  const location = useLocation();

  useEffect(() => {
    setError('');
    fetchTrendingMovies()
      .then(resp => {
        if (!resp.ok) {
          setError('Sorry, something went wrong');
          throw new Error();
        }
        return resp.json();
      })
      .then(data => {
        if (data.results.length === 0) {
          setError('Sorry, there are no results');
          throw new Error();
        }
        return data.results;
      })
      .then(data => {
        setTrandingMovies(
          data.map(film => ({ title: film.title, id: film.id }))
        );
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      {error ? (
        <li>{error}</li>
      ) : (
        trandingMovies.map(film => (
          <li key={film.id}>
            <Link to={`/movies/${film.id}`} state={location.pathname}>
              {film.title}
            </Link>
          </li>
        ))
      )}
    </>
  );
};

export default HomePage;
