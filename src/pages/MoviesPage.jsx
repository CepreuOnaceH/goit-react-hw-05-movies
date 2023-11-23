import SearchMovie from 'components/SearchMovie/SearchMovie';
import MovieList from 'components/MoviesList/MoviesList';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchMovieByName } from 'services/api';

const MoviesPage = () => {
  const [movieList, setMovieList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get('query')) {
      setSearchText(searchParams.get('query'));
    }
  }, [searchParams]);

  useEffect(() => {
    if (!searchText) {
      return;
    }

    setError('');
    fetchMovieByName(searchText)
      .then(resp => {
        if (!resp.ok) {
          setError('Sorry, something wrong');
          throw new Error();
        }
        return resp.json();
      })
      .then(data => {
        if (data.results.length === 0) {
          setError(`Sorry, there are no results for request "${searchText}".`);
          throw new Error();
        }

        setMovieList(
          data.results.map(film => ({ title: film.title, id: film.id }))
        );
      })
      .catch(err => console.log(err));
    setSearchParams({ query: searchText });
  }, [searchText, setSearchParams]);

  return (
    <>
      <SearchMovie setSearchText={setSearchText} />

      {error && <h3>{error}</h3>}
      {!error && movieList.length > 0 && <MovieList movies={movieList} />}
    </>
  );
};

export default MoviesPage;
