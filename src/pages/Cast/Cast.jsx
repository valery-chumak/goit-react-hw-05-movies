import React, { useState, useEffect } from 'react';
import { searchMovieCredits } from 'components/Api/Api';
import { useParams } from 'react-router-dom';
import css from './Cast.module.css';
import Loader from 'components/Loader/Loader';
import image from '../../img/no-img.jpg';
const URL_IMG = `https://image.tmdb.org/t/p/original/`;

export default function Cast() {
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { movieId } = useParams();

  useEffect(() => {
    const fetchFilmDetails = async () => {
      try {
        setLoading(true);
        setState(null);
        setError(null);
        const data = await searchMovieCredits(movieId);
        setState(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchFilmDetails();
  }, [movieId]);

  return (
    <div>
      {loading && <Loader />}
      {error && <h2>Sorry. Something get wrong. Try later.</h2>}
      {state && (
        <div className={css.Container}>
          <ul className={css.CastList}>
            {state.cast.map(({ id, character, name, profile_path }) => (
              <li className={css.CastListItem} key={id}>
                {profile_path ? (
                  <img
                    className={css.Poster_image}
                    src={`${URL_IMG}/${profile_path}`}
                    alt={name}
                  />
                ) : (
                  <img className={css.Poster_image} src={image} alt={name} />
                )}
                <h4>Actor</h4>
                <p>{name}</p>
                <h4>Character</h4>
                <p>{character}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
