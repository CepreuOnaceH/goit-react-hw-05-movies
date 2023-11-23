import { NavLink } from 'react-router-dom';
import { HomeStyles } from './HomeStyles.styled';

const Home = () => {
  return (
    <HomeStyles>
      <NavLink to="/">Home</NavLink>
      <NavLink to="movies">Movies</NavLink>
    </HomeStyles>
  );
};

export default Home;
