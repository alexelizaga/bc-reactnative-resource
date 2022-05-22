import {useState, useEffect} from 'react';
import tmdb from '../api/tmdb';
import {MovieInfoResponse} from '../interfaces/MovieInfoInterface';
import {CastResponse, Cast} from '../interfaces/CastInterface';

interface DetailsState {
  isLoading: boolean;
  movieInfo: MovieInfoResponse;
  cast: Cast[];
}

const InitialDetailsState: DetailsState = {
  isLoading: true,
  movieInfo: {} as MovieInfoResponse,
  cast: [],
};

export const useMovieDetail = (id: number) => {
  const [detailsState, setDetailsState] =
    useState<DetailsState>(InitialDetailsState);

  const getDetails = async () => {
    const castPromise = tmdb.get<CastResponse>(`/${id.toString()}/credits`);
    const movieInfoPromise = tmdb.get<MovieInfoResponse>(`/${id.toString()}`);

    const [movieInfoResp, castResp] = await Promise.all([
      movieInfoPromise,
      castPromise,
    ]);

    setDetailsState({
      isLoading: false,
      movieInfo: movieInfoResp.data,
      cast: castResp.data.cast,
    });
  };

  useEffect(() => {
    getDetails();
  }, []);

  return {
    ...detailsState,
  };
};
