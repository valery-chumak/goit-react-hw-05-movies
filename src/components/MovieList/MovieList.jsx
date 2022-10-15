import React from 'react';
import PropTypes from 'prop-types';
import MovieListItem from 'components/MovieListItem/MovieListItem';
import css from './MovieList.module.css';
export default function MovieList({ items }) {
  return (
    <div className={css.Container}>
      <ul className={css.MovieList}>
        {items.map(({ id, title, name, poster_path }) => (
          <MovieListItem
            key={id}
            id={id}
            title={title}
            name={name}
            poster_path={poster_path}
          />
        ))}
      </ul>
    </div>
  );
}
MovieList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      name: PropTypes.string,
    })
  ),
};
