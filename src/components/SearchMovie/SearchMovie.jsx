import { useState } from 'react';
import PropTypes from 'prop-types';
import { SearchMovieStyles } from './SearchMovieStyles.styled';

const SearchMovie = ({ setSearchText }) => {
  const [inputValue, setInputValue] = useState('');

  const handlerChange = ({ target: { value } }) => {
    setInputValue(value);
  };

  const handlerSubmit = e => {
    e.preventDefault();
    if (inputValue.trim()) {
      setSearchText(inputValue.trim().toLowerCase());
      setInputValue('');
    } else {
      return alert('Please, write anything');
    }
  };

  return (
    <SearchMovieStyles onSubmit={handlerSubmit}>
      <input onChange={handlerChange} value={inputValue} />
      <button type="submit">Search</button>
    </SearchMovieStyles>
  );
};

export default SearchMovie;

SearchMovie.propTypes = {
  setSearchText: PropTypes.func.isRequired,
};
