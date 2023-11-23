const API_KEY = '8aba4e3419a44727b7eb66f35fce4fa2';

export const fetchTrendingMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
  );
};
export const fetchMovieByName = value => {
  return fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${value}`
  );
};
export const fetchMovieDetails = id => {
  return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
};
export const fetchMovieCredits = id => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
  );
};
export const fetchMovieReviews = id => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}`
  );
};
