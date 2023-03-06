//const API_KEY = `dae00b55c2f84ea3e6b7a5269e204c45`;
const API_KEY = `d23c0c2d4e4286250cdab95e4dc48467`;

export const fetchMoviesByCategory = (category, page) => {
  const url = `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&page=${page}`;

  return fetch(url).then((resp) => {
    return resp.json();
  });
};

export const fetchMovieDetails = (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;

  return fetch(url).then((resp) => {
    return resp.json();
  });
};
