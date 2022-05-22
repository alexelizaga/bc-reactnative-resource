import {useEffect, useState} from 'react';

import {MoviesResponse, Movie} from '../interfaces/MovieInterface';
import tmdb from '../api/tmdb';

interface MoviesState {
  isLoading: boolean;
  nowPlaying: Movie[];
  popular: Movie[];
  topRated: Movie[];
  upcoming: Movie[];
}

const initialMoviesState: MoviesState = {
  isLoading: true,
  nowPlaying: [],
  popular: [],
  topRated: [],
  upcoming: [],
};

export const useMovies = () => {
  const [moviesState, setMoviesState] =
    useState<MoviesState>(initialMoviesState);

  const getMovies = async () => {
    const nowPlayingPromise = tmdb.get<MoviesResponse>('/now_playing');
    const popularPromise = tmdb.get<MoviesResponse>('/popular');
    const topRatedPromise = tmdb.get<MoviesResponse>('/top_rated');
    const upcomingPromise = tmdb.get<MoviesResponse>('/upcoming');

    const [nowPlayingResp, popularResp, topRatedResp, upcomingResp] =
      await Promise.all([
        nowPlayingPromise,
        popularPromise,
        topRatedPromise,
        upcomingPromise,
      ]);

    setMoviesState({
      isLoading: false,
      nowPlaying: nowPlayingResp.data.results,
      popular: popularResp.data.results,
      topRated: topRatedResp.data.results,
      upcoming: upcomingResp.data.results,
    });
  };

  useEffect(() => {
    getMovies();
  }, []);

  return {
    ...moviesState,
  };
};
