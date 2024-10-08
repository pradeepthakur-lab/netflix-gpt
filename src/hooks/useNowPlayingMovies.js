import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies } from "../redux/slice/moviesSlice";
import { useEffect } from "react";

const useNowPlayingMovies = () => {
    // Fetch Data from TMDB and store in movies store

    const dispatch = useDispatch();
    const getNowPlayingMovies = async () => {
        const data = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?page=1",
        API_OPTIONS
        );
        const json = await data.json();
        console.log('json', json?.results)
        dispatch(addNowPlayingMovies(json?.results));
    };

    useEffect(() => {
        getNowPlayingMovies();
    }, []);
}

export default useNowPlayingMovies;