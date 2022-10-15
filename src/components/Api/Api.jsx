import axios from 'axios';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '2d21b04d3b03b23534dece0215c27911';
const instance = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const getPopularMovie = async (page = 1) => {
  const { data } = await instance.get('/trending/all/day', {
    params: {
      page,
    },
  });
  return data;
};
export const searchMovie = async query => {
  const { data } = await instance.get('/search/movie', {
    params: {
      query,
    },
  });
  return data;
};
export const getMovieById = async id => {
  const { data } = await instance.get(`/movie/${id}`);
  return data;
};
export const searchMovieCredits = async id => {
  const { data } = await instance.get(`/movie/${id}/credits`);
  return data;
};
export const searchMovieReviews = async id => {
  const { data } = await instance.get(`/movie/${id}/reviews`);
  return data;
};
