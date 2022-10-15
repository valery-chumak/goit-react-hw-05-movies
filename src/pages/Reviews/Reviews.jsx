import React, { useState, useEffect } from 'react';
import { searchMovieReviews } from 'components/Api/Api';
import { useParams } from 'react-router-dom';
import css from './Reviews.module.css';
import Loader from 'components/Loader/Loader';

export default function Reviews() {
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
        const data = await searchMovieReviews(movieId);
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
            {state.results.length > 0 ? (
              state.results.map(({ id, author, content }) => (
                <li className={css.CastListItem} key={id}>
                  <h4>
                    Author: <span className={css.Author}>{author}</span>
                  </h4>

                  <h4>Review</h4>
                  <p>{content}</p>
                </li>
              ))
            ) : (
              <p className={css.Apologize}>
                Sorry. We don't have reviews for this film.
              </p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
