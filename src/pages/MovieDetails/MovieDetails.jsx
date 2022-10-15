import React, { useState, useEffect } from 'react';
import {
  useParams,
  useNavigate,
  useLocation,
  Link,
  Outlet,
} from 'react-router-dom';
import { getMovieById } from 'components/Api/Api';
import Loader from 'components/Loader/Loader';
import css from './MovieDetails.module.css';
import image from '../../img/no-img.jpg';
const URL_IMG = `https://image.tmdb.org/t/p/original/`;
export default function MovieDetails() {
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchFilmDetails = async () => {
      try {
        setLoading(true);
        setState(null);
        setError(null);
        const data = await getMovieById(movieId);
        setState(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchFilmDetails();
  }, [movieId]);
  const goBack = () => {
    navigate(-1);
  };
  const isReviewsPage = location.pathname.includes('reviews')
    ? `/movies/${movieId}`
    : `/movies/${movieId}/reviews`;
  const isCastPage = location.pathname.includes('cast')
    ? `/movies/${movieId}`
    : `/movies/${movieId}/cast`;
  return (
    <>
      <div className={css.Container}>
        <button className={css.Button} onClick={goBack}>
          ❮ Go Back
        </button>
        {loading && <Loader />}
        {error && <h2>Sorry. Something get wrong. Try later.</h2>}
        {state && (
          <div className={css.Wrapper}>
            {state.poster_path ? (
              <img
                className={css.Poster_image}
                src={`${URL_IMG}/${state.poster_path}`}
                alt={state.title ?? state.name}
              />
            ) : (
              <img
                className={css.Poster_image}
                src={image}
                alt={state.title ?? state.name}
              />
            )}
            <div className={css.Wrapper_info}>
              <h1 className={css.Title}>
                {state.title ? state.title : state.name}
              </h1>
              <h2 className={css.Overview_Title}>Overview</h2>
              <p className={css.Text}>{state.overview}</p>
              <h2 className={css.Overview_Title}>Genres</h2>
              <p className={css.Text}>
                {state.genres.map((genre, index) => {
                  return <li key={index}>{genre.name}</li>;
                })}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className={css.Container_Additional}>
        <h2 className={css.Additional_Title}>Additional Information</h2>
        <ul>
          <li className={css.Additional_Link}>
            <Link to={isCastPage}>Cast</Link>
          </li>
          <li className={css.Additional_Link}>
            <Link to={isReviewsPage}>Reviews</Link>
          </li>
        </ul>
        <Outlet />
      </div>
    </>
  );
}
