import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import lang from "../utils/languageConstants"
import openai from '../utils/openai';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../hooks/gptSlice';
import loaderImg from '../assets/images/loader.png'

const GptSearchBar = () => {
    const dispatch = useDispatch();
    const langKey = useSelector((store) => store.config.lang);
    const searchText = useRef(null);

    const [loader, setLoader] = useState(false);

    // search movie in TMDB
    const searchMovieTMDB = async (movie) => {
      const data = await fetch(
        "https://api.themoviedb.org/3/search/movie?query=" +
          movie +
          "&include_adult=false&language=en-US&page=1",
        API_OPTIONS
      );
      const json = await data.json();

      return json.results;
    };

    const handleGptSearchClick = async () => {
      setLoader(true);
      // const gptQuery =
      // "Act as a Movie Recommendation system and suggest some movies for the query : " +
      // searchText.current.value +
      // ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

      // console.log('gptQueryt => ', gptQuery);

      // const gptResults = await openai.chat.completions.create({
      //   model: "gpt-4o-mini",
      //   messages: [{ role: "user", content: gptQuery }],
      //   // stream: true,        
      // });

      // if (!gptResults.choices) {
      //   // TODO: Write Error Handling
      // }

      // console.log(gptResults.choices?.[0]?.message?.content);

      // // Andaz Apna Apna, Hera Pheri, Chupke Chupke, Jaane Bhi Do Yaaro, Padosan
      // const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

      // ["Andaz Apna Apna", "Hera Pheri", "Chupke Chupke", "Jaane Bhi Do Yaaro", "Padosan"]

      // For each movie I will search TMDB API
      // const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      // const tmdbResults = await Promise.all(promiseArray);

      // TODO: not used when open ai api is working
      const gptMovies =[searchText.current.value];

      // const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      // [Promise, Promise, Promise, Promise, Promise]

      const tmdbResults = await Promise.all(promiseArray);

      console.log(tmdbResults);
      dispatch(addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults }));
      setLoader(false);
    }

  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className=" p-4 m-4 col-span-9"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="col-span-3 m-4 py-2 px-4 bg-white text-black rounded-lg "
          onClick={handleGptSearchClick}
        >
          {
            loader ? <img src={loaderImg} width={35} height={35} /> : lang[langKey].search
          }          
        </button>
      </form>
    </div>
  )
}

export default GptSearchBar