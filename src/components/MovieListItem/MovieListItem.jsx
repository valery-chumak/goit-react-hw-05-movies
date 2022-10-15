import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import css from './MovieListItem.module.css';
import image from '../../img/no-img.jpg';
const URL_IMG = `https://image.tmdb.org/t/p/original/`;
export default function MovieListItem({ id, title, name, poster_path }) {
  return title ? (
    poster_path ? (
      <Link to={`/movies/${id}`}>
        <li className={css.Item}>
          <img
            className={css.MovieListItem_image}
            src={`${URL_IMG}/${poster_path}`}
            alt={title}
          />
          <p className={css.title}>{title}</p>
        </li>
      </Link>
    ) : (
      <Link to={`/movies/${id}`}>
        <li className={css.Item}>
          <img className={css.MovieListItem_image} src={image} alt={title} />
          <p className={css.title}>{title}</p>
        </li>
      </Link>
    )
  ) : poster_path ? (
    <Link to={`/movies/${id}`}>
      <li className={css.Item}>
        <img
          className={css.MovieListItem_image}
          src={`${URL_IMG}/${poster_path}`}
          alt={name}
        />
        <p className={css.title}>{name}</p>
      </li>
    </Link>
  ) : (
    <Link to={`/movies/${id}`}>
      <li className={css.Item}>
        <img className={css.MovieListItem_image} src={image} alt={name} />
        <p className={css.title}>{name}</p>
      </li>
    </Link>
  );
}
MovieListItem.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
};
