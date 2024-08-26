import React,{ useEffect } from 'react';
import Header from "./Header";
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import MainContainer from './MainContainer';
import SecondryContainer from './SecondryContainer';
import usePopularMovies from '../hooks/usePopularMovies';

const Browse = () => {
  const movies = useNowPlayingMovies();
  const popularMovies = usePopularMovies();

  return (
    <div>
      <Header />
      <MainContainer />
      <SecondryContainer />
    </div>
  )
}

export default Browse