import { fetchMovieReviews } from 'services/api';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ReviewsPage = () => {
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState('');
  const params = useParams();

  useEffect(() => {
    setError('');
    fetchMovieReviews(params.movieId)
      .then(resp => {
        if (!resp.ok) {
          throw new Error();
        }
        return resp.json();
      })
      .then(data => {
        if (data.results.length === 0) {
          setError('There are no any reviews for that movie.');
          throw new Error();
        }

        setReviews(
          data.results.map(({ author, content }) => ({
            author,
            content,
          }))
        );
      })
      .catch(error => console.log(error));
  }, [params.movieId]);

  return (
    <>
      {error ? (
        <h3>{error}</h3>
      ) : (
        <ul>
          {reviews?.map(({ author, content }, index) => (
            <li key={index}>
              <h3>Author: {author}</h3>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ReviewsPage;
