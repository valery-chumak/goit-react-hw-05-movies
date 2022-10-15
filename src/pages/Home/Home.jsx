import React, { useState, useEffect } from 'react';
import { getPopularMovie } from 'components/Api/Api';
import MovieList from 'components/MovieList/MovieList';
import Loader from 'components/Loader/Loader';
import css from './Home.module.css';

export default function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPopularMovie();
  }, []);
  const fetchPopularMovie = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPopularMovie();
      setItems(prev => [...prev, ...data.results]);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {loading && <Loader />}
      {error && <h2>Sorry. Something get wrong. Try later.</h2>}
      <h1 className={css.Title}>Trending Today</h1>
      {<MovieList items={items} />}
    </div>
  );
}
