import { useState, useEffect } from 'react';
import { fetchMovieCredits } from 'services/api';
import { useParams } from 'react-router-dom';

const CastPage = () => {
  const [cast, setCast] = useState([]);

  const params = useParams();

  useEffect(() => {
    fetchMovieCredits(params.movieId)
      .then(resp => {
        if (!resp.ok) {
          throw new Error();
        }
        return resp.json();
      })
      .then(data => {
        setCast(
          data.cast
            .filter(
              actor =>
                actor.id && actor.name && actor.character && actor.profile_path
            )
            .map(({ id, name, character, profile_path }) => ({
              id,
              name,
              character,
              image: `https://image.tmdb.org/t/p/w200${profile_path}`,
            }))
        );
      });
  }, [params.movieId]);

  return (
    <>
      {cast.length > 0 && (
        <ul>
          {cast.map(({ name, character, image, id }) => (
            <li key={id}>
              <img src={image} alt={name} />
              <h3>{name}</h3>
              <p>Character : {character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default CastPage;
