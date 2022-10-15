import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Searchbar from 'components/Searchbar/Searchbar';
import { searchMovie } from 'components/Api/Api';
import MovieList from 'components/MovieList/MovieList';
import Loader from 'components/Loader/Loader';

export default function Movies() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('searchQuery');

  useEffect(() => {
    if (searchQuery) {
      fetchMoviesSearch(searchQuery);
    }
  }, [searchQuery]);

  const handleChangeState = search => {
    setSearchParams({ searchQuery: search });
    setItems([]);
    setLoading(false);
  };
  const fetchMoviesSearch = async (search, page) => {
    setLoading(true);
    try {
      const data = await searchMovie(search, page);
      setItems(prev => [...prev, ...data.results]);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      {error && <h2>Sorry. Something get wrong. Try later.</h2>}
      <Searchbar onSubmit={handleChangeState} />
      {<MovieList items={items} />}
    </>
  );
}
