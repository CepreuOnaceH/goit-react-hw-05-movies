import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import Layout from 'components/Layout/Layout';
import { AppStyles } from 'AppStyles.styled';

const Home = lazy(() => import('./pages/HomePage'));
const Movies = lazy(() => import('./pages/MoviesPage'));
const Cast = lazy(() => import('./pages/CastPage'));
const Reviews = lazy(() => import('./pages/ReviewsPage'));
const MovieDetails = lazy(() =>
  import('./components/MovieDetails/MovieDetails')
);

export const App = () => {
  return (
    <AppStyles>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
        </Route>
        <Route path="*" element={<Layout />}>
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </AppStyles>
  );
};
