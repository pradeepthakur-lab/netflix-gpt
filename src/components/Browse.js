import React,{ useEffect } from 'react';
import Header from "./Header";
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import MainContainer from './MainContainer';
import SecondryContainer from './SecondryContainer';
import usePopularMovies from '../hooks/usePopularMovies';
import GPTSearch from './GPTSearch';
import { useSelector } from 'react-redux';

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const movies = useNowPlayingMovies();
  const popularMovies = usePopularMovies();

  return (
    <div>
      <Header />
      {
        showGptSearch ? <GPTSearch /> : (
          <>
            <MainContainer />
            <SecondryContainer />
          </>
        )
      }
      
    </div>
  )
}

export default Browse